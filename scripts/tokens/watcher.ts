/* scripts/tokens/watch-tokens.ts */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chokidar from 'chokidar';
import { WebSocketServer, WebSocket } from 'ws';
import { exec } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });
let activeSocket: InstanceType<typeof WebSocket> | null = null;

console.log(`🚀 Token Watcher running on ws://127.0.0.1:${PORT}`);

const TOKENS_DIR = path.resolve(__dirname, '../../src/tokens');

function execute(command: string): Promise<string> {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`❌ Error executing ${command}:`, stderr);
				reject(error);
				return;
			}
			resolve(stdout.trim());
		});
	});
}

function isFluidValue(
	val: unknown,
): val is { min: string; preferred: string; max: string } {
	return (
		typeof val === 'object' &&
		val !== null &&
		'min' in val &&
		'preferred' in val &&
		'max' in val
	);
}

function isColorMode(val: unknown): val is { light: string; dark: string } {
	return (
		typeof val === 'object' && val !== null && 'light' in val && 'dark' in val
	);
}

const WEB_ONLY_KEYS = new Set([
	'line-height',
	'lineHeight',
	'text-transform',
	'textTransform',
	'text-decoration-thickness',
	'textDecorationThickness',
	'text-underline-offset',
	'textUnderlineOffset',
	'text-decoration',
	'textDecoration',
]);

function filterFigmaPayload(obj: Record<string, any>): Record<string, any> {
	if (typeof obj !== 'object' || obj === null) return obj;

	const filtered: Record<string, any> = {};

	for (const [key, val] of Object.entries(obj)) {
		if (WEB_ONLY_KEYS.has(key)) {
			continue; // Skip web-only token keys
		}

		if (typeof val === 'object' && val !== null && !('$value' in val)) {
			const nested = filterFigmaPayload(val);
			if (Object.keys(nested).length > 0) {
				filtered[key] = nested;
			}
		} else {
			filtered[key] = val;
		}
	}

	return filtered;
}

async function broadcastTokens() {
	// 1. Always rebuild CSS variables first on file change
	try {
		const cssBuildLog = await execute('npx tsx scripts/tokens/build-theme.ts');
		console.log(cssBuildLog);
	} catch (err) {
		console.error('⚠️ Skipping Figma broadcast due to build failure.');
		return;
	}

	// 2. Check WebSocket connection
	if (!activeSocket || activeSocket.readyState !== WebSocket.OPEN) {
		console.log('⏳ Waiting for Figma Plugin connection...');
		return;
	}

	try {
		// Dynamically import updated token modules (bypassing ESM module cache with query string)
		const cacheBuster = `?update=${Date.now()}`;
		const { primitives } = await import(`#tokens/primitives.ts${cacheBuster}`);
		const { defaultTheme } = await import(
			`#src/tokens/defaultTheme.ts${cacheBuster}`
		);

		/* ------------------------------------------------------------- */
		/* -- A. Primitives DTCG Payload ------------------------------ */
		/* ------------------------------------------------------------- */
		const primitivesPayload = {
			color: primitives.colors,
			font: primitives.font,
			size: primitives.sizes,
		};

		/* ------------------------------------------------------------- */
		/* -- B. Semantics Payload (Colors Modes & Typography Styles) - */
		/* ------------------------------------------------------------- */
		const lightColors: Record<string, any> = {};
		const darkColors: Record<string, any> = {};

		function processColors(
			obj: Record<string, any>,
			targetLight: Record<string, any>,
			targetDark: Record<string, any>,
		) {
			for (const [key, val] of Object.entries(obj)) {
				if (isColorMode(val)) {
					targetLight[key] = { $value: val.light, $type: 'color' };
					targetDark[key] = { $value: val.dark, $type: 'color' };
				} else if (typeof val === 'object' && val !== null) {
					targetLight[key] = {};
					targetDark[key] = {};
					processColors(val, targetLight[key], targetDark[key]);
				}
			}
		}
		processColors(defaultTheme.colors, lightColors, darkColors);

		const { extractInteractStates } = await import(
			`#src/tokens/colorSteps.ts${cacheBuster}`
		);
		extractInteractStates(lightColors);
		extractInteractStates(darkColors);

		const formattedStyles = Object.fromEntries(
			Object.entries(defaultTheme.font.styles ?? {}).map(
				([styleKey, styleObj]) => [
					styleKey,
					Object.fromEntries(
						Object.entries(styleObj ?? {}).map(([propKey, propVal]) => [
							propKey,
							isFluidValue(propVal)
								? {
										$value: `clamp(${propVal.min}, ${propVal.preferred}, ${propVal.max})`,
										$type: 'typography',
									}
								: { $value: propVal, $type: 'typography' },
						]),
					),
				],
			),
		);

		const semanticsPayload = {
			color: {
				light: lightColors,
				dark: darkColors,
			},
			sizes: defaultTheme.sizes,
			font: {
				family: defaultTheme.font.family,
				size: defaultTheme.font.size,
				weight: defaultTheme.font.weight,
				'line-height': defaultTheme.font['line-height'],
				styles: formattedStyles,
			},
		};

		// Send payload through active WebSocket bridge
		activeSocket.send(
			JSON.stringify({
				type: 'UPDATE_PRIMITIVES',
				payload: filterFigmaPayload(primitivesPayload),
			}),
		);

		activeSocket.send(
			JSON.stringify({
				type: 'UPDATE_SEMANTICS',
				payload: filterFigmaPayload(semanticsPayload),
			}),
		);

		console.log('📦 Sent updated primitives & semantics to Figma!');
	} catch (err: any) {
		console.error('❌ Error broadcasting token updates:', err.message);
	}
}

wss.on('connection', (ws) => {
	activeSocket = ws;
	console.log('✅ Connected to Figma Plugin Bridge');

	ws.on('close', () => {
		console.log('⚠️ Figma Plugin disconnected');
		activeSocket = null;
	});

	ws.on('error', (err) => {
		console.error('WebSocket client error:', err.message);
	});

	broadcastTokens();
});

// Watch token files for live changes
const watcher = chokidar.watch(TOKENS_DIR, {
	ignoreInitial: true,
});

watcher.on('change', (filePath) => {
	console.log(`🔄 Token file changed: ${path.basename(filePath)}`);
	broadcastTokens();
});

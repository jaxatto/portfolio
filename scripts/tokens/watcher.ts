import path from 'path';
import chokidar from 'chokidar';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });
let activeSocket: WebSocket | null = null;

console.log(`🚀 Token Watcher running on ws://127.0.0.1:${PORT}`);

// Resolve paths using native Node subpath specifiers
const PRIMITIVES_PATH = require.resolve('#tokens/primitives');
const SEMANTICS_PATH = require.resolve('#tokens/semantics');

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

async function broadcastTokens() {
	if (!activeSocket || activeSocket.readyState !== WebSocket.OPEN) {
		console.log('⏳ Waiting for Figma Plugin connection...');
		return;
	}

	try {
		// Clear Node require cache for dynamic subpath reloads
		delete require.cache[PRIMITIVES_PATH];
		delete require.cache[SEMANTICS_PATH];

		const { primitiveColors } = require('#tokens/primitives');
		const { semanticColors } = require('#tokens/semantics');

		// 1. Send Primitives Payload
		const dtcgPrimitives: Record<string, any> = { color: {} };
		for (const [hue, scale] of Object.entries(primitiveColors)) {
			dtcgPrimitives.color[hue] = {};
			for (const [shade, value] of Object.entries(
				scale as Record<string, string>,
			)) {
				dtcgPrimitives.color[hue][shade] = { $type: 'color', $value: value };
			}
		}

		activeSocket.send(
			JSON.stringify({
				type: 'UPDATE_PRIMITIVES',
				payload: dtcgPrimitives,
			}),
		);

		// 2. Send Semantics Payload
		activeSocket.send(
			JSON.stringify({
				type: 'UPDATE_SEMANTICS',
				payload: semanticColors,
			}),
		);

		console.log('📦 Sent updated primitives & semantics to Figma!');
	} catch (err: any) {
		console.error('❌ Error reading token files:', err.message);
	}
}

// Watch token files for live changes
const watcher = chokidar.watch([PRIMITIVES_PATH, SEMANTICS_PATH], {
	ignoreInitial: true,
});

watcher.on('change', (filePath) => {
	console.log(`🔄 Token file changed: ${path.basename(filePath)}`);
	broadcastTokens();
});

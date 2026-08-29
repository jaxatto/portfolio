/* code.js */

figma.showUI(__html__, { visible: false });

// Web-only tokens that should remain in code and be ignored by Figma
const WEB_ONLY_PATHS = [
	'line-height',
	'lineheight',
	'text-transform',
	'texttransform',
	'text-decoration',
	'textdecoration',
	'text-decoration-thickness',
	'textdecorationthickness',
	'text-underline-offset',
	'textunderlineoffset',
];

function isWebOnlyToken(path) {
	const normalized = path.toLowerCase();
	return WEB_ONLY_PATHS.some((ignored) => normalized.includes(ignored));
}

// sRGB gamma encoding per CSS Color 4 spec (used by oklab/oklch conversion below)
function linearToSrgb(c) {
	const abs = Math.abs(c);
	if (abs > 0.0031308) {
		return (c < 0 ? -1 : 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
	}
	return 12.92 * c;
}

// Converts OKLCH (as used by primitives.ts) to sRGB floats, using the
// reference OKLab matrices from the CSS Color 4 spec / Björn Ottosson's oklab.
function oklchToFigmaColor(l, c, hDeg, alpha) {
	const hRad = (hDeg * Math.PI) / 180;
	const a = c * Math.cos(hRad);
	const b = c * Math.sin(hRad);

	const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = l - 0.0894841775 * a - 1.291485548 * b;

	const lCubed = l_ ** 3;
	const mCubed = m_ ** 3;
	const sCubed = s_ ** 3;

	const rLinear =
		4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed;
	const gLinear =
		-1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed;
	const bLinear =
		-0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.707614701 * sCubed;

	return {
		r: Math.min(1, Math.max(0, linearToSrgb(rLinear))),
		g: Math.min(1, Math.max(0, linearToSrgb(gLinear))),
		b: Math.min(1, Math.max(0, linearToSrgb(bLinear))),
		a: Math.min(1, Math.max(0, alpha)),
	};
}

function parseOklch(str) {
	const match = str.match(
		/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/\s*([\d.]+)(%?)\s*)?\)/i,
	);
	if (!match) return null;

	const [, lRaw, cRaw, hRaw, alphaRaw, alphaPercent] = match;
	const l = parseFloat(lRaw) / 100;
	const c = parseFloat(cRaw);
	const h = parseFloat(hRaw);
	const alpha = alphaRaw
		? alphaPercent
			? parseFloat(alphaRaw) / 100
			: parseFloat(alphaRaw)
		: 1;

	return oklchToFigmaColor(l, c, h, alpha);
}

function parseToFigmaColor(colorString) {
	if (typeof colorString !== 'string') return null;
	const str = colorString.trim();

	if (str.startsWith('oklch')) {
		return parseOklch(str);
	}

	if (str.startsWith('rgb')) {
		const values = str.match(/[\d.]+/g);
		if (values && values.length >= 3) {
			const alphaMatch = str.match(/\/\s*([\d.]+)\s*(%?)/);
			const rawA = alphaMatch ? parseFloat(alphaMatch[1]) : 1;
			const alpha = alphaMatch?.[2] ? rawA / 100 : rawA > 1 ? rawA / 255 : rawA;
			return {
				r: Math.min(1, Math.max(0, parseFloat(values[0]) / 255)),
				g: Math.min(1, Math.max(0, parseFloat(values[1]) / 255)),
				b: Math.min(1, Math.max(0, parseFloat(values[2]) / 255)),
				a: Math.min(1, Math.max(0, parseFloat(alpha))),
			};
		}
	}

	let c = str.replace('#', '');
	if (c.length === 3) {
		c =
			c
				.split('')
				.map((char) => char + char)
				.join('') + 'FF';
	} else if (c.length === 6) {
		c += 'FF';
	}

	const num = parseInt(c, 16);
	if (isNaN(num)) return null;

	return {
		r: Math.min(1, Math.max(0, ((num >> 24) & 255) / 255)),
		g: Math.min(1, Math.max(0, ((num >> 16) & 255) / 255)),
		b: Math.min(1, Math.max(0, ((num >> 8) & 255) / 255)),
		a: Math.min(1, Math.max(0, (num & 255) / 255)),
	};
}

function figmaColorToHex(colorObj) {
	if (!colorObj) return '';
	const r = Math.round(colorObj.r * 255)
		.toString(16)
		.padStart(2, '0');
	const g = Math.round(colorObj.g * 255)
		.toString(16)
		.padStart(2, '0');
	const b = Math.round(colorObj.b * 255)
		.toString(16)
		.padStart(2, '0');
	const a =
		colorObj.a !== undefined
			? Math.round(colorObj.a * 255)
					.toString(16)
					.padStart(2, '0')
			: 'ff';
	return `#${r}${g}${b}${a}`.toLowerCase();
}

/**
 * Extracts the maximum value from clamp() strings or parses numbers directly.
 * Example: "clamp(1.5rem, 5vw, 3rem)" -> "3rem" -> 48 (or 3 if unitless)
 */
function parseDimension(val) {
	if (typeof val === 'number') return val;
	if (typeof val !== 'string') return null;

	let str = val.trim();

	// If CSS clamp(), extract the 3rd argument (max value)
	if (str.includes('clamp(')) {
		const matches = str.match(/clamp\(([^,]+),([^,]+),([^)]+)\)/);
		if (matches && matches[3]) {
			str = matches[3].trim();
		}
	}

	// Extract numerical portion (handles px, rem, etc.)
	const parsed = parseFloat(str);
	if (isNaN(parsed)) return null;

	// Convert rem to px standard for Figma if needed, assuming 16px base
	if (str.endsWith('rem')) {
		return parsed * 16;
	}

	return parsed;
}

function sanitizeFontFamily(val) {
	if (typeof val !== 'string') return String(val);
	return val.split(',')[0].replace(/['"]/g, '').trim();
}

const loadedFonts = new Set();

async function loadFontForValue(val) {
	const familyValue = sanitizeFontFamily(val);
	if (!familyValue) return;

	const styleMatch = familyValue.match(
		/^(.*?)(?:\s+(Bold Italic|Italic|Bold|Medium|Light|Semibold|Regular))$/i,
	);
	const fontName = {
		family: styleMatch ? styleMatch[1].trim() : familyValue,
		style: styleMatch ? styleMatch[2] : 'Regular',
	};
	const fontKey = `${fontName.family}/${fontName.style}`;

	if (loadedFonts.has(fontKey)) return;
	await figma.loadFontAsync(fontName);
	loadedFonts.add(fontKey);
}

/**
 * Detects tokens whose value is a short key referencing a sibling semantic
 * category (e.g. `font/styles/heading-lg/weight` -> "strong" referencing
 * `font/weight/strong`, or `sizes/layout/gutter` -> "lg" referencing
 * `sizes/space/lg`) and returns the category prefix to alias against.
 */
function getAliasCategoryPrefix(currentPath) {
	const lower = currentPath.toLowerCase();

	const styleMatch = lower.match(/(?:^|\/)styles\/[^/]+\/([^/]+)$/);
	if (styleMatch) {
		return {
			prefix: `font/${styleMatch[1]}`,
			isClamp: styleMatch[1] === 'size',
		};
	}

	if (/(?:^|\/)layout\/gutter$/.test(lower)) {
		return { prefix: 'sizes/space', isClamp: false };
	}

	return null;
}

/**
 * Extracts the max (3rd) argument from a `clamp(min, preferred, max)`
 * string, e.g. "clamp(xl, 1rem + 1.4vw, 2xl)" -> "2xl".
 */
function extractClampMax(str) {
	if (typeof str !== 'string') return null;
	const match = str.trim().match(/clamp\(([^,]+),([^,]+),([^)]+)\)/);
	return match ? match[3].trim() : null;
}

/**
 * Derives a numeric-value category (e.g. "font/size", "size/radius") from a
 * token path so numeric primitive matches (branch D) can't cross categories
 * that happen to share values (font sizes vs radius vs space all use 12/16/20/24).
 */
function getNumericCategory(currentPath) {
	const segments = currentPath.toLowerCase().split('/');
	if (segments.length < 2) return null;
	const top = segments[0] === 'sizes' ? 'size' : segments[0];
	return `${top}/${segments[1]}`;
}

/**
 * Normalizes CSS/token naming styles into slash paths.
 * Example: "font-family-heading" -> "font/family/heading"
 * Example: "{semantics.font.weight.strong}" -> "font/weight/strong"
 */
function normalizePath(pathStr) {
	if (typeof pathStr !== 'string') return '';
	return pathStr
		.replace(/[{}]/g, '')
		.replace(/^(primitives|semantics)\./, '')
		.replace(/\./g, '/')
		.replace(/^font-size-/, 'font/size/')
		.replace(/^font-weight-/, 'font/weight/')
		.replace(/^font-family-/, 'font/family/')
		.replace(/-/g, '/')
		.toLowerCase();
}

async function getOrCreateCollection(name) {
	const collections = await figma.variables.getLocalVariableCollectionsAsync();
	let collection = collections.find(
		(c) => c.name.toLowerCase() === name.toLowerCase(),
	);

	if (!collection) {
		collection = figma.variables.createVariableCollection(name);
	} else if (collection.name !== name) {
		collection.name = name;
	}

	return collection;
}

function ensureVariableType(variable, name, collection, type) {
	if (variable && variable.resolvedType !== type) {
		const scopes = [...variable.scopes];
		variable.remove();
		const replacement = figma.variables.createVariable(name, collection, type);
		replacement.scopes = scopes;
		return replacement;
	}

	return variable;
}

function findVariable(allVars, name, collection, type) {
	const matches = allVars.filter(
		(variable) =>
			variable.name === name && variable.variableCollectionId === collection.id,
	);
	const variable = matches.find((candidate) => candidate.resolvedType === type);

	for (const duplicate of matches) {
		if (duplicate !== variable) duplicate.remove();
	}

	return variable ?? matches[0] ?? null;
}

function mergeModeTrees(light, dark) {
	if (
		(typeof light !== 'object' || light === null) &&
		(typeof dark !== 'object' || dark === null)
	) {
		return { light, dark };
	}

	if (
		(light && typeof light === 'object' && '$value' in light) ||
		(dark && typeof dark === 'object' && '$value' in dark)
	) {
		return { light, dark };
	}

	const merged = {};
	const keys = new Set([
		...Object.keys(light ?? {}),
		...Object.keys(dark ?? {}),
	]);

	for (const key of keys) {
		merged[key] = mergeModeTrees(light?.[key], dark?.[key]);
	}

	return merged;
}

function ensureModes(collection, modeNames) {
	const modeMap = {};

	const defaultMode = collection.modes[0];
	if (defaultMode.name !== modeNames[0]) {
		collection.renameMode(defaultMode.modeId, modeNames[0]);
	}
	modeMap[modeNames[0]] = defaultMode.modeId;

	for (let i = 1; i < modeNames.length; i++) {
		const targetName = modeNames[i];
		let existingMode = collection.modes.find((m) => m.name === targetName);

		if (!existingMode) {
			const newModeId = collection.addMode(targetName);
			modeMap[targetName] = newModeId;
		} else {
			modeMap[targetName] = existingMode.modeId;
		}
	}

	return modeMap;
}

let updateQueue = Promise.resolve();

async function processMessage(msg) {
	try {
		const allVars = await figma.variables.getLocalVariablesAsync();

		// ----------------------------------------------------
		// 1. PRIMITIVES (COLOR, FONT, SIZE)
		// ----------------------------------------------------
		if (msg.type === 'UPDATE_PRIMITIVES') {
			const collection = await getOrCreateCollection('primitives');
			const modes = ensureModes(collection, ['Value']);
			const modeId = modes['Value'];

			let updatedCount = 0;

			async function processPrimitiveNode(obj, path = '') {
				for (const [key, val] of Object.entries(obj)) {
					const currentPath = path ? `${path}/${key}` : key;

					if (isWebOnlyToken(currentPath)) {
						continue;
					}

					if (typeof val === 'object' && val !== null && !('$value' in val)) {
						await processPrimitiveNode(val, currentPath);
					} else {
						const rawValue =
							typeof val === 'object' && val !== null && '$value' in val
								? val.$value
								: val;

						let varType = 'STRING';
						let parsedValue = String(rawValue);

						if (currentPath.startsWith('color')) {
							const colorValue = parseToFigmaColor(rawValue);
							if (colorValue) {
								varType = 'COLOR';
								parsedValue = colorValue;
							}
						} else if (
							currentPath.startsWith('size') ||
							currentPath.startsWith('space') ||
							currentPath.startsWith('radius') ||
							currentPath.includes('size') ||
							currentPath.includes('weight')
						) {
							const numericValue = parseDimension(rawValue);
							if (numericValue !== null) {
								varType = 'FLOAT';
								parsedValue = numericValue;
							}
						} else if (currentPath.includes('family')) {
							varType = 'STRING';
							parsedValue = sanitizeFontFamily(rawValue);
						}

						let variable = findVariable(
							allVars,
							currentPath,
							collection,
							varType,
						);

						if (!variable) {
							variable = figma.variables.createVariable(
								currentPath,
								collection,
								varType,
							);
						}
						variable = ensureVariableType(
							variable,
							currentPath,
							collection,
							varType,
						);

						if (currentPath.includes('family')) {
							await loadFontForValue(parsedValue);
						}
						variable.setValueForMode(modeId, parsedValue);
						updatedCount++;
					}
				}
			}

			await processPrimitiveNode(msg.payload);
			figma.notify(`Synced ${updatedCount} primitive variables!`);
		}

		// ----------------------------------------------------
		// 2. SEMANTICS WITH ALIASES (COLOR, FONT, SIZE, RADIUS)
		// ----------------------------------------------------
		if (msg.type === 'UPDATE_SEMANTICS') {
			const primitivesCollection = await getOrCreateCollection('primitives');
			const semanticsCollection = await getOrCreateCollection('semantics');

			const incomingModes = msg.payload.modes || ['light', 'dark'];
			const modes = ensureModes(semanticsCollection, incomingModes);

			const primitiveModeId = primitivesCollection.modes[0].modeId;
			const primitiveByName = new Map();
			const primitiveByHex = new Map();
			const primitiveByNumberByCategory = new Map();
			const primitiveByString = new Map();

			// 1. Index All Primitives
			for (const v of allVars) {
				if (v.variableCollectionId === primitivesCollection.id) {
					primitiveByName.set(v.name.toLowerCase(), v);
					primitiveByName.set(normalizePath(v.name), v);

					const val = v.valuesByMode[primitiveModeId];
					if (val !== undefined && val !== null) {
						if (
							v.resolvedType === 'COLOR' &&
							typeof val === 'object' &&
							'r' in val
						) {
							const hexKey = figmaColorToHex(val);
							primitiveByHex.set(hexKey, v);
						} else if (v.resolvedType === 'FLOAT' && typeof val === 'number') {
							const category = getNumericCategory(v.name);
							if (!primitiveByNumberByCategory.has(category)) {
								primitiveByNumberByCategory.set(category, new Map());
							}
							primitiveByNumberByCategory.get(category).set(val, v);
						} else if (v.resolvedType === 'STRING' && typeof val === 'string') {
							primitiveByString.set(val.toLowerCase(), v);
						}
					}
				}
			}

			let updatedCount = 0;

			function resolveValueOrAlias(
				val,
				varType,
				semanticMapByName,
				aliasHint,
				numericCategory,
			) {
				if (val === undefined || val === null) return null;
				const rawStr = String(
					typeof val === 'object' && '$value' in val ? val.$value : val,
				);

				// A0. Short-key reference to a sibling semantic category (e.g.
				// heading-lg family/size/weight, or sizes/layout/gutter).
				if (aliasHint && semanticMapByName) {
					const refKey = aliasHint.isClamp
						? (extractClampMax(rawStr) ?? rawStr)
						: rawStr;
					const categoryPath = `${aliasHint.prefix}/${refKey}`.toLowerCase();
					if (semanticMapByName.has(categoryPath)) {
						return figma.variables.createVariableAlias(
							semanticMapByName.get(categoryPath),
						);
					}
				}

				const cleanPath = normalizePath(rawStr);

				// A. Direct Semantic Variable Reference
				if (semanticMapByName && semanticMapByName.has(cleanPath)) {
					return figma.variables.createVariableAlias(
						semanticMapByName.get(cleanPath),
					);
				}

				// B. Direct Primitive Variable Reference
				if (primitiveByName.has(cleanPath)) {
					return figma.variables.createVariableAlias(
						primitiveByName.get(cleanPath),
					);
				}

				// C. Color Hex Match
				if (varType === 'COLOR') {
					const parsedColor = parseToFigmaColor(rawStr);
					if (!parsedColor) return null;
					const hexKey = figmaColorToHex(parsedColor);
					const primitiveVar = primitiveByHex.get(hexKey);
					return primitiveVar
						? figma.variables.createVariableAlias(primitiveVar)
						: parsedColor;
				}

				// D. Numeric / Clamp / Dimension Match (scoped to the same category
				// so e.g. font/size never matches a sizes/radius value by coincidence)
				if (varType === 'FLOAT') {
					const numVal = parseDimension(rawStr);
					if (numVal === null) return null;
					const categoryMap = primitiveByNumberByCategory.get(numericCategory);
					const primitiveVar = categoryMap
						? categoryMap.get(numVal)
						: undefined;
					return primitiveVar
						? figma.variables.createVariableAlias(primitiveVar)
						: numVal;
				}

				// E. String / Font Family Match
				if (varType === 'STRING') {
					const cleanStr = sanitizeFontFamily(rawStr).toLowerCase();
					const primitiveVar = primitiveByString.get(cleanStr);
					return primitiveVar
						? figma.variables.createVariableAlias(primitiveVar)
						: cleanStr;
				}

				return rawStr;
			}

			// Pre-pass: Index existing semantic variables
			const semanticMapByName = new Map();
			for (const v of allVars) {
				if (v.variableCollectionId === semanticsCollection.id) {
					semanticMapByName.set(v.name.toLowerCase(), v);
					semanticMapByName.set(normalizePath(v.name), v);
				}
			}

			function isTokenLeaf(val) {
				if (typeof val !== 'object' || val === null) return false;
				if ('$value' in val) return true;
				const keys = Object.keys(val);
				return keys.some((k) => k in modes || k === 'Value');
			}

			async function processSemanticNode(obj, path = '') {
				for (const [key, val] of Object.entries(obj)) {
					if (key === 'modes') continue;
					const currentPath = path ? `${path}/${key}` : key;

					if (isWebOnlyToken(currentPath)) continue;

					if (!isTokenLeaf(val) && typeof val === 'object' && val !== null) {
						await processSemanticNode(val, currentPath);
					} else {
						let varType = 'STRING';
						const normalizedPath = currentPath.toLowerCase();

						if (normalizedPath.startsWith('color')) {
							varType = 'COLOR';
						} else if (
							normalizedPath.includes('size') ||
							normalizedPath.includes('weight') ||
							normalizedPath.includes('space') ||
							normalizedPath.includes('radius')
						) {
							varType = 'FLOAT';
						} else if (normalizedPath.includes('family')) {
							varType = 'STRING';
						}

						let variable = findVariable(
							allVars,
							currentPath,
							semanticsCollection,
							varType,
						);

						if (!variable) {
							variable = figma.variables.createVariable(
								currentPath,
								semanticsCollection,
								varType,
							);
						}
						variable = ensureVariableType(
							variable,
							currentPath,
							semanticsCollection,
							varType,
						);

						semanticMapByName.set(currentPath.toLowerCase(), variable);
						semanticMapByName.set(normalizePath(currentPath), variable);

						const aliasHint = getAliasCategoryPrefix(currentPath);
						const numericCategory = getNumericCategory(currentPath);

						for (const modeName of Object.keys(modes)) {
							const modeId = modes[modeName];
							let rawModeVal = val;

							if (typeof val === 'object' && val !== null) {
								if (modeName in val) {
									rawModeVal = val[modeName];
								} else if ('$value' in val) {
									rawModeVal = val.$value;
								}
							}

							const resolved = resolveValueOrAlias(
								rawModeVal,
								varType,
								semanticMapByName,
								aliasHint,
								numericCategory,
							);
							if (resolved !== null && resolved !== undefined) {
								variable.setValueForMode(modeId, resolved);
							}
						}
						updatedCount++;
					}
				}
			}

			const semanticPayload = { ...msg.payload };
			if (msg.payload.color?.light && msg.payload.color?.dark) {
				semanticPayload.color = mergeModeTrees(
					msg.payload.color.light,
					msg.payload.color.dark,
				);
			}

			await processSemanticNode(semanticPayload);
			figma.notify(`Synced ${updatedCount} semantic variables with aliases!`);
		}
	} catch (err) {
		console.error('Figma Plugin Error:', err);
		figma.notify(`Error updating variables: ${err.message}`, { error: true });
	}
}

figma.ui.onmessage = (msg) => {
	updateQueue = updateQueue.then(() => processMessage(msg));
};

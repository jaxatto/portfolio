figma.showUI(__html__, { visible: false });

function parseToFigmaColor(colorString) {
	if (typeof colorString !== 'string') return null;
	const str = colorString.trim();

	if (str.startsWith('rgb')) {
		const values = str.match(/[\d.]+/g);
		if (values && values.length >= 3) {
			return {
				r: parseFloat(values[0]) / 255,
				g: parseFloat(values[1]) / 255,
				b: parseFloat(values[2]) / 255,
				a: values[3] !== undefined ? parseFloat(values[3]) : 1,
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
		r: ((num >> 24) & 255) / 255,
		g: ((num >> 16) & 255) / 255,
		b: ((num >> 8) & 255) / 255,
		a: (num & 255) / 255,
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

figma.ui.onmessage = async (msg) => {
	try {
		const allVars = await figma.variables.getLocalVariablesAsync();

		// ----------------------------------------------------
		// 1. PRIMITIVES
		// ----------------------------------------------------
		if (msg.type === 'UPDATE_PRIMITIVES') {
			const collection = await getOrCreateCollection('primitives');
			const modes = ensureModes(collection, ['Value']);
			const modeId = modes['Value'];

			let updatedCount = 0;

			for (const [hue, scale] of Object.entries(msg.payload.color)) {
				for (const [shade, token] of Object.entries(scale)) {
					const varName = `color/${hue}/${shade}`;

					let variable = allVars.find(
						(v) =>
							v.name === varName && v.variableCollectionId === collection.id,
					);

					if (!variable) {
						variable = figma.variables.createVariable(
							varName,
							collection,
							'COLOR',
						);
					}

					const colorValue = parseToFigmaColor(token.$value || token);
					if (colorValue) {
						variable.setValueForMode(modeId, colorValue);
						updatedCount++;
					}
				}
			}

			figma.notify(`Synced ${updatedCount} primitive variables!`);
		}

		// ----------------------------------------------------
		// 2. SEMANTICS WITH ALIASES
		// ----------------------------------------------------
		if (msg.type === 'UPDATE_SEMANTICS') {
			const primitivesCollection = await getOrCreateCollection('primitives');
			const semanticsCollection = await getOrCreateCollection('semantics');
			const modes = ensureModes(semanticsCollection, ['light', 'dark']);

			const primitiveModeId = primitivesCollection.modes[0].modeId;
			const primitiveValueMap = new Map();

			// Store primitive Variable objects by color value
			for (const v of allVars) {
				if (v.variableCollectionId === primitivesCollection.id) {
					const val = v.valuesByMode[primitiveModeId];
					if (val && typeof val === 'object' && 'r' in val) {
						const hexKey = figmaColorToHex(val);
						primitiveValueMap.set(hexKey, v);
					}
				}
			}

			let updatedCount = 0;

			function resolveValueOrAlias(rawColorString) {
				const parsedColor = parseToFigmaColor(rawColorString);
				if (!parsedColor) return null;

				const hexKey = figmaColorToHex(parsedColor);
				const primitiveVar = primitiveValueMap.get(hexKey);

				if (primitiveVar) {
					// Pass the primitive Variable object directly to createVariableAlias
					return figma.variables.createVariableAlias(primitiveVar);
				}

				return parsedColor;
			}

			async function processSemanticNode(obj, path = '') {
				for (const [key, value] of Object.entries(obj)) {
					const currentPath = path ? `${path}/${key}` : key;

					if (
						value &&
						typeof value === 'object' &&
						('light' in value || 'dark' in value)
					) {
						let variable = allVars.find(
							(v) =>
								v.name === currentPath &&
								v.variableCollectionId === semanticsCollection.id,
						);

						if (!variable) {
							variable = figma.variables.createVariable(
								currentPath,
								semanticsCollection,
								'COLOR',
							);
						}

						if (value.light) {
							const lightVal = resolveValueOrAlias(value.light);
							if (lightVal) variable.setValueForMode(modes['light'], lightVal);
						}

						if (value.dark) {
							const darkVal = resolveValueOrAlias(value.dark);
							if (darkVal) variable.setValueForMode(modes['dark'], darkVal);
						}

						updatedCount++;
					} else if (typeof value === 'object' && value !== null) {
						await processSemanticNode(value, currentPath);
					}
				}
			}

			await processSemanticNode(msg.payload);
			figma.notify(
				`Synced ${updatedCount} semantic variables with primitive aliases!`,
			);
		}
	} catch (err) {
		console.error('Figma Plugin Error:', err);
		figma.notify(`Error updating variables: ${err.message}`, { error: true });
	}
};

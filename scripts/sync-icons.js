const fs = require('fs');
const path = require('path');

// Paths
const iconsDir = path.resolve(__dirname, '../src/assets/icons');
const iconNamesFile = path.resolve(__dirname, '../src/constants/iconNames.ts');
const iconComponentFile = path.resolve(__dirname, '../src/components/Icon/Icon.tsx');

// 1. Get all SVG filenames (without .svg)
const svgFiles = fs.readdirSync(iconsDir)
  .filter(f => f.endsWith('.svg'))
  .map(f => f.replace('.svg', ''));

// 2. Read iconNames.ts and Icon.tsx
const iconNamesContent = fs.readFileSync(iconNamesFile, 'utf8');
const iconComponentContent = fs.readFileSync(iconComponentFile, 'utf8');

// 3. Extract icon names from iconNames.ts
const iconNamesMatch = iconNamesContent.match(/export const iconNames = \[(.*?)\] as const;/s);
const iconNames = iconNamesMatch
  ? iconNamesMatch[1].split(',').map(s => s.replace(/['"\s]/g, '')).filter(Boolean)
  : [];

// 4. Find new and removed icons
const newIcons = svgFiles.filter(name => !iconNames.includes(name));
const removedIcons = iconNames.filter(name => !svgFiles.includes(name));

// 5. Run SVG fix script on new icons (optional, implement as needed)
if (newIcons.length) {
  newIcons.forEach(name => {
    const svgPath = path.join(iconsDir, `${name}.svg`);
    // require('./fix-svg')(svgPath); // Uncomment and implement if you have a fix-svg script
  });
}

// 6. Update iconNames.ts
if (newIcons.length || removedIcons.length) {
  const updatedIconNames = [
    ...iconNames.filter(name => !removedIcons.includes(name)),
    ...newIcons
  ].sort();
  const newIconNamesContent = `export const iconNames = [\n  ${updatedIconNames.map(n => `'${n}'`).join(',\n  ')}\n] as const;\n\nexport type IconName = typeof iconNames[number];\n`;
  fs.writeFileSync(iconNamesFile, newIconNamesContent, 'utf8');
}

// 7. Update Icon.tsx imports and mapping
// We'll use regex to replace the imports and the icons mapping

// a. Generate new imports
const importLines = svgFiles
  .map(name => `import ${toPascalCase(name)} from '@assets/icons/${name}.svg';`)
  .join('\n');

// b. Generate new mapping
const mappingLines = svgFiles
  .map(name => `  '${name}': ${toPascalCase(name)},`)
  .join('\n');

// c. Replace imports and mapping in Icon.tsx
let updatedIconComponentContent = iconComponentContent;

// Replace all import lines for SVGs
updatedIconComponentContent = updatedIconComponentContent.replace(
  /import .*? from '@assets\/icons\/.*?\.svg';\n?/g,
  ''
);

// Remove any leading blank lines after import removal
updatedIconComponentContent = updatedIconComponentContent.replace(/^\s*\n/, '');

// Insert imports after the last non-SVG import
const importInsertMatch = updatedIconComponentContent.match(/^(import .*?;\n)+/);
if (importInsertMatch) {
  const lastImportEnd = importInsertMatch[0].length;
  updatedIconComponentContent =
    updatedIconComponentContent.slice(0, lastImportEnd) +
    importLines + '\n' +
    updatedIconComponentContent.slice(lastImportEnd);
} else {
  // If no imports found, just prepend
  updatedIconComponentContent = importLines + '\n' + updatedIconComponentContent;
}

// Replace the icons mapping
updatedIconComponentContent = updatedIconComponentContent.replace(
  /const icons: Record<IconName, React\.FC<React\.SVGProps<SVGSVGElement>>> = {[\s\S]*?};/,
  `const icons: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {\n${mappingLines}\n};`
);

// 8. Write the updated Icon.tsx content back to the file
fs.writeFileSync(iconComponentFile, updatedIconComponentContent.trim() + '\n', 'utf8');

console.log('SVGs found:', svgFiles);
console.log('New icons:', newIcons);
console.log('Removed icons:', removedIcons);
console.log('iconNames.ts and Icon.tsx updated.');

// 9. Optionally, print a summary of what changed
if (newIcons.length || removedIcons.length) {
  if (newIcons.length) console.log('Added:', newIcons.join(', '));
  if (removedIcons.length) console.log('Removed:', removedIcons.join(', '));
} else {
  console.log('No changes needed.');
}

// Helper function to convert to PascalCase
function toPascalCase(str) {
  return str
    .replace(/(^\w|-\w)/g, clearAndUpper)
    .replace(/-/g, '');

  function clearAndUpper(text) {
    return text.replace(/-/, '').toUpperCase();
  }
}
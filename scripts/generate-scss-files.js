const fs = require('fs');
const path = require('path');

const dirs = [
  path.resolve(__dirname, '../src/components'),
  path.resolve(__dirname, '../src/pages'),
];

let addedCount = 0;

dirs.forEach((dir) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (entry.isDirectory()) {
      const folder = path.join(dir, entry.name);
      const files = fs.readdirSync(folder);
      const tsxFile = files.find(f => f.endsWith('.tsx'));
      const scssFile = files.find(f => f.endsWith('.module.scss'));
      if (tsxFile && scssFile) {
        const tsxPath = path.join(folder, tsxFile);
        const scssImport = `import styles from './${scssFile}';`;
        let content = fs.readFileSync(tsxPath, 'utf8');
        if (!content.includes(scssImport)) {
          // Insert after any existing import statements, or at the top
          const importRegex = /import .+ from .+;\n*/g;
          const lastImportMatch = [...content.matchAll(importRegex)].pop();
          if (lastImportMatch) {
            const insertPos = lastImportMatch.index + lastImportMatch[0].length;
            // Add the import after the last import, with a line break after
            content = content.slice(0, insertPos) + scssImport + '\n' + content.slice(insertPos);
          } else {
            // No imports found, add at the top with a line break after
            content = scssImport + '\n' + content;
          }
          fs.writeFileSync(tsxPath, content, 'utf8');
          console.log(`Added SCSS import to ${tsxFile}`);
          addedCount++;
        }
      }
    }
  });
});

if (addedCount === 0) {
  console.log('No new SCSS imports were added.');
}
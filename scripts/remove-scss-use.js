const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src');

function removeUseStatements(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Remove all @use ...; lines
  const newContent = content.replace(/^\s*@use\s+['"][^'"]+['"]\s+as\s+\*;\s*$/gm, '');
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Removed @use from: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.module.scss') || entry.name.endsWith('.page.scss'))
    ) {
      removeUseStatements(fullPath);
    }
  });
}

walk(SRC_DIR);
console.log('All @use statements removed from module and page SCSS files.');
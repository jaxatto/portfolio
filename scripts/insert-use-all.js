const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src');
const USE_STATEMENT = `@use '@styles/all' as *;`;

function shouldProcess(file) {
  // Only process .scss files that are not partials or all.scss
  return (
    file.endsWith('.scss') &&
    !file.endsWith('_all.scss') &&
    !path.basename(file).startsWith('_')
  );
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(USE_STATEMENT)) return; // Already present

  // Remove any existing @use '@styles/all' as *; (just in case)
  const cleaned = content.replace(/^@use\s+['"]@styles\/all['"]\s+as\s+\*;\s*/gm, '');
  const newContent = `${USE_STATEMENT}\n${cleaned}`;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Inserted @use in: ${filePath}`);
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (shouldProcess(fullPath)) {
      processFile(fullPath);
    }
  });
}

walk(SRC_DIR);
console.log('Ensured @use "@styles/all" as *; at the top of every SCSS file.');
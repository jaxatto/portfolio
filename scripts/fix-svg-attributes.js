const fs = require('fs');
const path = require('path');

const assetsDir = path.resolve(__dirname, '../src/assets');

function stripAndAddSvgAttributes(svgContent) {
  // Remove fill, width, height, and viewBox from the <svg ...> tag
  let updated = svgContent.replace(
    /<svg\b([^>]*)>/i,
    (match, attrs) => {
      // Remove unwanted attributes
      let cleaned = attrs.replace(/\s*(fill|width|height|viewBox)="[^"]*"/gi, '');
      // Add desired attributes
      cleaned += ' width="100%" height="100%" viewBox="0 0 24 24"';
      return `<svg${cleaned}>`;
    }
  );
  return updated;
}

function processSvgFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = stripAndAddSvgAttributes(content);
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Stripped and added attributes in: ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.svg')) {
      processSvgFile(fullPath);
    }
  });
}

walkDir(assetsDir);
console.log('SVG attribute stripping and adding complete.');
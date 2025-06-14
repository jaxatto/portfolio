const fs = require('fs');
const path = require('path');

const componentsDir = path.resolve(__dirname, '../src/components');

fs.readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const folder = path.join(componentsDir, dirent.name);
    const files = fs.readdirSync(folder);
    const mainFile = files.find(f =>
      f === `${dirent.name}.tsx` ||
      f === `${dirent.name}.jsx` ||
      f === `${dirent.name}.ts` ||
      f === `${dirent.name}.js`
    );
    if (mainFile) {
      const mainName = path.parse(mainFile).name;
      const mainFilePath = path.join(folder, mainFile);
      const fileContent = fs.readFileSync(mainFilePath, 'utf8');

      // Find named value exports (const, let, var, function, class, etc.)
      const valueExports = [];
      const valueExportRegex = /export (const|let|var|function|class) (\w+)/g;
      let match;
      while ((match = valueExportRegex.exec(fileContent)) !== null) {
        if (match[2] !== 'default') {
          valueExports.push(match[2]);
        }
      }

      // Find named type exports (type, interface, enum)
      const typeExports = [];
      const typeExportRegex = /export (type|interface|enum) (\w+)/g;
      while ((match = typeExportRegex.exec(fileContent)) !== null) {
        typeExports.push(match[2]);
      }

      // Build export lines
      let exportLines = `export { default`;
      if (valueExports.length) {
        exportLines += `, ${valueExports.join(', ')}`;
      }
      exportLines += ` } from './${mainName}';\n`;

      if (typeExports.length) {
        exportLines += `export type { ${typeExports.join(', ')} } from './${mainName}';\n`;
      }

      fs.writeFileSync(path.join(folder, 'index.ts'), exportLines);
      console.log(`Generated index.ts for ${dirent.name}:\n${exportLines}`);
    }
  });
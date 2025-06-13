const fs = require('fs');
const path = require('path');

const defaultDirs = [
  path.resolve(__dirname, '../src/components'),
  path.resolve(__dirname, '../src/pages'),
];

// Use command line args if provided, otherwise use defaults
const targetDirs = process.argv.length > 2
  ? process.argv.slice(2).map(dir => path.resolve(__dirname, dir))
  : defaultDirs;

targetDirs.forEach(baseDir => {
  if (!fs.existsSync(baseDir)) {
    console.warn(`Directory not found: ${baseDir}`);
    return;
  }
  fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach(dirent => {
      const folder = path.join(baseDir, dirent.name);
      const files = fs.readdirSync(folder);
      const mainFile = files.find(f =>
        f === `${dirent.name}.tsx` ||
        f === `${dirent.name}.jsx` ||
        f === `${dirent.name}.ts` ||
        f === `${dirent.name}.js`
      );
      if (mainFile) {
        const mainName = path.parse(mainFile).name;
        // Check if a type with the same name exists in the main file
        const mainFilePath = path.join(folder, mainFile);
        let typeExport = '';
        if (fs.readFileSync(mainFilePath, 'utf8').includes(`export type ${mainName}Props`)) {
          typeExport = `export type { ${mainName}Props } from './${mainName}';\n`;
        }
        const indexPath = path.join(folder, 'index.ts');
        const exportLine = `export { default } from './${mainName}';\n${typeExport}`;
        fs.writeFileSync(indexPath, exportLine);
        console.log(`Created: ${indexPath}`);
      }
    });
});
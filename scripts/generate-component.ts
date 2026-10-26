import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

const input = process.argv[2];

if (!input) {
  console.error(
    'Please provide a component path: npm run generate:component -- [ComponentName] or [Page/ComponentName]',
  );
  process.exit(1);
}

// Support nested paths like Resume/components/SkillCard or just SkillCard
const parts = input.split(/[\\/]/).filter(Boolean);
const componentName = parts[parts.length - 1];
const subDir = parts.slice(0, -1).join('/');

const baseDir = path.resolve(here, '../src');
let componentDir: string;

if (subDir) {
  if (subDir.startsWith('components') || subDir.startsWith('pages')) {
    componentDir = path.join(baseDir, subDir, componentName);
  } else {
    const [maybePage, ...rest] = subDir.split('/');
    if (fs.existsSync(path.join(baseDir, 'pages', maybePage))) {
      componentDir = path.join(baseDir, 'pages', maybePage, 'components', ...rest, componentName);
    } else {
      componentDir = path.join(baseDir, 'components', subDir, componentName);
    }
  }
} else {
  componentDir = path.join(baseDir, 'components', componentName);
}

const tsxFile = path.join(componentDir, `${componentName}.tsx`);
const cssFile = path.join(componentDir, `${componentName}.module.css`);
const indexFile = path.join(componentDir, `index.ts`);

const tsxContent = `import React from 'react';
import styles from './${componentName}.module.css';

const ${componentName}: React.FC = () => (
  <div className={styles.wrapper}>
    {/* ${componentName} content */}
  </div>
);

export default ${componentName};
`;

const cssContent = `.wrapper {
  /* Styles for ${componentName} */
}
`;

const indexContent = `export { default } from './${componentName}';
`;

if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
  fs.writeFileSync(tsxFile, tsxContent);
  fs.writeFileSync(cssFile, cssContent);
  fs.writeFileSync(indexFile, indexContent);
  console.log(`Component "${componentName}" created at ${componentDir.replace(baseDir + '/', '')}`);
} else {
  let created = false;
  if (!fs.existsSync(tsxFile)) {
    fs.writeFileSync(tsxFile, tsxContent);
    console.log(`Added missing file: ${tsxFile.replace(baseDir + '/', '')}`);
    created = true;
  }
  if (!fs.existsSync(cssFile)) {
    fs.writeFileSync(cssFile, cssContent);
    console.log(`Added missing file: ${cssFile.replace(baseDir + '/', '')}`);
    created = true;
  }
  if (!fs.existsSync(indexFile)) {
    fs.writeFileSync(indexFile, indexContent);
    console.log(`Added missing file: ${indexFile.replace(baseDir + '/', '')}`);
    created = true;
  }
  if (!created) {
    console.log(
      `Component folder "${componentDir.replace(baseDir + '/', '')}" already exists and all files are present.`,
    );
  }
}

const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name: node generate-component.js MyComponent');
  process.exit(1);
}

const baseDir = path.resolve(__dirname, '../src/components');
const componentDir = path.join(baseDir, componentName);

if (fs.existsSync(componentDir)) {
  console.error(`Component folder "${componentName}" already exists.`);
  process.exit(1);
}

fs.mkdirSync(componentDir);

const tsxContent = `import React from 'react';
import styles from './${componentName}.module.scss';

const ${componentName}: React.FC = () => (
  <div className={styles.wrapper}>
    {/* ${componentName} content */}
  </div>
);

export default ${componentName};
`;

const scssContent = `.wrapper {
  /* Styles for ${componentName} */
}
`;

const indexContent = `export { default } from './${componentName}';
`;

fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), tsxContent);
fs.writeFileSync(path.join(componentDir, `${componentName}.module.scss`), scssContent);
fs.writeFileSync(path.join(componentDir, `index.ts`), indexContent);

console.log(`Component "${componentName}" created at src/components/${componentName}`);
import js from '@eslint/js';
import globals from 'globals';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'resume', '.claude', 'src/styles/theme.css'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Floating UI's `refs.setFloating` is a callback ref, which the rule cannot tell apart from a read.
      'react-hooks/refs': 'off',
    },
  },
  {
    files: ['scripts/**/*.ts', 'e2e/**/*.ts', '*.config.ts'], languageOptions: { globals: globals.node } },
);

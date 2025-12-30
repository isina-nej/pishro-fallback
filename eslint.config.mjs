eslint.config.mjs:
import js from '@eslint/js';
import ts from 'typescript-eslint';
import next from 'eslint-config-next';

export default [
  {
    ignores: ['node_modules', '.next', 'out', 'dist'],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
    },
  },
];

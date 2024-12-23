import path from 'node:path';
import url from 'node:url';

import * as compat from '@eslint/compat';
import eslint from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.node } },
  compat.includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  prettierPlugin,
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: { 'simple-import-sort/imports': 'error', 'simple-import-sort/exports': 'error' },
  },
];

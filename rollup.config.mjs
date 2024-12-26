import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

import pluginCommonJs from '@rollup/plugin-commonjs';
import pluginResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import { dts as pluginDts } from 'rollup-plugin-dts';
import pluginNodeExternals from 'rollup-plugin-node-externals';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ENTRYPOINT = path.resolve(__dirname, 'src', `index.js`);
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')));

const basePlugins = [pluginNodeExternals(), pluginResolve()];
const commonJsPlugins = [pluginCommonJs()];

export default defineConfig([
  {
    input: path.resolve(__dirname, 'src', `index.d.ts`),
    plugins: [pluginDts({ compilerOptions: { declaration: true } })],
    output: [{ file: `dist/${packageJson.name}.d.ts`, format: 'cjs' }],
  },
  {
    input: ENTRYPOINT,
    plugins: [...basePlugins, ...commonJsPlugins],
    output: { file: `dist/${packageJson.name}.cjs.js`, format: 'cjs', exports: 'named' },
  },
  {
    input: ENTRYPOINT,
    plugins: [...basePlugins],
    output: { file: `dist/${packageJson.name}.mjs.js`, format: 'esm' },
  },
]);

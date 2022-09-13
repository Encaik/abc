import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';
import pkg from './package.json';

// 代码头
const banner = `/*!
* @encaik/abc v${pkg.version}
* (c) 2022-${new Date().getFullYear()} Encaik
* https://github.com/Encaik/abc
* Released under the MIT License.
*/
`;

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'bundle.esm',
        file: 'dist/bundle.esm.js',
        banner,
        format: 'module',
      },
      {
        name: 'bundle.umd',
        file: 'dist/bundle.umd.js',
        banner,
        format: 'umd',
      },
    ],
    plugins: [
      resolve(), // 查找和打包node_modules中的第三方模块
      commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
      typescript({
        tsconfig: './tsconfig.json',
      }), // 解析TypeScript
    ],
  },
  {
    input: 'types/index.d.ts',
    plugins: [dts()],
    output: {
      format: 'esm',
      file: 'dist/index.d.ts',
    },
  },
]);

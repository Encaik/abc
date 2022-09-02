import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'bundle.esm',
        file: 'dist/bundle.esm.js',
        format: 'module',
      },
      {
        name: 'bundle.umd',
        file: 'dist/bundle.umd.js',
        format: 'umd',
      },
    ],
    plugins: [
      resolve(), // 查找和打包node_modules中的第三方模块
      commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
      typescript(), // 解析TypeScript
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

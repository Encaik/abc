import * as fs from 'fs';
import * as path from 'path';

/**
 * 根据路径同步读取文件内容
 * @param {string} filePath
 * @return {string}
 */
export function readFile(filePath:string):string {
  return fs.readFileSync(path.resolve(filePath)).toString();
}
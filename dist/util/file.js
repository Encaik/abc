"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const fs = require("fs");
const path = require("path");
/**
 * 根据路径同步读取文件内容
 * @param {string} filePath
 * @return {string}
 */
function readFile(filePath) {
    return fs.readFileSync(path.resolve(filePath)).toString();
}
exports.readFile = readFile;

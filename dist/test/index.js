"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("../util/file");
const index_1 = require("../parse/index");
const txt = (0, file_1.readFile)('./src/test/example.abc');
(0, index_1.parse)(txt);

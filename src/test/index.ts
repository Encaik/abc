import { readFile } from "../util/file";
import { parse } from "../parse/index";

const txt = readFile('./src/test/example.abc');
parse(txt);
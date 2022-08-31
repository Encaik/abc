const fs = require('fs');
const { parse } = require('../dist/bundle.umd.js');

fs.readFile('./test/example.abc', 'utf-8', (err, res) => {
  if (err) {
    console.log('读取abc文件错误!');
    return;
  }
  console.log(err, res);
  console.log(parse(res));
});

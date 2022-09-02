# 乐谱转换

## 更新历史

### v0.0.1

- 废弃旧包，修改为 rollup 打包，重新开发

### v0.0.2

- 除去业务转换，保留纯净部分

### v0.0.3

- 修复文件入口不正确的问题

### v0.0.4

- 添加对升降号，升降调和音高，音长的解析

### v0.0.5

- 添加 Parser 解析器类
- 添加类型文件生成配置
- 添加 rollup 类型文件打包

### v0.0.6

- 添加对延长音的处理

## 使用

```sh
pnpm i @encaik/abc
```

```javascript
import { Parser } from '@encaik/abc';

let txt = `X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|E E B B A B E B|`;
let parser = new Parser(txt);
let resStr = parser.parse();
// 或
let parser = new Parser();
let resStr = parser.parse(txt);
```

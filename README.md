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

## 使用

```
pnpm i @encaik/abc
```

```
import { parse } from "@encaik/abc";

let txt = `X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|E E B B A B E B|`;
let musicJson = parse(txt);
```

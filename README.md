# [cnchar](https://github.com/theajack/cnchar)
#### [theajack](https://www.theajack.com/)
### 获取汉字笔画数和拼音的js库
[api详细文档地址](https://www.theajack.com/cnchar/)
### 1 安装
#### 1-1 使用 npm 安装

安装
`npm install cnchar`

使用

```
import CnChar from 'cnchar';
// 或
const CnChar = require('cnchar');
```

#### 1-2 使用script标签

```
<script src="https://www.theajack.com/cnchar/cnchar.min.js"></script>
```


### 2 使用
cnchar是一个简单小巧的专注于汉字笔画数和拼音的js库

它只有两个方法，是基于String的原型链扩展的

#### 2-1 .spell()
该方法用于获取汉字完整拼音

接受一个多个配置参数，这些参数可以组合使用

配置参数可选值如下：

|参数|作用|
|:--:|:--:|
|array|返回数组|
|first|返回首字母|
|up|将结果全部大写|
|low|将结果全部小|

示例：

```
"测试".spell() // 返回 'CeShi'
"测试".spell("up") // 返回 'CESHI'
"测试".spell("low") // 返回 'ceshi'
"测试".spell("first") // 返回 'CS'
"测试".spell("first","low") // 返回 'cs'
"测试".spell("array") // 返回 ['Ce','Shi']
"测试".spell("array","first","low") // 返回 ['c','s']

// 使用CnChar调用
CnChar.spell("测试","array","first","low) // 返回 ['c','s']
```

备注：

1.该方法等价于 `CnChar.spell(str,...args)`

2.数字、字母和其他字符会返回原字符

#### 2-2 .stroke()
获取汉字笔画数

```
"测".stroke() // 返回 9
"测试".stroke() // 返回 17
"abc12".stroke() // 返回 5

// 使用CnChar调用
CnChar.stroke(str) // 返回 17
```

备注：

1.该方法等价于 `CnChar.stroke(str)`

2.数字、字母和其他字符的笔画数计为 1

### 3 使用示例

[汉字打字游戏](https://www.theajack.com/type/)

### 4 不足之处

1. 暂不支持对多音字的处理

2. 对某些极其生僻的字也无法查到

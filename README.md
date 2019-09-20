# [cnchar](https://github.com/theajack/cnchar)
#### [theajack](https://www.theajack.com/)
### 获取汉字笔画数和拼音的js库
[api详细文档地址](https://www.theajack.com/cnchar/)
#### 安装
1.使用 npm 安装

安装
`npm install cnchar`

使用
import CnChar from 'cnchar';
或
const CnChar = require('cnchar');


2.使用script标签

`<script src="https://www.theajack.com/cnchar/cnchar.min.js"></script>`

#### 使用
cnchar是一个简单小巧的专注于汉字笔画数和拼音的js库

它只有两个方法，是基于String的原型链扩展的

+ .spell()
>该方法用于获取汉字完整拼音<br>
接受一个多个配置参数，这些参数可以组合使用<br>
配置参数可选值如下：<br>
array:返回数组<br>
first:返回首字母<br>
up:将结果全部大写<br>
low:将结果全部小写<br>
示例：<br>
"测试".spell() => 'CeShi'<br>
"测试".spell("up") => 'CESHI'<br>
"测试".spell("low") => 'ceshi'<br>
"测试".spell("first") => 'CS'<br>
"测试".spell("first","low") => 'cs'<br>
"测试".spell("array") => ['Ce','Shi']<br>
"测试".spell("array","first","low") => ['c','s']<br>
备注：<br>
1.该方法等价于 CnChar.spell(str,[args])<br>
2.数字、字母和其他字符会返回原字符<br>

+ .stroke()
>获取汉字笔画数<br>
"测试".stroke() => 17<br>
备注：<br>
1.该方法等价于 CnChar.stroke(str)<br>
2.数字、字母和其他字符的笔画数计为1<br>

#### 使用示例
[汉字打字游戏](https://www.theajack.com/type/)

#### 不足之处
1. 暂不支持对多音字的处理
2. 对某些极其生僻的字也无法查到

#### 参考自
1. [https://my.oschina.net/tommyfok/blog/202412](https://my.oschina.net/tommyfok/blog/202412)
2. [http://www.sharejs.com/js/math/170](http://www.sharejs.com/js/math/170)
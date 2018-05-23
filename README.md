# cnchar
#### 获取汉字笔画数和拼音的js库
[api详细文档地址](http://www.theajack.com/cnchar/)

cnchar是一个简单小巧的专注于汉字笔画数和拼音的js库

它只有三个方法，是居于String的原型链扩展的

+ .spell()
>该方法用于获取汉字完整拼音<br>
接受一个可选参数，可以是up或low<br>
"测试".spell() => CeShi<br>
"测试".spell("up") => CESHI<br>
"测试".spell("low") => ceshi<br>

+ .spellFirst()
>该方法用于获取汉字拼音首字母<br>
接受一个可选参数，只能选择不带参数或者为low<br>
"测试".spellFirst() => CS<br>
"测试".spellFirst("low") => cs<br>

+ .stroke()
>获取汉字笔画数<br>
"测试".stroke() => 17<br>

#### 使用示例
[汉字打字游戏](http://www.theajack.com/type/)

#### 不足之处
1. 暂不支持对多音字的处理
2. 对某些极其生僻的字也无法查到

#### 参考自
1. [https://my.oschina.net/tommyfok/blog/202412](https://my.oschina.net/tommyfok/blog/202412)
2. [http://www.sharejs.com/js/math/170](http://www.sharejs.com/js/math/170)

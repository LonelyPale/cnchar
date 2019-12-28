# [cnchar](https://github.com/theajack/cnchar)
#### [theajack](https://www.theajack.com/)
### 🚀 好用小巧、功能全面的汉字拼音笔画js库

**<a href="#64-使用实例大全">快速上手</a> | [在线试用](https://www.theajack.com/cnchar/) | [更新日志](https://github.com/theajack/cnchar/blob/master/helper/version.md) | [应用:打字游戏](https://www.theajack.com/type/) | [反馈错误/缺漏](https://github.com/theajack/cnchar/issues/8) | [Easy-ICON](https://github.com/theajack/easy-icon/blob/master/README_CN.md/)**

----

[TOC]

----

### 前言

感谢同学们对于cnchar的支持，由于cnchar词库来源于网络，虽然经过了本人的修改的扩充，但是还是难免有错误与缺漏之处，希望大家可以将使用中发现的错误与缺漏之处 [反馈](https://github.com/theajack/cnchar/issues/8) 给我（或自行修改提交，经过审查无误过后会合到cnchar中）

[我要反馈错误或缺漏](https://github.com/theajack/cnchar/issues/8)

### 0.快速使用

使用 npm 安装：
```
npm i cnchar
```

```js
import cnchar from 'cnchar';
'汉字'.spell();
'汉字'.stroke();
```

使用 script 标签使用：

```html
<script src="https://www.theajack.com/cnchar/dist/cnchar.latest.min.js"></script>
<!--
或通过版本号引用
<script src="https://www.theajack.com/cnchar/dist/cnchar.{version}.min.js"></script>
-->
<script>
    '汉字'.spell();
    '汉字'.stroke();
</script>
```

<a href="#64-使用实例大全">更多详细使用示例</a> | <a href="#6-spell-stroke-参数">参数详细介绍</a>

### 1.功能

1. 获取 **汉字拼音** ，支持首字母、大小写、数组分割、备选 **多音字** 等功能
2. 支持 **多音词**
3. 支持 **拼音音调**
4. 获取汉字 **笔画数** 、支持数组分割
5. 获取汉字 **笔画顺序** 、笔画详细名称、通过笔画顺序推出原汉字等
6. 支持 **简体字** 、 **繁体字** 、 **火星文** 互转
7. 支持 **繁体字** 拼音、笔画数，实现和简体字一样的功能
8. **体积小**，min 版本仅 46 kb，zip 版本 34 kb (含有大量汉字拼音字典)
9.  **多端可用**，可用于 原生浏览器环境、webpack环境、nodejs环境...，几乎支持所有js能运行的环境
10. 丰富的配置，按需取用

### 2.概览

考虑到不同的需求，cnchar的功能被拆分到以下四个库中：

|     名称     |              描述              |                          功能                          |
| :----------: | :----------------------------: | :----------------------------------------------------: |
|    cnchar    | 主js库，其他三个库依赖于这个库 |       含有简体字拼音、多音字、音调、笔画数等功能       |
| cnchar-poly  |            多音词库            |                   含有识别多音词功能                   |
| cnchar-order |           笔画顺序库           |       含有识别笔画顺序、笔画名称、笔画形状等功能       |
| cnchar-trad  |            繁体字库            | 支持繁体、火星、简体互转，支持繁体拼音笔画多音字全功能 |

### 3 安装
#### 3.1 使用 npm 安装

安装基础库：

```
npm i cnchar
```

安装附加功能库：

```
npm i cnchar-poly cnchar-order cnchar-trad
```

当然您也可以按需安装其中的几个，但是 `cnchar` 这个基础库是必须安装的

或者您可以通过安装`cnchar-all`来使用完整功能，这个库引用了上面的四个库

```
npm i cnchar-all
```

#### 3.2 使用 script 引入

```html
<script src="https://www.theajack.com/cnchar/dist/cnchar.latest.min.js"></script>
<script src="https://www.theajack.com/cnchar/dist/cnchar.poly.latest.min.js"></script>
<script src="https://www.theajack.com/cnchar/dist/cnchar.order.latest.min.js"></script>
<script src="https://www.theajack.com/cnchar/dist/cnchar.trad.latest.min.js"></script>
<!-- 或使用版本号引用 -->
<script src="https://www.theajack.com/cnchar/dist/cnchar.{version}.min.js"></script>
<script src="https://www.theajack.com/cnchar/dist/cnchar.poly.{version}.min.js"></script>
<script src="https://www.theajack.com/cnchar/dist/cnchar.order.{version}.min.js"></script>
<script src="https://www.theajack.com/cnchar/dist/cnchar.trad.{version}.min.js"></script>
```

### 4 使用
#### 4.1 webpack、babel 等浏览器环境

npm 安装好几个库之后：

```js
// 请保证最先引入 cnchar 基础库，其他几个库顺序无所谓
import cnchar from 'cnchar';
import 'cnchar-poly';
import 'cnchar-order';
import 'cnchar-trad';

console.log('汉字'.spell());// prototype 方式调用
console.log(cnchar.spell('汉字'));// cnchar api 调用
```

浏览器环境下会在 `window` 对象上定义 `cnchar` 对象

#### 4.2 nodejs 等非浏览器环境

非浏览器环境下需要使用 `cnchar.use()` 方法加载功能库：

```js
// 请保证最先引入 cnchar 基础库，其他几个库顺序无所谓
var cnchar = require('cnchar');
var poly = require('cnchar-poly');
var order = require('cnchar-order');
var trad = require('cnchar-trad');
cnchar.use(poly, order, trad);

console.log('汉字'.spell());// prototype 方式调用
console.log(cnchar.spell('汉字'));// cnchar api 调用
```

其他使用方式与浏览器环境一致

#### 4.3 原生浏览器环境

原生浏览器环境就需要使用 script 标签引入js文件：

```html
<script src="https://www.theajack.com/cnchar/dist/cnchar.latest.min.js"></script>
<script src="https://www.theajack.com/cnchar/dist/cnchar.poly.latest.min.js"></script>
<script src="https://www.theajack.com/cnchar/dist/cnchar.order.latest.min.js"></script>
<script src="https://www.theajack.com/cnchar/dist/cnchar.trad.latest.min.js"></script>
<script>
    console.log('汉字'.spell());// prototype 方式调用
    console.log(cnchar.spell('汉字'));// cnchar api 调用
</script>
```

### 5 API
#### 5.1 拼音笔画基础 API

为了尽可能使api使用简单，该库设计了两个主要的非常简洁的 api，并保证调用方式一致：

```js
// 获取汉字的拼音、多音词、音调等都集成在以下方法上
cnchar.spell(string[,...args]); 
// 或
string.spell([...args])

// 获取汉字的笔画、笔画顺序等都集成在以下方法上
cnchar.stroke(string[,...args]);
// 或
string.stroke([...args])
```

该 api 设计一致，`string` 表示要处理的汉字字符串

关键在于可选参数的配置，参数配置将在<a href="#user-content-6-spell-stroke-参数">第六章</a>单独介绍

#### 5.2 繁体、简体、火星文互转

当引入 `cnchar-trad` 之后，cnchar 就具备了繁体、简体、火星文互转功能，使用 `cnchar.convert` 对象上的方法，你就可以使用这个功能

自从v2.0.4以后，cnchar保留以下方法可供使用：

```js
cnchar.convert.simpleToTrad(string); // 简体 => 繁体
cnchar.convert.simpleToSpark(string); // 简体 => 火星文
cnchar.convert.tradToSimple(string); // 繁体 => 简体
cnchar.convert.tradToSpark(string); // 繁体 => 火星文
cnchar.convert.sparkToSimple(string); // 火星文 => 简体
cnchar.convert.sparkToTrad(string); // 火星文 => 繁体

string.convertSimpleToTrad();
string.convertSimpleToSpark();
string.convertTradToSimple();
string.convertTradToSpark();
string.convertSparkToSimple();
string.convertSparkToTrad();
```

#### 5.3 笔画序列推出原汉字

当引入 `cnchar-order` 功能库(版本2.0.2及以上)之后，cnchar 就支持了根据笔画名称序列推出原汉字的功能，使用方式如下：

```js
cnchar.orderToWord(orderNameArray[,...args]);
```

`orderNameArray` 是笔画名称序列

`args` 是参数列表，可选值有  `['all','simple']`, 使用 `cnchar.type.orderToWord` 可以查看可选值

`'all'` 表示匹配所有以该笔序开头的汉字

`'simple'` 表示禁用繁体字，该参数仅在引入了 `cnchar-trad` 后有效

`orderNameArray` 是一个数组，可用的笔画名称可以通过以下api查看

```js
var dict = cnchar.orderToWord.orders; // dict 是一个包含所有笔画数的详细信息的json数据
```

笔画详细信息的如下，orderNameArray只需要传入笔画名称即可，也就是下面json数据的key值

```js
{
    卧钩: {shape: "㇃", letter: "y", sameLetterTo: "斜钩"}
    弯钩: {shape: "㇁", letter: "t"}
    捺: {shape: "㇏", letter: "l"}
    提: {shape: "㇀", letter: "i"}
    撇: {shape: "㇓", letter: "s"}
    撇折: {shape: "㇜", letter: "n"}
    撇点: {shape: "㇛", letter: "m"}
    斜钩: {shape: "㇂", letter: "y", sameLetterTo: "卧钩"}
    横: {shape: "㇐", letter: "j"}
    横折: {shape: "㇕", letter: "c"}
    横折弯: {shape: "㇍", letter: "v", sameLetterTo: "横折折"}
    横折折: {shape: "㇅", letter: "v", sameLetterTo: "横折弯"}
    横折折折: {shape: "㇎", letter: "q"}
    横折折折钩: {shape: "㇡", letter: "w", sameLetterTo: "横撇弯钩"}
    横折折撇: {shape: "㇋", letter: "a"}
    横折提: {shape: "㇊", letter: "p"}
    横折钩: {shape: "㇆", letter: "r"}
    横撇: {shape: "㇇", letter: "e", sameLetterTo: "横钩"}
    横撇弯钩: {shape: "㇌", letter: "w", sameLetterTo: "横折折折钩"}
    横斜钩: {shape: "⺄", letter: "o"}
    横钩: {shape: "㇖", letter: "e", sameLetterTo: "横撇"}
    点: {shape: "㇔", letter: "k"}
    竖: {shape: "㇑", letter: "f"}
    竖弯: {shape: "㇄", letter: "b"}
    竖弯钩: {shape: "㇟", letter: "u"}
    竖折折: {shape: "㇞", letter: "x", sameLetterTo: "竖折撇"}
    竖折折钩: {shape: "㇉", letter: "z"}
    竖折撇: {shape: "ㄣ", letter: "x", sameLetterTo: "竖折折"}
    竖提: {shape: "㇙", letter: "h"}
    竖钩: {shape: "㇚", letter: "g"}
}
```

注：其中以下五对笔画没有进行区分，使用的是同样的字母表示：
**卧钩 = 斜钩**、**横折弯 = 横折折**、**横折折折钩 = 横撇弯钩**、**横撇 = 横钩**、**竖折折 = 竖折撇**

以下是一个例子：

```js
cnchar.orderToWord(['横','撇','捺']);
// 返回 ["丈", "大"]
cnchar.orderToWord(['横','撇','捺'],'all');
// 返回 ["丈", "大", "太", "犬", "夯", "夸", "夺", "夼", "奁", "奄", "奈", "奋", "奔", "态", "奎", "耷", "套", "奢", "瓠", "鹩", "奪", "奮", "遼"]
cnchar.orderToWord(['横','撇','捺'],'all','simple');
// 返回 ["丈", "大", "太", "犬", "夯", "夸", "夺", "夼", "奁", "奄", "奈", "奋", "奔", "态", "奎", "耷", "套", "奢", "瓠", "鹩"]
```

如果输入的笔画不在 `cnchar.orderToWord.orders` 内，则该方法会打印一个错误提示哪些笔画有误，并返回一个空数组。

#### 5.4 其他api
##### 5.4.1 .use()

这个api的功能是显式启用 `poly`、`order`、`trad` 三个功能库

```js
cnchar.use(...libs);
```

这个启用在非浏览器环境（比如nodejs等）中是必须的，使用如下：

```js
// 请保证最先引入 cnchar 基础库，其他几个库顺序无所谓
var cnchar = require('cnchar');
var poly = require('cnchar-poly');
var order = require('cnchar-order');
var trad = require('cnchar-trad');
cnchar.use(poly, order, trad); // 参数顺序无关，三个参数可以任意选择
```

在浏览器环境中则无需调用：

```js
// 请保证最先引入 cnchar 基础库，其他几个库顺序无所谓
import cnchar from 'cnchar';
import 'cnchar-poly';
import 'cnchar-order';
import 'cnchar-trad';
```

##### 5.4.2 .type

type对象用户获取当前可用的 `spell` 、 `stroke` 和 `orderToWord` 参数类型：

```js
var spellArg = cnchar.type.spell;
var strokeArg = cnchar.type.stroke;
var orderToWordArg = cnchar.type.orderToWord;
```

spellArg 最多可用值： `["array", "low", "up", "first", "poly", "tone", "simple"]`

strokeArg 最多可用值：`["letter", "shape", "count", "name", "detail", "array", "order", "simple"]`

orderToWordArg 最多可用值：`["all", "simple"]`

具体用法<a href="#user-content-6-spell-stroke-参数">第六章</a>讲到


##### 5.4.3 .check

该值是一个 布尔类型，用于控制是否开启参数校验，默认值为true

参数校验能够对 `spell` 和 `stroke` 传入的参数进行检查，在控制台显示 `无效·`，`忽略`和`冗余`的参数

```js
cnchar.check = false; // 关闭参数校验
```

##### 5.4.4 .version

获取当前版本：

```js
var version = cnchar.version; // string 类型
```

##### 5.4.5 .plugins

当前使用的功能库列表，最多的情况为 `["order", "trad", "poly"]`

```js
var plugins = cnchar.plugins; // array 类型
```

### 6 spell stroke 参数
#### 6.1 spell 参数

参数调用如下，所有arg参数都是可选的

```js
cnchar.spell(string,arg1,arg2,...); 
string.spell(arg1,arg2,...)
```

arg 参数信息如下：

|  参数  |         作用         | 是否默认 |   依赖库    |                                  备注                                   |
| :----: | :------------------: | :------: | :---------: | :---------------------------------------------------------------------: |
| array  |       返回数组       |    否    |     --      |                                   --                                    |
| first  |    返回拼音首字母    |    否    |     --      |                                   --                                    |
|   up   |    将结果全部大写    |    否    |     --      |                                   --                                    |
|  low   |    将结果全部小写    |    否    |     --      |                             会被up参数覆盖                              |
|  poly  |    使用候选多音字    |    否    |     --      |                                   --                                    |
|  tone  |       启用音调       |    否    |     --      |                                   --                                    |
| simple | 是否繁体字的拼音功能 |    否    | cnchar-trad | 使用cnchar-trad之后，默认对繁体字拼音进行转换，该参数用于禁用繁体字拼音 |

#### 6.2 stroke 参数

参数调用如下，所有arg参数都是可选的

```js
cnchar.stroke(string,arg1,arg2,...); 
string.stroke(arg1,arg2,...)
```

arg 参数信息如下：

|  参数  |                       作用                       | 是否默认 |    依赖库    |                                    备注                                     |
| :----: | :----------------------------------------------: | :------: | :----------: | :-------------------------------------------------------------------------: |
| array  |                     返回数组                     |    否    |      --      |               使用cnchar-order 且启用 order参数后该参数被忽略               |
| order  |                   启用笔画顺序                   |    否    | cnchar-order |                                     --                                      |
| letter |               使用笔画顺序字母序列               |    是    | cnchar-order |                         当启用order后，该值是默认值                         |
| detail | 使用笔画顺序详情作为返回值，每个汉字对应一个json |    否    | cnchar-order |                              优先级小于letter                               |
| shape  |              使用笔画形状作为返回值              |    否    | cnchar-order |                              优先级小于detail                               |
|  name  |              使用笔画名称作为返回值              |    否    | cnchar-order |                               优先级小于shape                               |
| count  |               使用笔画数作为返回值               |    否    | cnchar-poly  |                               优先级小于name                                |
| simple |               是否繁体字的笔画功能               |    否    | cnchar-trad  | 使用cnchar-trad之后，默认对繁体字启用笔画功能，该参数用于禁用繁体字笔画功能 |


#### 6.3 orderToWord 参数

参数调用如下，所有arg参数都是可选的

```js
cnchar.orderToWord(orderArray,arg1,arg2); 
```

arg 参数信息如下：

|  参数  |            作用            | 是否默认 |   依赖库    |                 备注                  |
| :----: | :------------------------: | :------: | :---------: | :-----------------------------------: |
|  all   | 匹配所有以该笔序开头的汉字 |    否    |     --      |                  --                   |
| simple |         禁用繁体字         |    否    | cnchar-trad | 该参数仅在引入了 `cnchar-trad` 后有效 |

#### 6.4 使用实例大全：

##### 6.4.0 安装使用

npm 方式

```
npm i cnchar
```

```js
import cnchar from 'cnchar';
// do something
```

script标签引用 方式

```html
<script src="https://www.theajack.com/cnchar/dist/cnchar.latest.min.js"></script>
<script>
    // do something
</script>
```

##### 6.4.1 cnchar 基础库功能

```js
//spell 功能
"测试".spell() // 返回 'CeShi'
"测试".spell("up") // 返回 'CESHI'
"测试".spell("low") // 返回 'ceshi'
"测试".spell("first") // 返回 'CS'
"测试".spell("first","low") // 返回 'cs'
"测试".spell("array") // 返回 ['Ce','Shi']
"测试".spell("array","first","low") // 返回 ['c','s']
"测试".spell('tone') // 返回 'CèShì'
"长大了".spell('poly') // 返回 '(Zhang|Chang)(Da|Dai)(Le|Liao)'

//stroke 功能
"测".stroke() // 返回 9
"测试".stroke() // 返回 17
"测试".stroke('array') // 返回 [9,8]
```

备注：

1. string.spell(...arg)方法等价于 `cnchar.spell(string,...args)`
2. string.stroke(...arg)方法等价于 `cnchar.stroke(string,...args)`
3. spell 方法 非中文字符会返回原字符
4. stroke 方法 非中文字符会笔画数会计为 0
5. stroke 方法 order模式 非中文字符会返回 undefined

##### 6.4.2 cnchar-poly 库功能

该库用于准确识别多音词，同样支持 6.3.1中的其他参数功能

```js
"长大了".spell() // 返回 'ZhangDaLe'
"长大了".spell('array') // 返回 ["Zhang", "Da", "Le"]
"长大了".spell('poly') // 返回 '(Zhang|Chang)(Da|Dai)(Le|Liao)'
```

##### 6.4.3 cnchar-order 库功能

该库用于查询汉字笔画顺序、笔画名称等，返回值为 数组

```js
"一个".stroke('order') // 返回 ["j","slf"] 需要显式使用 order 参数 默认返回笔画数字母序列
"一个".stroke('order','detail') //
/* 返回详细笔画信息：
[
    [{
        "shape": "㇐", 
        "type": "平笔", 
        "foldCount": "0", 
        "name": "横"
    }],[{
        "shape": "㇓", 
        "type": "平笔", 
        "foldCount": "0", 
        "name": "撇"
    },{
        "shape": "㇏", 
        "type": "平笔", 
        "foldCount": "0", 
        "name": "捺"
    },{
        "shape": "㇑", 
        "type": "平笔", 
        "foldCount": "0", 
        "name": "竖"
    }]
]*/
"一个".stroke('order','shape') // 返回 [["横"],["撇", "捺", "竖"]]
"一个".stroke('order','name') // 返回 [["㇐"],["㇓","㇏","㇑"]]
"一个".stroke('order','count') // 返回 [1, 3]
```

根据笔画名称序列推出原汉字

```js
var orders = cnchar.orderToWord.orders; //查看支持的笔画名称
cnchar.orderToWord(['横','撇','捺']);
// 返回 ["丈", "大"]
cnchar.orderToWord(['横','撇','捺'],'all');
// 返回 ["丈", "大", "太", "犬", "夯", "夸", "夺", "夼", "奁", "奄", "奈", "奋", "奔", "态", "奎", "耷", "套", "奢", "瓠", "鹩", "奪", "奮", "遼"]
cnchar.orderToWord(['横','撇','捺'],'all','simple');
// 返回 ["丈", "大", "太", "犬", "夯", "夸", "夺", "夼", "奁", "奄", "奈", "奋", "奔", "态", "奎", "耷", "套", "奢", "瓠", "鹩"]
```

##### 6.4.4 cnchar-trad 库功能

该库用于支持繁体字火星文转换及其拼音笔画数功能

###### 6.4.4.1 convert 字体转换

```js
"一个人".convertSimpleToTrad(); // 返回 "壹個人" 等价于 cnchar.convert.simpleToTrad
cnchar.convert.simpleToTrad("一个人");

"一个人".convertSimpleToSpark(); // 返回 "①個亾" 等价于 cnchar.convert.simpleToSpark
cnchar.convert.simpleToSpark("一个人");

"壹個人".convertTradToSimple(); // 返回 "一个人" 等价于 cnchar.convert.tradToSimple
cnchar.convert.tradToSimple("壹個人");

"壹個人".convertTradToSpark(); // 返回 "①個亾" 等价于 cnchar.convert.tradToSpark
cnchar.convert.tradToSpark("壹個人");

"①個亾".convertSparkToSimple(); // 返回 "一个人" 等价于 cnchar.convert.sparkToSimple
cnchar.convert.sparkToSimple("①個亾");

"①個亾".convertSparkToTrad(); // 返回 "壹個人" 等价于 cnchar.convert.sparkToTrad
cnchar.convert.sparkToTrad("①個亾");
```

###### 6.4.4.2 spell 和 stroke 方法

该库增加了对于繁体字的拼音笔画功能扩展，其他基础用法与 基础库一致：

```js
//spell 功能
"長大".spell() // 返回 'ZhangDa'
"長大".spell('simple') // 返回 '長Da' // 禁用繁体字拼音功能 

//stroke 功能
"長大".stroke('array')  // 返回 [8, 3]
"長大".stroke('array','simple') // 返回 [0, 3] // 禁用繁体字笔画功能
"長大".stroke('order','shape')  // 返回 [["㇐","㇑","㇐","㇐","㇐","㇙","㇓","㇏"],["㇐","㇓","㇏"]]
"長大".stroke('order','shape','simple') // 返回 [undefined, ["㇐","㇓","㇏"]]
```


### 7 应用例子

[汉字打字游戏](https://www.theajack.com/type/)

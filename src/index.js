import cnchar from './main/index';
import './plugin/order';
import './plugin/trad';
import './plugin/poly';
// import './plugin/draw'
// console.log('1',cnchar)

console.log(cnchar.stroke('一个', 'order'));
console.log(cnchar.stroke('長城', 'count', 'order', 'name'));
console.log(cnchar.orderToWord(['横', '撇', '捺']));
console.log('美好的地方'.spell('tone'));
export default cnchar;

// var cnchar = require('./main/index')
// var order = require('./plugin/order')
// var trad = require('./plugin/trad')
// var poly = require('./plugin/poly')
// cnchar.use(order,trad,poly)
// console.log(cnchar.stroke("一个",'order'))
// console.log(cnchar.stroke('長城','count','order','name'))
// module.exports = cnchar

// import b from './b'
// // var b = require('./b')
// console.log(b);
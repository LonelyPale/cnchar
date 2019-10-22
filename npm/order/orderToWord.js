var orders = require('./stroke-order-jian.json')
var strokeTable = require('./stroke-table.json')

let arg = {all:'all', simple:'simple'}
let _ = {};// 工具方法

function initOrderToWord(cnchar){
    cnchar.orderToWord = orderToWord;
    cnchar.type.orderToWord = arg;
    _ = cnchar._;
}

function orderToWord(...args){
    let orderArr = args[0];
    args = args.splice(1);
    let matchAll = _.has(args,arg.all);
    // matchAll 表示是否匹配已该笔划序开头的所以汉字
    if(!orderArr instanceof Array){
        throw new Error('orderToWord: 输入必须是笔画名数组');
    }
    _.checkArgs('orderToWord',args);
    let errorOrder = []
    let letters='';
    orderArr.forEach((name)=>{
        if(orderToWord.orders[name]){
            letters+=orderToWord.orders[name].letter;
        }else{
            errorOrder.push(name)
        }
    })
    if(errorOrder.length>0){
        console.error('orderToWord: 参数笔画名数组有误：'+errorOrder.join(','));
        return [];
    }
    let res = []
    res = base(res, letters, matchAll, orders);
    if(!_.has(args,arg.simple) && _.dict.getTradOrders){
        res = base(res, letters, matchAll, _.dict.getTradOrders());
    }
    return res;
}



function base(res, letters, matchAll, dict){
    if(matchAll){
        for(var k in dict){ // 写两个 for 为了提高效率
            if(dict[k].indexOf(letters) === 0){
                res.push(k);
            }
        }
    }else{
        for(var k in dict){
            if(dict[k].length>letters.length){
                break;
            }
            if(dict[k] === letters){
                res.push(k);
            }
        }
    }
    return res;
}

function init(){
    orderToWord.orders = {}
    orderToWord._base = base;
    for(var k in strokeTable){
        var single = strokeTable[k];
        let name = single.name.split('(')[0]; // 有别名时 只取第一个
        orderToWord.orders[name]={
            shape:single.shape,
            letter:k
        };
    }
}

init();
module.exports = initOrderToWord;
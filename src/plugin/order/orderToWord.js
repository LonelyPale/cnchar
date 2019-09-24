var orders = require('./stroke-order-jian.json')
var strokeTable = require('./stroke-table.json')

function orderToWord(orderArr,matchAll){
    // matchAll 表示是否匹配已该笔划序开头的所以汉字
    if(!orderArr instanceof Array){
        throw new Error('orderToWord: 输入必须是笔画名数组');
    }
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
    if(matchAll){
        for(var k in orders){ // 写两个 for 为了提高效率
            if(orders[k].indexOf(letters) === 0){
                res.push(k);
            }
        }
    }else{
        for(var k in orders){
            if(orders[k].length>letters.length){
                break;
            }
            if(orders[k] === letters){
                res.push(k);
            }
        }
    }
    return res;
}

function init(){
    orderToWord.orders = {}
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
module.exports = orderToWord;
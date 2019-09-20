import countDict from './stroke-count-fan.json'
import orderDict from './stroke-order-fan.json'

import {convert} from './jian-fan'
let arg = {
    simple:'simple',array:'array',order:'order' // 开启简单模式
}
let _ = {};// 工具方法

function init(){
    if(window && window.CnChar){
        CnChar.convert = convert;
        let _p = String.prototype;
        CnChar.type.spell.simple = arg.simple;
        CnChar.type.stroke.simple = arg.simple;
        reinitSpell(_p);
        reinitStroke(_p);
        _p.convertSimpleToTrad = function(){return convert.simpleToTrad(this);}
        _p.convertSimpleToSpark = function(){return convert.simpleToSpark(this);}
        _p.convertTradToSimple = function(){return convert.tradToSimple(this);}
        _p.convertTradToSpark = function(){return convert.tradToSpark(this);}
        _p.convertSparkToSimple = function(){return convert.sparkToSimple(this);}
        _p.convertSparkToTrad = function(){return convert.sparkToTrad(this);}
        _p.convertToTrad = function(){return convert.toTrad(this);}
        _p.convertToSimple = function(){return convert.toSimple(this);}
        _p.convertToSpark = function(){return convert.toSpark(this);}
        _ = CnChar._;
    }else{
        _._throw('必须先引入 cnchar: npm i cnchar')
    }
}
function reinitSpell (proto){
    let _spell = CnChar.spell;
    let newSpell = function(...args){
        let str = args[0];
        args = args.splice(1);
        if(!_.has(args,arg.simple)){ // 默认繁体模式
            str = convert.tradToSimple(str);
        }
        return _spell(str,...args);
    }
    proto.spell = function(...args){
        return newSpell(_spell,this,...args);
    }
    CnChar.spell = function(...args){return newSpell(_spell,...args)};
    if(!CnChar._.poly){
        CnChar._reinitSpellPoly = function(){
            _spell = CnChar.spell;
            proto.spell = function(...args){
                return newSpell(this,...args);
            }
            CnChar.spell = function(...args){return newSpell(...args)};
        };;
    }
}

function reinitStroke(proto){
    let _stroke = CnChar.stroke;
    let _new = function(...args){
        let str = args[0];
        args = args.splice(1);
        let isArr = _.has(args,arg.array)
        let isOrder = _.has(args,arg.order)
        if(!isArr){args.push(arg.array);}// 先使用array模式
        let res = _stroke(str,...args); // 没有繁体的结果
        if(!isOrder){ // stroke 方法
            if(_.has(args,arg.simple)){ // 启用简单模式则 直接返回
                return (isArr) ? res : _.sumStroke(res);
            }
            for(var i=0;i<countDict.length;i++){
                for(var j=0;j<res.length;j++){
                    if(res[j] === 0 && countDict[i].indexOf(str[j])!==-1){
                        res[j]=i;
                    }
                }
            }
            return (isArr) ? res : _.sumStroke(res);
        }else{ // strokeOrder 方法 
            if(_.has(args,arg.simple)){ // 启用简单模式则 直接返回
                return res;
            } else { // 将其中的繁体字获取 strokeOrder
                for(var i=0;i<res.length;i++){
                    if(typeof res[i] === 'string'){
                        res[i] = orderDict[str[i]] // 字母版笔画表
                    }
                }
                return _.orderWithLetters(res,str,args);
            }
        }
    }
    proto.stroke = function(...args){
        return _new(this,...args);
    }
    CnChar.stroke = function(...args){return _new(...args)};
    if(!CnChar._.order){
        CnChar._reinitStrokeOrder = function(){
            _stroke = CnChar.stroke;
            proto.stroke = function(...args){
                return _new(this,...args);
            }
            CnChar.stroke = function(...args){return _new(...args)};
        };;
    }
}


init();
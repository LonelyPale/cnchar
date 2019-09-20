import polyPhrases from './polyphone-phrase-simple.json'

let _ = {};// 工具方法

let arg = {origin:'origin'}

var _spell;

function _poly(...args){
    let str = args[0]; // 待处理的字符串
    args = args.splice(1);
    let newArgs = [_.arg.array]; // 先用数组
    let tone = _.has(args,_.arg.tone);
    // 多音字参数参数将被忽略
    if(_.has(args,_.arg.poly))
        _._wran('多音字参数 poly 被忽略')
    if(tone){newArgs.push(_.arg.tone)} // 音调参数
    // 其他几个参数等获取到多音拼音之后在处理
    let res = _spell(str,'',...newArgs); // 获取
    for(var k in polyPhrases){
        let index = str.indexOf(k);
        if(index !== -1) { // 命中了多音词词库
            let pa = polyPhrases[k].split(' ');// 多音词拼音数组
            for(var i=0;i<pa.length;i++){
                res[index+i] = _.removeTone(pa[i],tone)
            }
        }
    }
    _.dealUpLowFirst(res,args);
    if(!_.has(args,_.arg.array)){
        res=res.join('');
    }
    return res;
}
function init(){
    if(window && window.CnChar){
        _spell = CnChar._origin.spell;
        _ = CnChar._;
        var _new = function(...args){
            if(_.has(args,arg.origin)){
                return _spell(...args)
            }
            return _poly(...args);
        };
        CnChar.spell = _new
        String.prototype.spell = function(...args){
            return _new(this,...args);
        }
        CnChar.type.spell.origin = arg.origin;
        CnChar._.poly = true;
        if(CnChar._reinitSpellPoly){
            CnChar._reinitSpellPoly();
            delete CnChar._reinitSpellPoly;
        }
    }else{
        _._throw('必须先引入 cnchar: npm i cnchar')
    }
}


init();
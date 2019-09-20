
const tones   = 'āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜ'
const noTones = 'aoeiuü'
export function _throw(err){
    throw new Error('CnChar Error:'+err)
}
export function _wran(err){
    console.warn('CnChar Warning:'+err)
}
export let arg = {
    array:'array',
    low:'low',
    up:'up',
    first:'first',
    poly:'poly',
    tone:'tone',
}
export function isCnChar(word){
    let unicode = word.charCodeAt(0);
    return unicode >= 19968 && unicode <= 40869;
}

export function has(args, name){
    return args.indexOf(name) !== -1;
}

export function spell(dict,args){
    let strs = args[0].split('');
    args = args.splice(1);
    let poly = has(args,arg.poly);
    let tone = has(args,arg.tone);
    let res = [];
    for(let sp in dict){ // 遍历拼音
        let ds = dict[sp];
        let pos = ds[0]
        for(var i=0;i<strs.length;i++){ // 遍历字符数组
            let ch = strs[i];
            if(isCnChar(ch)){ // 如果是汉字
                let index = ds.indexOf(ch);
                if(index !== -1){
                    let ssp = getSpell(sp, ds, index, poly, tone, pos) // single spell
                    if(ssp.poly){ // 多音字模式 且 当前汉字是多音字
                        if(!res[i]){
                            res[i] = [];
                        }
                        res[i].push(ssp.res);
                        let dsNew = ds;
                        let n = dsNew.match(new RegExp(ch,'g')).length;
                        for(var k=1;k<n;k++){
                            dsNew = dsNew.substr(index+2);
                            index = dsNew.indexOf(ch);
                            res[i].push(getSpell(sp, dsNew, index, poly, tone, pos).res);
                        }
                    }else{
                        res[i] = ssp.res
                        strs[i] = '';
                    }
                }
            }else if(ch!==''){ // 如果不是汉字
                res[i] = ':'+ch;
            }
        }
    }
    dealUpLowFirst(res,args);
    for(let i=0;i<strs.length;i++){
        let item = res[i];
        if(typeof item === 'undefined'){
            res[i] = strs[i]; // 查不到的汉字返回原字
        }else if(typeof item !== 'string'){
            res[i] = `(${res[i].join('|')})`
        }else if(item[0] === ':'){
            res[i] = item.substr(1); // 非汉字返回原字符
        }
    }
    if(!has(args,arg.array)){
        res=res.join('');
    }
    return res;
}

export function dealUpLowFirst(res,args){
    if(has(args,arg.first)){
        dealResCase(res,first)
    }
    if(has(args,arg.up)){
        dealResCase(res,up);
    }else if(!has(args,arg.low)){
        dealResCase(res,upFirst);
    }
}

function dealResCase(res,func){
    res.forEach((item,i)=>{
        if(typeof item !== 'string'){
            item.forEach((s,j)=>{item[j] = func(s)});
        }else{
            if(item[0]!==':')
                res[i] = func(item);
        }
    })
}

function first(s){
    return s[0];
}

function up(s){
    return s.toUpperCase();
}
function upFirst(s){
    return up(s[0])+s.substr(1);
}
function low(s){
    return s.toLowerCase();
}


function getSpell(spell, str, index, isPoly, isTone, pos){
    let res = {res:spell,poly:false};
    if(!isPoly && !isTone){
        return res;
    }
    let tone = parseInt(str[index+1]);
    if(tone >= 5){ // 是多音字
        tone -= 5; // 正确的音调
        if(isPoly){ // 既是多音字模式 又是 多音字
            res.poly = true;
        }
    }
    if(isTone){
        res.res = setTone(spell,pos,tone)
    }
    return res;
}

export function removeTone(str,tone){
    if(tone){
        return str;
    }
    for(var i=0;i<str.length;i++){
        let index = tones.indexOf(str[i])
        if(index!==-1){ // 命中
            return str.substr(0,i)+noTones[Math.floor(index/4)]+str.substr(i+1)
        }
    }
    return str;
}

function setTone(spell,index,tone){
    if(tone === 0){ // 轻声
        return spell;
    }
    let p = spell[index];
    return spell.replace(p, tones[noTones.indexOf(p) * 4 +(tone-1)]);
}



// 笔画数
export function stroke (dict,args){
    let strs = args[0].split('');
    args = args.splice(1);
    for(var i=0;i<dict.length;i++){
        for(let j=0;j<strs.length;j++){
            if(typeof strs[j]==='string'){
                if(dict[i].indexOf(strs[j])!==-1){
                    strs[j]=i;
                }
            }
        }
    }
    strs.forEach(function(c,i){
        if(typeof c==='string'){
            strs[i] = 0;
        }
    })
    if(!has(args,arg.array)){
        return sumStroke(strs);
    }
    return strs;
}
export function sumStroke (strs){
    let sum = 0;
    strs.forEach(function(c){
        sum+=c;
    })
    return sum;
}

// spell 所有参数 ["array", "low", "up", "first", "poly", "tone", "simple", "origin"] 
//  simple 禁用繁体字
//  origin 禁用多音词

// stroke 所有参数 ["letter", "shape", "count", "name", "detail", "array", "order", "simple"]
//  
export function checkArgs(type,args){
    var useless = [];
    var t = window.cnchar.type;
    for(var i = args.length-1;i>=0;i--){
        let arg = args[i]
        if(!t.spell[arg] && !t.stroke[arg]){
            useless.push(arg);
            args.splice(i,1);
        }
    }
    var ignore = []
    var redunt = [];
    var check = (name,arr)=>{
        arr = arr || ignore
        if(has(args,name)){ arr.push(name); }
    }
    if(type === 'spell'){
        if(has(args,'up') && has(args,'low')){
            ignore.push('low');
        }
        if(t.spell.origin && !has(args,'origin') && has(args,'poly')){ // t.spell.origin 表示启用了多音词
            ignore.push('poly');
        }
    } else { // stroke
        if(has(args,'order')){ // 笔画顺序模式
            check('array',redunt);
            
        }else{ // 笔画数模式
            check('letter')
            check('shape')
            check('name')
            check('count',redunt)
            check('detail')
        }
    }
}
var drawText = require('./draw.js')

function main(cnchar){
    if(cnchar.plugins.indexOf('draw')!==-1){
        return;
    }
    cnchar.plugins.push('draw');
    cnchar.draw = draw;
    String.prototype.draw = function(opt){
        return draw(this,opt);
    }
}


function init(){
    if(typeof window==='object' && window.CnChar){
        main(window.CnChar)
    }else{
        throw new Error('cnchar-draw 仅在浏览器环境中生效')
    }
}

/*
    opt:
    size: 每一个字的大小 单位px
    width: 线条宽度
    color: 颜色 
    font: 字体
    ele: 附加在哪个元素上 可以时id值或dom元素 默认为body
    animation: 是否使用动画
    time: 画一个笔的时间 默认500ms
    return ele
*/
function draw(text,opt){
    opt = opt || {};
    opt.ele = opt.ele || window.document.body;
    opt.size = opt.size || 40;
    opt.animation = opt.animation || false;
    opt.time = opt.time || 500;
    opt.width = opt.width || 2;
    opt.color = opt.color || '#000';
    opt.font = opt.font || 'Microsoft Yahei';
    if(typeof opt.ele === 'string'){
        opt.ele = window.document.getElementById(opt.ele);
    }
    var canvas = document.createElement('canvas');
    canvas.width = opt.size * text.length;
    canvas.height = opt.size;
    opt.ele.appendChild(canvas);
    drawText(canvas.getContext("2d"),text,opt)
    return canvas;
}

init();

module.exports = init;
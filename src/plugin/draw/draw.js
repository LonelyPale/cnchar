var dict = require('./stroke-pos-jian.json');
var standSize = 800;
var queue = [] // 动画绘制队列
var timer = null // 绘制定时器
/*
    opt:
    size: 每一个字的大小 单位px
    width: 线条宽度
    color: 颜色 
    ele: 附加在哪个元素上 可以时id值或dom元素 默认为body
    animation: 是否使用动画
    time: 画一个笔的时间 默认500ms
*/
var length = 0;
// 一个定时周期内绘制的长度
function drawText(ctx,text,opt){
    var rate = opt.size / standSize;
    ctx.font = opt.size+"px sans-serif"
    ctx.fillStyle = opt.color;
    length = opt.size / 10;
    for(var i = 0;i<text.length;i++){
        let x = i*opt.size;
        let y = 0;
        let arr = dict[text[i]];
        if(typeof arr==='string'){
            arr = arr.split(';').map((item)=>{return item.split(' ')})
            drawWord(ctx,x,y,arr,opt.color,opt.width,rate)
        }else{
            ctx.fillText(text[i],x,y+opt.size)
        }
    }
    drawProcess(ctx);
}
// arr 笔画序列
// '民和'.draw() 有bug
var animation = true;
function drawWord(ctx,x,y,arr,color,width,rate){
    ctx.strokeWidth = width;
    ctx.strokeColor = color;
    arr.forEach((stroke,strokeindex) =>{
        // 绘制一笔
        stroke.forEach((pos,index) =>{
            // 每一个直笔
            pos = pos.split(',');
            var dx = parseInt(pos[0])*rate + x;
            var dy = parseInt(pos[1])*rate + y;
            if(animation){
                pushStrokeQueue(dx,dy,index)
            }else{
                if(index === 0){
                    ctx.moveTo(dx,dy);
                }else{
                    ctx.lineTo(dx,dy);
                }
                if(index === stroke.length-1){
                    ctx.stroke();
                }
            }
        })
    })
}

// "78,174 78,486;78,210 648,210 672,186 648,210 648,474;78,432 648,432;336,24 360,42 360,762",

function pushStrokeQueue(x,y,index){
    if(index === 0){
        queue.push([x,y,1])
        return;
    }
    let last = queue[queue.length-1];
    let lx = last[0];
    let ly = last[1];
    let arr = countDeg(lx,ly,x,y);
    let n = Math.ceil(
        (x-lx === 0)?
        Math.abs((y-ly)/arr[1]):
        Math.abs((x-lx)/arr[0])
    )
    for(var i=0;i<n;i++){
        if(i === n-1){
            queue.push([x,y])
        }else{
            lx+=arr[0];
            ly+=arr[1];
            queue.push([lx,ly])
        }
    }

}

function countDeg(x1,y1,x2,y2){
    let deg = Math.atan((y2-y1)/(x2-x1));
    return [
        length * Math.cos(deg),
        length * Math.sin(deg)
    ]
}


function drawProcess(ctx){
    ctx.beginPath();
    timer = setInterval(()=>{
        if(queue.length>0){
            drawPath(ctx,queue.shift());
        }
    },100)
}

function drawPath(ctx, path){
    if(path.length === 3){
        ctx.moveTo(path[0],path[1])
    }else{
        ctx.lineTo(path[0],path[1]);
        ctx.stroke();
    }
}

module.exports = drawText;
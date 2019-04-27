J.ready(function(){
  J.class("func-img").tip([
    "获取一个或多个汉字完整拼音",
    "获取一个或多个汉字拼音首字母",
    "获取一个或多个汉字的总笔画数"
  ]);
  J.id('_year').txt((new Date()).getFullYear())
  J.id('tryInput').on('input',function(){
    var str=this.val();
    if(str==''){
      J.id('spell').txt('')
      J.id('stroke').txt('')
    }else{
      J.id('spell').txt(str.spell('array','low').join(' '))
      J.id('stroke').txt('共 '+str.stroke()+' 笔')
    }
  })
});
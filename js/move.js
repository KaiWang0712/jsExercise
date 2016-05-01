function startMove(obj, json,fn){
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    obj.flag = true; //假设所有物体完成运动
    for(var attr in json){
      var icur = 0;
      if(attr == 'opacity'){
        icur = parseFloat(getStyle(obj, attr))*100;
        icur = Math.round(icur);
      }
      else{
        icur = parseInt(getStyle(obj, attr))
      }
      // 计算速度
      var speed = (json[attr]-icur)/8;
      speed = speed>0?Math.ceil(speed):Math.floor(speed);
      // 检测停止
      if(icur != json[attr]){
        obj.flag=false;
      } 

      if(attr=='opacity'){
        obj.style.filter = 'alpha(opacity:'+(icur+speed)+')';
        obj.style.opacity = (icur+speed)/100;
      }
      else{
        obj.style[attr] = icur + speed + "px";
      }
    }
    if(obj.flag){
      clearInterval(obj.timer);
      if(fn){
        console.log(fn);
        fn(obj);
        }
    }
  },30);



}

function getStyle(obj, attr) {
  if(obj.currentStyle){
    return obj.currentStyle[attr]
  }
  else{
    return getComputedStyle(obj, false)[attr];
  }
}
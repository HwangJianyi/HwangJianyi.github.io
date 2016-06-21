window.onload = function(){
  var turnAreaLeft = document.getElementById("turnAreaLeft");
  var turnAreaRight = document.getElementById("turnAreaRight");
  var turning = false;
  turnAreaLeft.onmousewheel = scrollFunc1;
  turnAreaRight.onmousewheel = scrollFunc2; 


  function scrollFunc1(e){
        if( turning ) return false;
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件             
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                turnAreaPic(1);
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                turnAreaPic(-1);
            }
        } 
        return false;
  }
function scrollFunc2(e){
        if( turning ) return false;
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件             
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                turnAreaPic(-1);
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                turnAreaPic(1);
            }
        } 
        return false;
  }


  // 动画
function  turnAreaPic(turnDir) {
    var turnAreaLeftDivs = turnAreaLeft.getElementsByTagName("div");  
    var turnAreaRightDivs = turnAreaRight.getElementsByTagName("div");
     var shouldTurn = parseInt(turnAreaLeftDivs[2].style.top) + 538 * turnDir ;
     var shouldTurn1 = parseInt(turnAreaRightDivs[2].style.left) + 538 * turnDir ;
     var offset = 538 * turnDir;
     var time = 300;
     var inteval = 50;//移动间隔
     var speed = offset/(time/inteval);
     turning = true;
     var goTurn = function (){
     if ((speed > 0 && (parseInt(turnAreaLeftDivs[2].style.top) + speed) < shouldTurn) || ((speed < 0 && parseInt(turnAreaLeftDivs[2].style.top) + speed) > shouldTurn)) {
        for(var i = 0 ; i < turnAreaLeftDivs.length ; i++){
       	  turnAreaLeftDivs[i].style.top = parseInt(turnAreaLeftDivs[i].style.top) + speed +"px" ;
        }
        for(var i = 0 ; i < turnAreaRightDivs.length ; i++){
       	  turnAreaRightDivs[i].style.left = parseInt(turnAreaRightDivs[i].style.left) + speed +"px" ;
        }

        setTimeout(goTurn, inteval);
      }

        else{
            for(var i = 0 ; i < turnAreaLeftDivs.length ; i++){
       	      turnAreaLeftDivs[i].style.top = shouldTurn + (2 - i) * 538 +"px" ;
            }
            for(var i = 0 ; i < turnAreaRightDivs.length ; i++){
       	      turnAreaRightDivs[i].style.left = shouldTurn1 + (2 - i) * 538 +"px" ;
            }

        	if(turnDir > 0){
              var checkLeftLast = parseInt(turnAreaLeftDivs[turnAreaLeftDivs.length - 1].style.top);
              if(checkLeftLast >= 220) {
                 makeUp("left");
                 makeUp("right");
              }
            }

           if(turnDir < 0){
              var checkLeftFirst = parseInt(turnAreaLeftDivs[0].style.top);
              if(checkLeftFirst <= 220) {
              makeDown("left");
              makeDown("right");
              }
           }
           turning = false;
        }
     }
     goTurn();
}







    var timer;
    // turnAreaLeft.onmousewheel =  scrollFunc;  
    function play() {
    timer = setTimeout(function () {
         turnAreaPic(1);
         play();
       }, 2500);
   }
   function stop() {
     clearTimeout(timer);
    }
  turnAreaLeft.onmouseover = stop;       
  turnAreaLeft.onmouseout = play;
  turnAreaRight.onmouseover = stop;       
  turnAreaRight.onmouseout = play;
  play();
}//window.onload



// 无动画
// function  turnAreaPic(turnDir) {
//         var turnAreaLeftDivs = turnAreaLeft.getElementsByTagName("div");
//         for(var i = 0 ; i < turnAreaLeftDivs.length ; i++){
//        	  turnAreaLeftDivs[i].style.top = parseInt(turnAreaLeftDivs[i].style.top) + 538 * turnDir +"px" ;
//         }

//         var turnAreaRightDivs = document.getElementById("turnAreaRight").getElementsByTagName("div");
//         for(var i = 0 ; i < turnAreaRightDivs.length ; i++){
//        	  turnAreaRightDivs[i].style.left = parseInt(turnAreaRightDivs[i].style.left) + 538 * turnDir +"px" ;
//         }
        
//         if(turnDir > 0){
//         var checkLeftLast = parseInt(turnAreaLeftDivs[turnAreaLeftDivs.length - 1].style.top);
//         if(checkLeftLast == 220) {
//            makeUp("left");
//            makeUp("right");
//         }
//         }

//         if(turnDir < 0){
//         var checkLeftFirst = parseInt(turnAreaLeftDivs[0].style.top);
//         if(checkLeftFirst == 220) {
//            makeDown("left");
//            makeDown("right");
//         }
//         }
// }










  function makeUp( dir ) {

   if(dir == "left") { 
     var turnAreaDirDivs = document.getElementById("turnAreaLeft").getElementsByTagName("div");
     for(var i = 0 ; i < turnAreaDirDivs.length ; i++){
       turnAreaDirDivs[i].style.top = 758 - 538 * i + "px" ;
    }
   }
   if(dir == "right") {
   	 var turnAreaDirDivs = document.getElementById("turnAreaRight").getElementsByTagName("div");
   	 for(var i = 0 ; i < turnAreaDirDivs.length ; i++){
       turnAreaDirDivs[i].style.left = 534 - 538 * i + "px" ;
    }
   }
    
}

function makeDown( dir ) {

   if(dir == "left") { 
     var turnAreaDirDivs = document.getElementById("turnAreaLeft").getElementsByTagName("div");
     for(var i = 0 ; i < turnAreaDirDivs.length ; i++){
       turnAreaDirDivs[i].style.top = 220 + 538 * ( 4 - i ) + "px" ;
    }
   }
   if(dir == "right") {
   	 var turnAreaDirDivs = document.getElementById("turnAreaRight").getElementsByTagName("div");
   	 for(var i = 0 ; i < turnAreaDirDivs.length ; i++){
       turnAreaDirDivs[i].style.left = -4 + 538 * ( 4 - i ) + "px" ;
    }
   }
    
}
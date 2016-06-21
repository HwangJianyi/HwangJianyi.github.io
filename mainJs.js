 
window.onload = function(){
  var picList = document.getElementById("picList");
  var lastPic = document.getElementById("lastPic");
  var nextPic = document.getElementById("nextPic");
  var picDot = document.getElementById("picDot").getElementsByTagName("span");
  var index = 1 ; //记录初始位置
  var countPic =picList.getElementsByTagName("a").length-2; //图片数量
  var animated =false;//图片是否已经在移动
  var timer;//自动播放定时器

   


  function play() {
    timer = setTimeout(function () {
         nextPic.onclick();
         play();
       }, 3000);
   }
   function stop() {
     clearTimeout(timer);
    }

  
  function tabPic (offset) {
  	var intLeft = parseInt(picList.style.left) + offset ;
    if (offset == 0)   return;
    animated = true;
    var decideTime = offset;
    if (decideTime < 0) decideTime = -decideTime;
    decideTime = decideTime / 600 ;
    var time = 300 - 20 * decideTime;//总移动时间
    var inteval = 50;//移动间隔
    var speed = offset/(time/inteval);
   
    var go = function (){
    if ( (speed > 0 && (parseInt(picList.style.left) + speed) < intLeft) || (speed < 0 && (parseInt(picList.style.left) + speed) > intLeft)) {
                        picList.style.left = parseInt(picList.style.left) + speed + 'px';
                        setTimeout(go, inteval);
                    }
                    else {
                    	// animated = false;
                        picList.style.left = intLeft + 'px';
                        if(intLeft>-200){
                            picList.style.left = -600 * countPic + 'px';
                        }
                        if(intLeft<(-600 * countPic)) {
                            picList.style.left = '-600px';
                        }
                        animated = false;
                    }
                }
                go();
  } 
  
  lastPic.onclick = function(){
  	if(animated == false)
  	   tabPic(600);
  	if (index == 1) {
       index = countPic;
    }
    else {
       index += 1;
     }
   showButton();
  }

  nextPic.onclick = function(){
     if(animated == false)
       tabPic(-600);
     if (index == countPic) {
       index = 1;
    }
    else {
       index += 1;
     }
   showButton();
  }


  for(var i = 0 ; i < picDot.length ; i++){
      picDot[i].onclick = function(){
      var nowIndex = parseInt( this.getAttribute("index") );
      var offset = -600 * ( nowIndex - index ) ;
      if(animated == false) 
      	 tabPic(offset);
      index = nowIndex ; 
      showButton();
    } 

  }



  function showButton() {
                for (var i = 0; i < picDot.length ; i++) {
                    if( picDot[i].className == "picDotFull"){
                        picDot[i].className = "";
                        break;
                    }
                }
                picDot[index - 1].className = "picDotFull";
            }

     picArea.onmouseover = stop;       
     picArea.onmouseout = play;
     play();
     




     // tab切换左三
     function tabEpList(){
        var titles = document.getElementById("noticeSelect").getElementsByTagName("a");
        // alert(titles.length);
        for(var i = 0 ; i < titles.length ; i++){
     	  titles[i].onclick = function(){
     	  // alert(this.getAttribute("title"));
          for (var j = 0 ; j < titles.length ; j++) {
                titles[j].id = "";
                var noticePart = document.getElementById(titles[j].getAttribute("title"));
                noticePart.style.display = "none" ;
           }
                this.id = "beSelected" ;
                var noticePart = document.getElementById(this.getAttribute("title"));
                noticePart.style.display = "block" ;       
         

     	  }
     	}
     }

    tabEpList();

     



    //右边的展开列表
    var songLists = document.getElementsByClassName("songType");
    // alert(songLists.length);
    for(var i = 0 ; i < songLists.length ; i++){
    	songLists[i].onclick = function(){
    		var songID = this.getAttribute("id");
    		var songListsDivs = this.getElementsByTagName("div");
    		var song = document.getElementById(songID);
    		if(parseInt(song.style.height) <= 70){
    		  songListsDivs[songListsDivs.length-1].style.display = "block";
    		  song.style.height = parseInt(song.style.height)+songListsDivs[songListsDivs.length-1].offsetHeight + "px";
    		}
    		else{
    		  song.style.height = parseInt(song.style.height)-songListsDivs[songListsDivs.length-1].offsetHeight + "px";
    		  songListsDivs[songListsDivs.length-1].style.display = "none";	
    		}
    	}
    }
   

   //右边部分固定效果
   var dir = "down";
   window.addEventListener("scroll",function(){
   var areaRight = document.getElementById("areaRight");
   var LastRightArea = document.getElementById("useNotice");
   var areaDisTop = LastRightArea.offsetTop;
   var scrollTop = document.body.scrollTop;
   var realTop = areaRight.offsetHeight + areaRight.offsetTop ;
   var realDown = areaRight.offsetHeight + areaRight.offsetTop - LastRightArea.offsetHeight;
   if ( ( scrollTop > realDown ) && ( dir != "up") ) {
   	LastRightArea.style.cssText = "position:fixed; top:0px; width:333px; ";
      dir = "up";
   }else{
   if ( scrollTop < realTop){
   	     LastRightArea.style.position = "static";
   	     dir = "down";
   }
   }   
   },false);


// alert(window.screen.width);






}//last






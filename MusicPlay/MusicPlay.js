


window.onload =  function(){


 

  var musicPlay = document.getElementById("musicPlay");//当前播放对象
  // musicPlay.autoplay = true;
  var playPauesButton = document.getElementById("musicPP");//播放暂停按钮
  var toEpName = document.getElementById("toEpName");//当前播放对象
  var playType = 1 ; //0:单曲循环 1:列表循环 2:随机播放
  var saveDataEpList = new Array();//储存数据歌单
  var whichSong = 0 ;//记录在播第n-1首歌
  var saveShowEpList ;//记录显示的歌单
  var degI = 0;//专辑图片旋转角度
  var paceTimer;//进度条定时器
  var nowSong ;//正在播放的对象
  var playPart = document.getElementById("playPart"); //播放界面
  var ListPart = document.getElementById("ListPart");//专辑界面
//-----------------------------


  //修改当前播放的歌曲信息
  function showEpAndSongInfo(objSong){
    musicPlay.setAttribute("src",objSong.sourceSongAudio);
    revolvePic.setAttribute("src",objSong.sourceEpPic);
    var songName = document.getElementById("songName");
    toEpName.innerHTML = objSong.EpName;
    songName.innerHTML = objSong.songName;
  }

//-----------------------------

  var ii;
  //显示专辑歌单
  var toEpList = document.getElementById("toEpList");
  function setEpSongList(getEpName){
  	var index1 = 1;
  	for(var i = 0 ; i < SingerData.Ep.length ; i++){

  	var div1 = document.createElement("div"); 
  	
       if( SingerData.Ep[i].EpName == getEpName ){
        
  	    saveDataEpList[saveDataEpList.length] = SingerData.Ep[i];
       	
        div1.setAttribute("class","toEpListOne");
  	    div1.setAttribute("index",index1-1);

       	var spanNum = document.createElement("span"); 
       	spanNum.setAttribute("class","toEpListNum");
       	spanNum.innerHTML = index1++;

       	var spanName = document.createElement("span");
       	spanName.setAttribute("class","toEpListName");
       	spanName.innerHTML = SingerData.Ep[i].songName;

       	var spanTime = document.createElement("span"); 
       	spanTime.setAttribute("class","toEpListTime");
       	toTime = makeTime(SingerData.Ep[i].countTime);
       	spanTime.innerHTML = toTime;

       	div1.appendChild(spanNum);
       	div1.appendChild(spanName);
       	div1.appendChild(spanTime);
       	toEpList.appendChild(div1); 
       }
       if(saveDataEpList.length > 0 ) { 
          nowSong = saveDataEpList[0]; 
          setNowSongLrc();
          if(nowSong.lyrics !=  "none" ) parseLyric(nowSong.lyrics);
        }
  	}
    saveShowEpList = toEpList.getElementsByTagName("div");
      
     // 左边歌曲列表，将当前播放歌曲高亮
    for(var i = 0 ; i < saveShowEpList.length ; i++){
    	ii = i ;
  	    saveShowEpList[i].addEventListener("click" , function(){
  	    ii = this.getAttribute("index");
  		playTheSong(ii);
  		whichSong = ii ;
  		showEpAndSongInfo(saveDataEpList[ii]);
  		nowSong = saveDataEpList[ii];
  		// console.log(nowSong.songName);
  		setNowSongLrc();
  	  },false);
    }

 }

     function clearEpSongList(){
        var childs = toEpList.getElementsByTagName("div"); 
    	for( var i = childs.length - 1 ; i >= 0 ; i-- ){
    		toEpList.removeChild(childs[i]);
    	}
    	saveShowEpList = [];
    }

//-----------------------------





 // 播放音乐

   //音乐播放完成事件
   musicPlay.addEventListener("ended",
   	function(){
		playPauesButton.setAttribute("src","..\\music\\Pic\\play.png");
    	stopIt();
    	clearInterval(paceTimer);
    	playNext();
	},false);

   //播放或暂停按钮点击事件
  playPauesButton.onclick = function(){
    var jd = musicPlay.currentTime;
    var cd = musicPlay.duration;
    if(musicPlay.getAttribute("src") == '' ) return;
      if(musicPlay.paused){
    	  musicPlay.play();
    	  playPauesButton.src = "..\\music\\Pic\\pause.png" ;
    	  revolvePic.style.webkitTransform = "rotate("+ degI + "deg)";
    	  rollIt(degI);
          rollLrcSInterval();
          paceTimer = setInterval(function(){
   	                         pace();
                            },1);

      }
      else{
  	    musicPlay.pause();
  	    playPauesButton.setAttribute("src","..\\music\\Pic\\play.png");
  	    stopIt();
  	    clearInterval(paceTimer);
  	    stopRollLrcSInterval();
      }
  }


//-----------------------------


// 上一首按钮点击事件
   var musicPrev = document.getElementById("musicPrev");
   musicPrev.addEventListener("click",function(){
   	  var ws = whichSong  == 0 ? saveShowEpList.length - 1 : whichSong - 1 ;
   	  playTheSong(ws);
   },false);
 
//-----------------------------



// 下一首按钮点击事件
   var musicNext = document.getElementById("musicNext");
   musicNext.addEventListener("click",function(){
   	  playNext();
   },false);


//播放下一首
  function playNext(){
    switch(playType){
      case 0 :  singerSong(); break; 
      case 1 :  allSong(); break;
      case 2 :  randomSong();break;
    }
  }
  
  //单曲循环
  function singerSong(){
  	playTheSong(whichSong);
  }

  //列表循环
  function allSong(){
    var ws = ( parseInt(whichSong) + 1 ) % saveShowEpList.length ;
   	playTheSong(ws);
  }

  //随机播放
  function randomSong(){
  	do { var ws = parseInt( Math.random()*saveShowEpList.length ); } while( ws == whichSong);
    playTheSong(ws);
  }
  
  //清除当前播放模式的样式
  var playTypeList = document.getElementById("playType").getElementsByTagName("img");
  function clearClass(){
  	for( var i = 0 ; i < playTypeList.length ; i++ )
  		playTypeList[i].setAttribute("class","playTypePic");
  }

  //单曲循环点击事件
  var singerSongPic = document.getElementById("singerSongPic");
    singerSongPic.addEventListener("click",function(){
  	  playType = 0 ;
  	  clearClass();
      playTypeList[0].setAttribute("class","playTypePic playTypePicBGC");
    },false);
  //列表循环点击事件
  var allSongPic = document.getElementById("allSongPic");
    allSongPic.addEventListener("click",function(){
  	  playType = 1 ;
  	  clearClass();
      playTypeList[1].setAttribute("class","playTypePic playTypePicBGC");
  	},false);
  //随机循环点击事件
  var randomSongPic = document.getElementById("randomSongPic");
    randomSongPic.addEventListener("click",function(){
      playType = 2 ;
      clearClass();
      playTypeList[2].setAttribute("class","playTypePic playTypePicBGC");
    },false);

//-----------------------------



  //播放指定歌曲
  function playTheSong(which){
  	saveShowEpList[whichSong].setAttribute("class","toEpListOne");
    saveShowEpList[which].setAttribute("class","toEpListOne playNow");
    showEpAndSongInfo(saveDataEpList[which]);
    whichSong = which;
    // console.log(which +"---"+ whichSong);
    playPauesButton.setAttribute("src","..\\music\\Pic\\play.png");
    
    stopIt();
    clearInterval(paceTimer);
    revolvePic.style.webkitTransform = "rotate(0deg)";
    timeNow.style.width = "0px";
    stopRollLrcSInterval();
    clearLyric();
    musicPaceRange.value = 0;

    var tNow = makeTime(musicPlay.currentTime);
    var tAll = makeTime(saveDataEpList[which].countTime);
    timeCurrent.innerHTML = tNow + "/" + tAll;
    degI = 0;
    // musicPaceRange.value = 0;
    // stopRollLrcSInterval();
    // clearLyric();
    nowSong - saveDataEpList[which];
    setNowSongLrc();
    parseLyric(nowSong.lyrics);
 }
//-----------------------------




  //音量

  //音量条拖动改变事件
  var musicVolPic = document.getElementById("musicVolPic");
  musicVolPic.addEventListener("click",function(){
  	var valuePic = parseInt( musicVolPic.getAttribute("value") ) ;
  	musicVolPic.setAttribute("value", (valuePic+1)%4 );
  	valuePic = ( valuePic + 1 ) % 4 * 33 ;
  	valuePic = (valuePic == 99 ) ? 100 : valuePic ;                 
  	volumeRange.value = valuePic;
  	setVolume();
  	// console.log(musicPlay.volume);
  },false);
  
  //音量图标点击事件
  var volumeRange = document.getElementById("volumeRange");
  volumeRange.addEventListener("change",
   	function(){
   		setVolume();
    },false);
  
  //改变音量图标
  function setVolume(){
    var volumePic = document.getElementById("musicVolPic");
  	musicPlay.volume = volumeRange.value / 100 ;
  	if( volumeRange.value == 0 ) volumePic.setAttribute("src","..\\music\\Pic\\mute.png");
  	else if( volumeRange.value < 34 ) volumePic.setAttribute("src","..\\music\\Pic\\low_volume.png");
  	else if( volumeRange.value < 67 ) volumePic.setAttribute("src","..\\music\\Pic\\medium_volume.png");
  	else if( volumeRange.value <= 100 ) volumePic.setAttribute("src","..\\music\\Pic\\high_volume.png");
  }
  
//-----------------------------
  


  //将秒数转为 **:** 格式
  function makeTime(time){
  	var t = parseInt(time);
  	second = t % 60;
  	if(second < 10) second = "0" + second;
  	min = ( t - second ) / 60;
  	if(min < 10) min = "0" + min;
  	time = min + ":" + second ;
  	// console.log(time);
  	return time ;
  }


    // 播放时间进度条
    var timeCurrent = document.getElementById("timeCurrent");
    var musicPaceRange = document.getElementById("musicPaceRange");
    musicPaceRange.addEventListener("change",function(){
         clearInterval(paceTimer);
         var t = this.value / 100;
         stopRollLrcSInterval();
         // console.log(t);
         musicPlay.currentTime = t * musicPlay.duration ;
         paceTimer = setInterval(function(){
   	                         pace();
                            },1);
         rollLrcSInterval()

    },false);
    


  //进度条   
   var timeNow = document.getElementById("musicPaceNow");//进度条内部
   function pace(){ 
     var per = musicPlay.currentTime / musicPlay.duration ;
     var t = per * 300  ;
     timeNow.style.width = t + "px";
       
     var tNow = makeTime(musicPlay.currentTime);//当前播放时间
     var tAll = makeTime(musicPlay.duration);//总播放时间
     timeCurrent.innerHTML = tNow + "/" + tAll;
   } 
   
//-----------------------------

  // 专辑图片旋转
  var EpPicTimer ;//专辑图片定时器
  var revolvePic = document.getElementById("revolvePic");//当前专辑图片
  
  //旋转degI度
  function revolve(degY){
  	degI = degY + 0.2;
    if(degI >= 360) degI=0;
  	revolvePic.style.webkitTransform = "rotate("+ degI + "deg)";
  }

  //开始旋转
  function rollIt(degY){
    EpPicTimer = setTimeout(function () {
         revolve(degY);
         rollIt(degI);
       }, 10);
  }

  // 停止旋转
  function stopIt(){
    clearTimeout(EpPicTimer);
    
  }
   
//-----------------------------

//歌词

    // 将对应歌词存入到nowSong
    function setNowSongLrc(){
       var name = saveDataEpList[whichSong].songName; 
       // nowSong.songName;
       switch(name){
        case "不如不见" : nowSong.lyrics = BRBJ ; break;
        case "浮夸" :nowSong.lyrics = FuKua ; break;
       	// case "今天等我来" :nowSong.lyrics = FuKua ; break;
       	default : nowSong.lyrics = "none" ;
       }
    }


    lrcS = new Array();//存储每一行歌词
    lrcTime = new Array(); //存储每一行歌词对应时间
    var lrcRoll = document.getElementById("lrcRoll");
    //将歌词对象 按时间个歌词拆散
   	function parseLyric(song) {
      
      var len = song.length; 
      lrcRoll.style.top = "160px";
      for( i = 0 ; i < len ; i++) {
      	 var div1 = document.createElement("div");
         var d = song[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g);  //正则匹配播放时间
         var t = song[i].split(d); //以时间为分割点分割每行歌词，数组最后一个为歌词正文
         // console.log(d+"---"+t);
         if(d != null) { //过滤掉空行等非歌词正文部分
             //换算时间，保留两位小数
              var dt = String(d).split(':'); 
              var t1 =  parseInt(dt[0].split('[')[1])*60+parseFloat(dt[1].split(']')[0]) ;
              div1.innerHTML = t[1];
              lrcRoll.appendChild(div1);
              lrcTime.push(t1);
              lrcS.push(t[1]);
         }
	  }       
    }


    // 清除歌词
    function clearLyric(){
        var childs = lrcRoll.getElementsByTagName("div"); 
    	for( var i = childs.length - 1 ; i >= 0 ; i-- ){
    		lrcRoll.removeChild(childs[i]);
    	}
    	lrcTime = [];
    	lrcS = [];
    }

   //刷新歌词
   function rollLrc(){
   	  var lrcRollWhich = lrcRoll.getElementsByTagName("div");
   	  for( var i = 0 ; i < lrcTime.length - 1  ; i++ ){
   	  	if( ( lrcTime[i] < musicPlay.currentTime ) && ( lrcTime[i+1] > musicPlay.currentTime ) ){
   	  		// console.log(lrcTime[i] +"---"+ musicPlay.currentTime );
   	  		// console.log(lrcS[i]);
   	  		for( var j = 0; j < lrcRollWhich.length ; j++ ) lrcRollWhich[j].setAttribute("class","");
   	  		lrcRollWhich[i].setAttribute("class","lrcRollWhich");
            lrcRoll.style.top =  160 - i * 20 + "px";
   	  		// return ( lrcTime[i+1] - lrcTime[i] );
   	  	}
   	  }
   }

   var lrcTimer ;//歌词定时器
   var inter = 10 ;//刷新频率

   //设置刷新歌词定时器
   function rollLrcSInterval(){
    rollLrc() * 1000;
    lrcTimer = setTimeout(function () {
         rollLrcSInterval();
       }, inter);
  }
  // 停止刷新
  function stopRollLrcSInterval(){
  	clearInterval(lrcTimer);
  }




//-----------------------------------------------------------------------

//专辑展示部分
   var EpList3D = document.getElementById("EpList3D");
   var EpList3DPic = EpList3D.getElementsByTagName("img");
   
   var ListPartIntro = document.getElementById("ListPart");
   var ListPartIntroP = ListPartIntro.getElementsByTagName("p");
   var ListPartIntroDiv = ListPartIntro.getElementsByTagName("div");

   var headPic = document.getElementById("headPic");
   var headPicImg = document.getElementById("headPicImg");
   var SingerInrto = document.getElementById("SingerInrto");

   var playButton = document.getElementById("playButton");
   // var playButtonDiv = playButton.getElementsByTagName("div");

   //  var ListPartArrow = document.getElementById("ListPartArrow");
   // var ListPartIntroArrowP = ListPartArrow.getElementsByTagName("p");
   // var ListPartIntroArrowDiv = ListPartArrow.getElementsByTagName("div");
   for( var i = 0 ; i < EpList3DPic.length ; i++ ){
      EpList3DPic[i].style.zIndex = EpList3DPic.length - i ;
   	  EpList3DPic[i].style.top = 100 - 10 * i + "px" ;
   	  EpList3DPic[i].style.left = 20 + 10 * i + "px" ;
   	  EpList3DPic[i].setAttribute("pos","0");
   	  EpList3DPic[i].setAttribute("arr",i);
   }

   for( var i = 0 ; i < EpList3DPic.length ; i++ ){
   	  
   	  EpList3DPic[i].addEventListener("click",function(){
   	  	 for( var j = 0 ; j < EpList3DPic.length ; j++ ){
   	  	   	  if ( EpList3DPic[j].getAttribute("arr") != this.getAttribute("arr") ) {
              EpList3DPic[j].setAttribute("class","pic1 location1");
              EpList3DPic[j].setAttribute("pos","0");
   	  	   }
   	  	 }
  
   	  	if(this.getAttribute("pos") == "0" ){
   	  	   this.setAttribute("class","pic1 location1 picHover");
   	  	   this.setAttribute("pos","1");
   	  	   for( var j = 0 ; j < 6 ; j++ ){
   	  	   	ListPartIntroP[j].innerHTML = ListPartIntroP[ j + 6 * ( parseInt(this.getAttribute("arr")  ) + 1) ].innerHTML;
   	  	   	if ( j < 3 ) ListPartIntroDiv[ 2 * j + 1 ].setAttribute("class","ListPartIntroClick");
   	  	   }
           headPic.setAttribute("class","headPicprHover");
   	  	   headPicImg.setAttribute("src","..\\picture\\head\\" + this.getAttribute("singer") + ".jpg");
   	  	   SingerInrto.setAttribute("class","headSingerInrtoClick");
   	  	   playButton.setAttribute("class","playButtonAft");
   	  	   // alert(".\\picture\\head\\" + this.getAttribute("singer") + ".jpg");



   	  	}
   	  	else{
   	  	   this.setAttribute("class","pic1 location1");
   	  	   this.setAttribute("pos","0");
   	  	   for( var j = 0 ; j < 3 ; j++ ){
   	  	   	ListPartIntroDiv[2*j+1].setAttribute("class","ListPartIntro");
   	  	   }
   	  	   headPic.setAttribute("class","headPicpr");
   	  	   SingerInrto.setAttribute("class","headSingerInrto");
   	  	   playButton.setAttribute("class","playButtonBef");
   	  	}
   	  },false);
   }


//-----------------------------------------------------------------------
   


   
   

  playButton.addEventListener("click",function(){
   	stopIt();
    clearInterval(paceTimer);
    revolvePic.style.webkitTransform = "rotate(0deg)";
    timeNow.style.width = "0px";
    stopRollLrcSInterval();
    clearLyric();
    musicPaceRange.value = 0;
   	saveDataEpList = [];
   	saveShowEpList = [];
   	clearEpSongList();
    nowSong = null ;
   	whichSong = 0;
      for( var i = 0 ; i < EpList3DPic.length ; i++ ){
      	if( EpList3DPic[i].getAttribute("pos") == "1" ){
      		setEpSongList(EpList3DPic[i].getAttribute("EpName"));
      	    showEpAndSongInfo(nowSong);
      	}
      }
        playPart.setAttribute("class","playPartFall");
        ListPart.setAttribute("class","ListPartRiseUp");
  },false);
  
  var playPartUp = document.getElementById("playPartUp");
  playPartUp.addEventListener("click",function(){
        playPart.setAttribute("class","playPartRiseUp");
        ListPart.setAttribute("class","ListPartFallDown");
  },false);



// var buttonvalue = document.getElementById("valuebutton");
//  buttonvalue.onclick = function(){
//    // showEpAndSongInfo(SingerData.Ep[10]);
//    setEpSongList(SingerData.Ep[10].EpName);
//    musicPlay.setAttribute("src","..\\music\\陈奕迅\\浮夸.mp3");
//    // alert(musicPlay.currentTime+"--"+musicPlay.duration);
//    // var timeNow = document.getElementById("musicPaceNow");
//    // timeNow.style.width = "60px";
//    playTheSong(whichSong);
//    playPart.style.display = "block" ;
//     playPart.setAttribute("class","playPartFall");
//     // document.getElementById("bodyType").style.background = "-webkit-gradient(linear, 50%  30%, 0% 100%, from(#00abeb), to(#fff))" ;
//    // alert(musicPlay.duration);
//    // alert(saveDataEpList.length);
//  }

//   var buttonvalue2 = document.getElementById("valuebutton2");//音量按钮
//  buttonvalue2.onclick = function(){
//     // console.log(whichSong);
//  }






}//onload



//网页数据

var Eason = {
	"Ep":[
	       {
	       	"EpName" : "H3M",
			"singerName": "陈奕迅",
			"songName": "Allegro, Opus 3.3 a.m.",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\*****.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\6.jpg"
		} ,{
	       	"EpName" : "H3M",
			"singerName": "陈奕迅",
			"songName": "还有什么可以送给你",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\*****.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\6.jpg"
		} ,{
	       	"EpName" : "H3M",
			"singerName": "陈奕迅",
			"songName": "于心有愧",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\*****.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\6.jpg"
		} ,{
	       	"EpName" : "H3M",
			"singerName": "陈奕迅",
			"songName": "今天只做一件事",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\*****.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\6.jpg"
		} ,{
	       	"EpName" : "H3M",
			"singerName": "陈奕迅",
			"songName": "一个旅人",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\*****.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\6.jpg"
		}, {
	       	"EpName" : "H3M",
			"singerName": "陈奕迅",
			"songName": "七百年后",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\*****.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\6.jpg"
		} ,{
	       	"EpName" : "H3M",
			"singerName": "陈奕迅",
			"songName": "Life Goes On",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\*****.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\6.jpg"
		} ,{
	       	"EpName" : "H3M",
			"singerName": "陈奕迅",
			"songName": "太阳照常升起",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\*****.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\6.jpg"
		}, {
	       	"EpName" : "H3M",
			"singerName": "陈奕迅",
			"songName": "不来也不去",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\*****.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\6.jpg"
		} ,{
	       	"EpName" : "H3M",
			"singerName": "陈奕迅",
			"songName": "沙龙",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\*****.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\6.jpg"
		},

     //Ep2
		{
			"EpName" : "与我常在",
			"singerName": "陈奕迅",
			"songName": "现场直播",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\与我常在.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\4.jpg"
		},
		{
			"EpName" : "与我常在",
			"singerName": "陈奕迅",
			"songName": "爱没有左右",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\与我常在.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\4.jpg"
		},
		{
			"EpName" : "与我常在",
			"singerName": "陈奕迅",
			"songName": "生命有几好",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\与我常在.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\4.jpg"
		},
		{
			"EpName" : "与我常在",
			"singerName": "陈奕迅",
			"songName": "抱拥这分钟",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\与我常在.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\4.jpg"
		},
		{
			"EpName" : "与我常在",
			"singerName": "陈奕迅",
			"songName": "那一夜没有雪？(demo version)",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\与我常在.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\4.jpg"
		},
		{
			"EpName" : "与我常在",
			"singerName": "陈奕迅",
			"songName": "伴游",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\与我常在.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\4.jpg"
		},
		{
			"EpName" : "与我常在",
			"singerName": "陈奕迅",
			"songName": "跟我走好吗",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\与我常在.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\4.jpg"
		},
		{
			"EpName" : "与我常在",
			"singerName": "陈奕迅",
			"songName": "浮夸",
			"countTime": "286",
			"sourceSongAudio" : "..\\music\\陈奕迅\\浮夸.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\4.jpg",
			"lyrics" : ""
		},
		{
			"EpName" : "与我常在",
			"singerName": "陈奕迅",
			"songName": "敌人",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\与我常在.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\4.jpg"
		},
		{
			"EpName" : "与我常在",
			"singerName": "陈奕迅",
			"songName": "那一夜有没有说",
			"countTime": "289",
			"sourceSongAudio" : "..\\music\\陈奕迅\\与我常在.mp3",
			"sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\4.jpg"
		},
    {
      "EpName" : "U87",
      "singerName": "陈奕迅",
      "songName": "浮夸",
      "countTime": "286",
      "sourceSongAudio" : "..\\music\\陈奕迅\\浮夸.mp3",
      "sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\5.jpg"
    },
    {
      "EpName" : "广东精选",
      "singerName": "陈奕迅",
      "songName": "不如不见",
      "countTime": "249",
      "sourceSongAudio" : "..\\music\\陈奕迅\\不如不见.mp3",
      "sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\3.jpg"
    },
    {
      "EpName" : "rice && shine",
      "singerName": "陈奕迅",
      "songName": "不如不见",
      "countTime": "249",
      "sourceSongAudio" : "..\\music\\陈奕迅\\不如不见.mp3",
      "sourceEpPic" : "..\\picture\\MusicPlay\\Eason\\2.jpg"
    }


	]
};

var SingerData = eval(Eason);

var FuKua = [
"[00:00:00]浮夸",
"[00:07.79]作词：黄伟文",
"[00:09.45]作曲：C.Y. Kong",
"[00:11.42]演唱：陈奕迅",
"[00:28.32]有人问我我就会讲 但是无人来",
"[00:35.40]我期待 到无奈 有话要讲",
"[00:38.75]得不到装载",
"[00:42.01]我的心情犹豫像樽盖 等被揭开",
"[00:46.19]咀巴却在养青苔",
"[00:48.85]人潮内愈文静 愈变得不受理睬",
"[00:53.07]自己要搞出意外",
"[00:55.68]像突然 地高歌 任何地方也像开四面台",
"[01:03.08]着最闪的衫 扮十分感慨",
"[01:06.75]有人来拍照要记住插袋",
"[01:11.17]你当我是浮夸吧 夸张只因我很怕",
"[01:18.33]似木头 似石头的话 得到注意吗",
"[01:24.00]其实怕被忘记 至放大来演吧",
"[01:29.29]很不安 怎去优雅",
"[01:32.67]世上还赞颂沉默吗",
"[01:36.24]不够爆炸 怎麽有话题",
"[01:41.09]让我夸做大娱乐家",
"[01:50.70]那年十八 母校舞会 站着如喽罗",
"[01:57.75]那时候 我含泪发誓各位 必须看到我",
"[02:04.37]在世间 平凡又普通的路太多",
"[02:08.64]屋村你住哪一座",
"[02:11.23]情爱中 工作中 受过的忽视太多",
"[02:15.41]自尊已饱经跌堕 重视能治肚饿",
"[02:21.94]末曾获得过便知我为何 大动作很多",
"[02:27.09]犯下这些错 搏人们看看我 算病态麽",
"[02:33.57]你当我是浮夸吧 夸张只因我很怕",
"[02:40.73]似木头 似石头的话 得到注意吗",
"[02:46.48]其实怕被忘记 至放大来演吧",
"[02:51.82]很不安 怎去优雅",
"[02:55.11]世上还赞颂沉默吗",
"[02:58.70]不够爆炸 怎麽有话题",
"[03:03.45]让我夸做大娱乐家",
"[03:13.45] ",
"[03:19.08]幸运儿并不多 若然未当过就知我为何",
"[03:26.22]用十倍苦心 做突出一个",
"[03:30.09]正常人够我富议论性么",
"[03:34.49]你 叫我做浮夸吧 加几声嘘声也不怕",
"[03:41.69]我在场 有闷场的话",
"[03:44.98]表演你看吗 够歇斯底里 吗",
"[03:49.45]以眼泪淋花吧 一心只想你惊讶",
"[03:56.00]我旧时似未存在吗",
"[03:59.49]加重注码 青筋 也现形",
"[04:04.41]话我知 现在存在吗",
"[04:09.87]凝视我 别再只看天花",
"[04:17.85]我非你杯茶 也可尽情地喝吧",
"[04:23.75]别遗忘有人在 为你 声沙",
"[04：25】end"
]

var BRBJ = [
"[00:00.00]不如不见",
"[00:04.00]作词：林夕 作曲：陈小霞",
"[00:06.00]演唱：陈奕迅",
"[00:08.00] ",
"[00:15.29]头沾湿 无可避免",
"[00:22.65]伦敦总依恋雨点",
"[00:29.00]乘早机 忍耐着呵欠",
"[00:35.06]完全为见你一面",
"[00:42.17]寻得到 尘封小店",
"[00:48.91]回不到相恋那天",
"[00:55.15]灵气大概早被污染",
"[01:01.01]谁为了生活不变",
"[01:05.86] ",
"[01:08.10]越渴望见面然后发现",
"[01:15.34]中间隔着那十年",
"[01:21.13]我想见的笑脸 只有怀念",
"[01:27.72]不懂 怎去再聊天",
"[01:34.07]像我在往日还未抽烟",
"[01:41.03]不知你怎么变迁",
"[01:47.05]似等了一百年 忽已明白",
"[01:53.44]即使再见面 成熟地表演",
"[02:02.27]不如不见",
"[02:06.56] ",
"[02:20.35]寻得到 尘封小店",
"[02:27.74]回不到相恋那天",
"[02:33.87]灵气大概早被污染",
"[02:39.39]谁为了生活不变",
"[02:44.57]",
"[02:46.43]越渴望见面然后发现",
"[02:53.46]中间隔着那十年",
"[02:59.33]我想见的笑脸 只有怀念",
"[03:05.68]不懂 怎去再聊天",
"[03:12.19]像我在往日还未抽烟",
"[03:19.00]不知你怎么变迁",
"[03:24.82]似等了一百年 忽已明白",
"[03:31.22]即使再见面 成熟地表演",
"[03:40.60]不如不见",
"[03:44.51]"
]
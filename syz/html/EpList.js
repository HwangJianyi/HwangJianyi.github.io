function showEpName(this1){
	var getEpname = this1.getAttribute("value");
    var beset = document.getElementById("epName");
    beset.firstChild.nodeValue = getEpname;
    beset.style.display = "block";
   
    var getTextInfo = document.getElementsByTagName("div");
    for (var i = getTextInfo.length - 1; i >= 0; i--) {
     var a = getTextInfo[i].getAttribute("value");
     if (a == getEpname) {
        getTextInfo[i].style.display = "block";
      

        var pos = -300;     
        var b = getTextInfo[i].getAttribute("id");
			var odiv=document.getElementById(b);
        timer = setInterval(function(){
        	// clearInterval(timer);
        // if(odiv.offsetTop > 90)
        if(pos > 90)
        	{
        		clearInterval(timer);
        	}
           else{
           	// odiv.style.top=odiv.offsetTop + 10 + 'px';
           	odiv.style.top=pos + 10 + 'px';
           	pos=pos+10;
           }
        
        },20)

      break;
     }

    }
    
}

function hideEp(this1){
    var getEpname = this1.getAttribute("value");
    var beset = document.getElementById("epName");
    beset.firstChild.nodeValue = getEpname;
    beset.style.display = "none";

    var getTextInfo = document.getElementsByTagName("div");
    for (var i = getTextInfo.length - 1; i >= 0; i--) {
     var a = getTextInfo[i].getAttribute("value");
     if (a == getEpname) {
        getTextInfo[i].style.display = "none";

        
   //      var b = getTextInfo[i].getAttribute("id");
			// var odiv=document.getElementById(b);
   //      timer = setInterval(function(){
   //      	clearInterval(timer);
   //      if(odiv.offsetTop < -500)
   //      	{
   //      		clearInterval(timer);
   //      	}
   //         else{
   //         	odiv.style.top=odiv.offsetTop - 10 + 'px';
   //         }
        
   //      },20)

     }
    }
}
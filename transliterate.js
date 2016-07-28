console.log("Started..");
var dicts=[];
function callback(resp){
   dicts.push(resp);
   console.log(">>"+dicts.length);
}

//'http://pitaka.lk/dict/data/buddhadatta_data.json';
var urls=['/data/buddhadatta_data.json']
for(var i in urls){
   var url=urls[i];
   console.log(url);
   var xhr = new XMLHttpRequest();
   xhr.open("GET", chrome.extension.getURL(url), true);
   xhr.responseType = "json";
   xhr.onreadystatechange=function(){
      if (xhr.readyState==4 || xhr.readyState=="complete"){
         var status = xhr.status;
         if (status == 200) {
            callback(xhr.response);
         } else {
            console.log("XHR:"+status);
         }
      }
   }
   xhr.send();
}


var frame=window;

if(document.location.origin=="http://www.tipitaka.org"){
   var frame=window.frames['text'];
}

function gst(){
	var x = frame.event.clientX;     // Get the horizontal coordinate
	var y = frame.event.clientY;     // Get the vertical coordinate
   var xOffset=Math.max(frame.document.documentElement.scrollLeft,frame.document.body.scrollLeft);
   var yOffset=Math.max(frame.document.documentElement.scrollTop,frame.document.body.scrollTop);
   x=x+xOffset;
   y=y+yOffset;

	var text = "";
	if (frame.getSelection) {
		text = frame.getSelection().toString();
	} else if (frame.document.selection && frame.document.selection.type != "Control") {
		text = frame.document.selection.createRange().text;
	}

	var pd=frame.document.getElementById('ttt');
	if(pd)
		pd.remove();

	if(text){
		//console.log(x+","+y+":"+text);
		var d = frame.document.createElement('div');
		d.id='ttt';
		d.style.position = "absolute";
		d.style.left = x+'px';
		d.style.top = y+'px';
		d.style.width='400px';
		d.style.minHeight='100px';
		d.style.border="1px solid #999";
		d.style.background="#ffd";
		d.style.borderRadius="4px";
		d.style.padding="9px";
		d.style.boxShadow="0 0 20px rgba(0,0,0,0.5)";

  		d.style.fontFamily='UN-Abhaya,KaputaUnicode,"Noto Sans Sinhala",Tipitaka_Sinhala1,"Iskoola Pota"';
		d.innerHTML=text;

      var defAll='';

      for(var k in dicts){
         dict=dicts[k];
         //reduce from end
         var word=text;
         var def='';
         while(word.length > 0){
            for(var i in dict){
               if(word==dict[i][0]){
                  if(def != ''){
                     def+=";"+dict[i][1];
                  }else{
                     def+=dict[i][1];
                  }
               }
            }

            if(def==''){
               word = word.slice(0,-1);
            }else{
               break;
            }
         }
         if(def != ''){
            defAll+=k+". ["+word+"] "+def+"<br>";
         }

         //reduce from start
         word = text.substring(1,text.length);
         def='';
         while(word.length > 0){
            for(var i in dict){
               if(word==dict[i][0]){
                  if(def != ''){
                     def+=";"+dict[i][1];
                  }else{
                     def+=dict[i][1];
                  }
               }
            }

            if(def==''){
               word = word.substring(1, word.length);
            }else{
               break;
            }
         }
         if(def != ''){
            defAll+=k+". ["+word+"] "+def+"<br>";
         }
      }

      d.innerHTML=text+"<hr>"+defAll;
      frame.document.getElementsByTagName('body')[0].appendChild(d);
	}
}

body=frame.document.getElementsByTagName('body')[0]
body.onclick=function(){gst()};

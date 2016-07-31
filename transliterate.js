console.log("Started..");
var urls=['/data/buddhadatta_data.json','/data/sumangala_data.json','/data/tummodic.json','/data/yuttadhammo_ped.json']
var dicts= new Array();
function callback(resp,i){
   dicts.push(resp);
   i++;
   if(i<urls.length){
      loadData(i);
   }
}

//'http://pitaka.lk/dict/data/buddhadatta_data.json';
function loadData(i){
   var url=urls[i];
   var xhr = new XMLHttpRequest();
   xhr.open("GET",chrome.extension.getURL(url),true);
   xhr.responseType = "json";
   xhr.onreadystatechange=function(){
      if (xhr.readyState==4 || xhr.readyState==200){
         var status = xhr.status;
         if (status == 200) {
            callback(xhr.response,i);
         } else {
            console.log("XHR:"+status);
         }
      }
   }
   xhr.send(null);
}

loadData(0);

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
   y=y+10+yOffset;

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

  		d.style.fontFamily='UN-Abhaya,KaputaUnicode,"Noto Sans Sinhala",Tipitaka_Sinhala1,"Iskoola Pota","URW Palladio ITU", "DejaVu Serif", "Times New Roman", serif';
		d.innerHTML=text;

      var defAll='';

      for(var k in dicts){
         console.log(k);
         dict=dicts[k];
         //reduce from end
         var word=text;
         var right;
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
            defAll+=k+". ["+word+" ⇠]"+def+"<br>";
         }

         //reduce from start
         def='';
         var r = RegExp(word);
         right = text.replace(r,"");
         word  = right;

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
            defAll+=k+". [⇢ "+word+"] "+def+"<br>";
         }

         //center from start
         def='';
         var r = RegExp(word);
         word = right.replace(r,"");
         for(var i in dict){
            if(word==dict[i][0]){
               if(def != ''){
                  def+=";"+dict[i][1];
               }else{
                  def+=dict[i][1];
               }
            }
         }

         if(def != ''){
            defAll+=k+". [⇢ "+word+" ⇠] "+def+"<br>";
         }
      }

      d.innerHTML="<div width='100%' style='border-bottom:1px solid silver'>"+text+"</div>"+defAll;
      frame.document.getElementsByTagName('body')[0].appendChild(d);
   }
}

body=frame.document.getElementsByTagName('body')[0]
body.onclick=function(){gst()};

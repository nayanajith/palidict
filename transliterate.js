console.log("Started..");
var dicts={
   buddhadatta:['si','si','/data/buddhadatta_data.json'],
   sumangala:['si','si','/data/sumangala_data.json'],
   tummo:['en','en','/data/tummodic.json'],
   yuttadhammo:['en','en','/data/yuttadhammo_ped.json']
}
var dataArr=[];
for(var key in dicts){
   dataArr.push(key);
}

var i=0;
function callback(resp,ele){
   dicts[ele][2]=resp;
   i++;
   if(i<dataArr.length){
      loadData(dataArr[i]);
   }
}

//ajax load data 
function loadData(ele){
   var url=dicts[ele][2];
   var xhr = new XMLHttpRequest();
   xhr.open("GET",chrome.extension.getURL(url),true);
   xhr.responseType = "json";
   xhr.onreadystatechange=function(){
      if (xhr.readyState==4 || xhr.readyState==200){
         if (xhr.status == 200) {
            callback(xhr.response,ele);
         } else {
            console.log("XHR:"+status);
         }
      }
   }
   xhr.send(null);
}

//load all data files recursively
loadData(dataArr[0]);


//www.tipitaka.org has frames 
var frame=window;
if(document.location.origin=="http://www.tipitaka.org"){
   var frame=window.frames['text'];
}

var sin=true;
function translit(text){
   var consonantsRom = [];
   var consonantsSin = [];
   var vowelsRom     = [];
   var vowelsSin     = [];
   var vowelsSinMod  = [];

    vowelsSin.push('ආ');    vowelsRom.push('ā');    vowelsSinMod.push('ා');
    vowelsSin.push('ඇ');    vowelsRom.push('æ');    vowelsSinMod.push('ැ');
    vowelsSin.push('ඈ');    vowelsRom.push('ǣ');    vowelsSinMod.push('ෑ');
    vowelsSin.push('ඉ');    vowelsRom.push('i');    vowelsSinMod.push('ි');
    vowelsSin.push('ඊ');    vowelsRom.push('ī');    vowelsSinMod.push('ී');
    vowelsSin.push('උ');    vowelsRom.push('u');    vowelsSinMod.push('ු');
    vowelsSin.push('ඌ');    vowelsRom.push('ū');    vowelsSinMod.push('ූ');
    vowelsSin.push('එ');    vowelsRom.push('e');    vowelsSinMod.push('ෙ');
    vowelsSin.push('ඒ');    vowelsRom.push('ē');    vowelsSinMod.push('ේ');
    vowelsSin.push('ඔ');    vowelsRom.push('o');    vowelsSinMod.push('ො');
    vowelsSin.push('ඕ');    vowelsRom.push('ō');    vowelsSinMod.push('ෝ');
    vowelsSin.push('ඖ');    vowelsRom.push('au');   vowelsSinMod.push('ෞ');
    vowelsSin.push('ඓ');    vowelsRom.push('ai');   vowelsSinMod.push('ෛ');
    vowelsSin.push('සෘ');   vowelsRom.push('ru');    vowelsSinMod.push('ෘ'); 
    vowelsSin.push('සෲ');   vowelsRom.push('rū');    vowelsSinMod.push('ෲ');
    vowelsSin.push('අං');    vowelsRom.push('ṃ');    vowelsSinMod.push('ං');
    

    vowelsSin.push('');    vowelsRom.push('');    vowelsSinMod.push('්');
    vowelsSin.push('අ');    vowelsRom.push('a');    vowelsSinMod.push('');
    vowelsSin.push('ං');    vowelsRom.push('ṃ');    vowelsSinMod.push('ං');

    consonantsSin.push('ක'); consonantsRom.push('k');    
    consonantsSin.push('ඛ'); consonantsRom.push('kh');
    consonantsSin.push('ග'); consonantsRom.push('g');
    consonantsSin.push('ඝ'); consonantsRom.push('gh');
    consonantsSin.push('ඞ'); consonantsRom.push('n̆g');
    consonantsSin.push('ච'); consonantsRom.push('c');
    consonantsSin.push('ඡ'); consonantsRom.push('ch');
    consonantsSin.push('ජ'); consonantsRom.push('j');
    consonantsSin.push('ඣ'); consonantsRom.push('jh');
    consonantsSin.push('ඤ'); consonantsRom.push('ñ');
    consonantsSin.push('ට'); consonantsRom.push('ṭ');
    consonantsSin.push('ඨ'); consonantsRom.push('ṭh');
    consonantsSin.push('ඩ'); consonantsRom.push('ḍ');
    consonantsSin.push('ඪ'); consonantsRom.push('ḍh');
    consonantsSin.push('ණ'); consonantsRom.push('ṇ');
    consonantsSin.push('ත'); consonantsRom.push('t');
    consonantsSin.push('ථ'); consonantsRom.push('th');
    consonantsSin.push('ද'); consonantsRom.push('d');
    consonantsSin.push('ධ'); consonantsRom.push('dh');
    consonantsSin.push('න'); consonantsRom.push('n');
    consonantsSin.push('ප'); consonantsRom.push('p');
    consonantsSin.push('ඵ'); consonantsRom.push('ph');
    consonantsSin.push('බ'); consonantsRom.push('b');
    consonantsSin.push('භ'); consonantsRom.push('bh');
    consonantsSin.push('ම'); consonantsRom.push('m');   
    consonantsSin.push('ය'); consonantsRom.push('y');
    consonantsSin.push('ර'); consonantsRom.push('r');
    consonantsSin.push('ල'); consonantsRom.push('l');
    consonantsSin.push('ව'); consonantsRom.push('v');
    consonantsSin.push('ස'); consonantsRom.push('s');
    consonantsSin.push('හ'); consonantsRom.push('h');
    consonantsSin.push('ළ'); consonantsRom.push('ḷ');

    consonantsSin.push('ඬ'); consonantsRom.push('n̆ḍ');
    consonantsSin.push('ඳ'); consonantsRom.push('n̆d');
    consonantsSin.push('ඟ'); consonantsRom.push('n̆g');
    consonantsSin.push('ශ'); consonantsRom.push('śh');
    consonantsSin.push('ෂ'); consonantsRom.push('ṣh');
    consonantsSin.push('ඥ'); consonantsRom.push('gn');
    consonantsSin.push('ඹ'); consonantsRom.push('m̆b');
    consonantsSin.push('ෆ'); consonantsRom.push('f');


    //Detect if the text is roman  
    for(var c in consonantsRom){
       if(consonantsRom[c] != '' &  text.indexOf(consonantsRom[c]) != '-1'){
          sin=false;
          break;
       }
    }

    for(var v in vowelsRom){
       if(vowelsRom[v] != '' & text.indexOf(vowelsRom[v]) != '-1'){
          sin=false;
          break;
       }
    }

    if(sin){ //sin->en
       for(var v in vowelsRom){
          for(var c in consonantsRom){
             r = new RegExp(consonantsSin[c]+vowelsSinMod[v],"g");
             text=text.replace(r,consonantsRom[c]+vowelsRom[v]);
          }
       }

       for(var v in vowelsSin){
          r = new RegExp(vowelsSin[v],"g");
          text=text.replace(r,vowelsRom[v]);
       }
    }else{ //en->si

       //Reorder vowels for en->si
       var a=vowelsSin.indexOf('');
       var b=vowelsSin.indexOf('අ');
       var v = vowelsSin[a];
       vowelsSin[a]=vowelsSin[b];
       vowelsSin[b]=v;

       a=vowelsRom.indexOf('');
       b=vowelsRom.indexOf('a');
       v = vowelsRom[a];
       vowelsRom[a]=vowelsRom[b];
       vowelsRom[b]=v;

       a=vowelsSinMod.indexOf('්');
       b=vowelsSinMod.indexOf('');
       v = vowelsSinMod[a];
       vowelsSinMod[a]=vowelsSinMod[b];
       vowelsSinMod[b]=v;

       for(var v in vowelsRom){
          for(var c in consonantsRom){
             r = new RegExp(consonantsRom[c]+vowelsRom[v],"g");
             text=text.replace(r,consonantsSin[c]+vowelsSinMod[v]);
          }
       }

       for(var v in vowelsSin){
          r = new RegExp(vowelsRom[v],"g");
          text=text.replace(r,vowelsSin[v]);
       }
    }

    return text;
}

function gst(){
   //Calculate top,left
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

   //Remove popup tooltip element
	var pd=frame.document.getElementById('ttt');
	if(pd){
		pd.remove();
   }

   //If selection is text
	if(text){
      //All text read as lower case
      text=text.toLowerCase();

      //Drow the tooltip element and style it
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
		d.innerHTML=text;

      //Transliterate the word si<->en
      var textTr  =translit(text);

      var defHtml ='';
      var defAll  ='';

      //Finding the words from the dictionaries
      for(var k in dicts){
         dict=dicts[k][2];
         var word=text;

         //If word is sinhala, transliteration will be english
         if(sin){
            if(dicts[k][1]=='en'){
               word=textTr;
            }
         }else{
            if(dicts[k][1]=='si'){
               word=textTr;
            }
         }

         var right;
         var def='';

         //Identify the starting sub-word - reduce the word from right to left <--
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
            defAll+="["+word+" ⇠]"+def+"<br>";
         }

         //Identify the ending sub-word - reduce from left to right -->
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
            defAll+="[⇢ "+word+"] "+def+"<br>";
         }

         //identify the middle word - remove starting sub-word and ending sub-word from the word
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
            defAll+="[⇢ "+word+" ⇠] "+def+"<br>";
         }

         //Resize the font when the meaning has more than 200 chars
         if(defAll.length > 200){
            defAll='<font size=\'2\'>'+defAll+'</font>';
         }

         if(dicts[k][1]=='en'){
            defHtml+='<div title='+k+' id="tra" style="overflow-y: auto;max-height:100px;border-left:2px solid #AED6F1;margin-bottom:2px;font-family=\'\"URW Palladio ITU\", "DejaVu Serif\", \"Times New Roman\", serif\'>'+defAll+'</div>';
         }else{
            defHtml+='<div title='+k+' id="tra" style="overflow-y: auto;max-height:100px;border-left:2px solid #ABEBC6;font-family=\'UN-Abhaya,KaputaUnicode,\"Noto Sans Sinhala\",Tipitaka_Sinhala1,\"Iskoola Pota\"\'>'+defAll+'</div>';
         }
         defAll='';
      }

      d.innerHTML="<div width='100%' style='border-bottom:1px solid silver'>"+text+"</div>"+defHtml;
      frame.document.getElementsByTagName('body')[0].appendChild(d);
   }
}

body=frame.document.getElementsByTagName('body')[0]
body.onclick=function(){gst()};

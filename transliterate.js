//log with date
function log(item){
   var d = new Date();
   //console.log(d);
   //console.log(item);
   console.log(item);
}

var optsObj={
	subwords:	[true,"Enable sub-word detection"],
}

//Populate options if not available in store
var optNotSet=true;
chrome.storage.sync.get({
   opts: optNotSet 
}, function(items) {
   if(items.opts==true){
      chrome.storage.sync.set({
        opts:optsObj 
      }, function() {
         log("Options array initialized..");
      });
   }
});

//Dictionary array
var dictsObjE={
	pbps:	[true,"si","si",'/data/buddhadatta_data.json',"Polwatte Buddhadatta himi (SI)Pali-Sinhala"],
	msps:	[true,"si","si",'/data/sumangala_data.json',"Madithiyawela Siri Sumangala himi (SI)Pali-Sinhala"],
	tpe:	[true,"en","en",'/data/tummodic.json',"Tummo (EN)Pali-English"],
	ype:	[true,"en","en",'/data/yuttadhammo_ped.json',"Yuttadhammo (EN)Pali-English"],
	ycpe:	[true,"en","en","/data/yuttadhammo_cped_v.json","Yuttadhammo Concise (EN)Pali-English"],
	yppn:	[true,"en","en","/data/yuttadhammo_dppn_v.json","Yuttadhammo Dictionary of (EN)Pali Proper Names"]
}

//Populate dictionary selection if not available in store
var dictNotSet=true;
chrome.storage.sync.get({
   dicts: dictNotSet 
}, function(items) {
   if(items.dicts==true){
      chrome.storage.sync.set({
         dicts: dictsObjE
      }, function() {
         log("Dict array initialized..");
      });
   }
});

log("Started..");

var dictsObj={
   /*
	pbps:	["si","si",'/data/buddhadatta_data.json'],
	msps:	["si","si",'/data/sumangala_data.json'],
	tpe:	["en","en",'/data/tummodic.json'],
	ype:	["en","en",'/data/yuttadhammo_ped.json'],
	ycpe:	["en","en","/data/yuttadhammo_cped_v.json"],
	yppn:	["en","en","/data/yuttadhammo_dppn_v.json"]
   */
}

//Assign stored options to dictsObj array
var dataArr=[];
function getOptions(dicts){
   for(var d in dicts){
      if(dicts[d][0]==true){
         var arr=[dicts[d][1],dicts[d][2],dicts[d][3],dicts[d][4]];
         dictsObj[d]=arr;
         dataArr.push(d);
      }
   }
}

//Load data recursively and store as hash
var i=0;
function callback(resp,ele){
	if(dictsObj[ele]){

      //convert array to hash (object)
      var hash={};
      for(var k in resp){
         var word=resp[k][0].trim();
         var def=resp[k][1].trim();
         if(hash[word]){
            hash[word]=hash[word]+"; "+def;
         }else{
            hash[word]=def;
         }
      }
		dictsObj[ele][2]=hash;
	}
   i++;
   if(i<dataArr.length){
      loadData(dataArr[i]);
   }
}

//ajax download json data 
function loadData(ele){
   var url=dictsObj[ele][2];
   var xhr = new XMLHttpRequest();
   xhr.open("GET",chrome.extension.getURL(url),true);
   xhr.responseType = "json";
   xhr.onreadystatechange=function(){
      if (xhr.readyState==4 || xhr.readyState==200){
         if (xhr.status == 200) {
            callback(xhr.response,ele);
         } else {
            log("XHR:"+xhr.status);
         }
      }
   }
   xhr.send(null);
}


//Read the stored dictionary options 
chrome.storage.sync.get({
   dicts: dictsObjE,
   opts: optsObj
}, function(items) {
   getOptions(items.dicts);
   loadData(dataArr[0]);
   optsObj=items.opts;
});



//www.tipitaka.org has frames 
var frame=window;
if(document.location.origin=="http://www.tipitaka.org"){
   var frame=window.frames['text'];
}

//Transliterate sinhala <--> english (roman)
var lang='si';
function translit(text,trOnly=false,language=false){
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
//    vowelsSin.push('අං');    vowelsRom.push('ṃ');    vowelsSinMod.push('ං');
    

    vowelsSin.push('');    vowelsRom.push('');    vowelsSinMod.push('්');
    vowelsSin.push('අ');    vowelsRom.push('a');    vowelsSinMod.push('');
    vowelsSin.push('ං');    vowelsRom.push('ṃ');    vowelsSinMod.push('ං');

    consonantsSin.push('ක'); consonantsRom.push('k');    
    consonantsSin.push('ඛ'); consonantsRom.push('kh');
    consonantsSin.push('ග'); consonantsRom.push('g');
    consonantsSin.push('ඝ'); consonantsRom.push('gh');
//    consonantsSin.push('ඞ'); consonantsRom.push('n̆g');
    consonantsSin.push('ඞ'); consonantsRom.push('ṅ');
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


    var lang_='si';

    //Detect language
    if(language==false){
    //Detect if the text is roman  
       for(var c in consonantsRom){
          if(consonantsRom[c] != '' &  text.indexOf(consonantsRom[c]) != '-1'){
             lang_='en';
             break;
          }
       }

       for(var v in vowelsRom){
          if(vowelsRom[v] != '' & text.indexOf(vowelsRom[v]) != '-1'){
             lang_='en';
             break;
          }
       }
    }else{
       lang_=language;  // use the given language
    }


    if(lang_=='si'){ //sin
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

    //If translate only option is true don't change language flag
    if(trOnly==false){
       lang=lang_;
    }

	 return text;
}

//Remove popup tooltip element
function rmTt(){
	var pd=frame.document.getElementById('ttt');
	if(pd){
		pd.remove();
   }
   if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
         window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
         window.getSelection().removeAllRanges();
      }
   } else if (document.selection) {  // IE?
      document.selection.empty();
   }
}

//Addword form and functionality
function addWordWin(word,def,ref){
   //Populate word,def,ref with previouse values if available
   chrome.storage.sync.get({
      myDict: null
   }, function(items) {
      //log(items);
      if(items.myDict){
         for(var k in items.myDict){
            if(items.myDict[k][0]==word){
               word=items.myDict[k][0];
               def=items.myDict[k][1];
               ref=items.myDict[k][2];
            }
         }
      }
      var ttDef=frame.document.getElementById('ttDef');
      var form="<table  width='100%'>"
         +"<tr><td class='ttAddFormTd'>Word:</td><td><input type='text' id='ttPopWord'size=25 value='"+word+"'></input></td></tr>"
         +"<tr><td class='ttAddFormTd'>Reference:</td><td><input type='text' id='ttPopRef' size=25 value='"+ref+"'></input></td></tr>"
         +"<tr><td class='ttAddFormTd'>Definition:</td><td><textarea id='ttPopDef' rows=10 cols=25>"+def+"</textarea></td></tr>"
         +"<tr><td class='ttAddFormTd' colspan=2 align=center><button id='ttPopSave' class='ttButton' >Add</button></td></tr>"
         +"<tr><td class='ttAddFormTd' colspan=2><div id='ttPoNotify'></div></td></tr>"
         +"</table>";
      ttDef.innerHTML=form;
      ttDef.style.fontFamily='initial';

      frame.document.getElementById('ttPopSave').onclick=function(){
         var word=document.getElementById('ttPopWord').value;
         var ref=document.getElementById('ttPopRef').value;
         var def=document.getElementById('ttPopDef').value;
         log("Added:"+word+":"+ref+":"+def);

         //Read the stored options
         chrome.storage.sync.get({
            myDict: null
         }, function(items) {
            var md;
            if(items.myDict){
               md=items.myDict;

               //delete the word before save if available
               for(var k in md){
                  if(md[k][0]==word){
                     md.splice(k,1);
                  }
               }
               md.push([word,def,ref]);
            }else{
               md=[[word,def,ref]];
            }
      
            //log(md);

            //Read the stored options
            chrome.storage.sync.set({
               myDict: md
            }, function() {
               log('Saved: '+word);
            });
         });
         rmTt();
      };
   });
}

var fixObj={ 'a':'ā', 'i':'ī', 'u':'ū' };

function fixLeft(str){
   for(w in fixObj){
      if(str[0]==fixObj[w]){
         str=str.replace(RegExp('^'+fixObj[w]),w);
      }
   }
   return str;
}

function fixRight(str){
   for(w in fixObj){
      if(str[str.length-1]==fixObj[w]){
         str=str.replace(RegExp(fixObj[w]+'$'),w);
      }
   }
   return str;
}


//log(dictsObj);
var text="";
var textTr="";
var mouseIn=false;
function gst(retDef,manWord){
	var ttWidth=500;
	var ttHeight=100;
   //Calculate top,left
	var x = frame.event.clientX;     // Get the horizontal coordinate
	var y = frame.event.clientY;     // Get the vertical coordinate
	var iw=frame.innerWidth;			// Width of the window
	var ih=frame.innerHeight;			// Height of the window
   var xOffset=Math.max(frame.document.documentElement.scrollLeft,frame.document.body.scrollLeft);
   var yOffset=Math.max(frame.document.documentElement.scrollTop,frame.document.body.scrollTop);
   var scrollWidth=Math.max(frame.document.scrollingElement.scrollWidth,frame.document.body.scrollWidth);
   var scrollHeight=Math.max(frame.document.scrollingElement.scrollHeight,frame.document.body.scrollHeight);

	//Window right edge fix - move the tooltip left until full view inside the page
   x=x+xOffset;
	if((iw-x)<ttWidth){
		x=iw-ttWidth-40;
	}

   var yTop=y+10+yOffset;

   text = "";
   if(manWord){
      text=manWord;
   }else{
      if (frame.getSelection) {
         text = frame.getSelection().toString();
      } else if (frame.document.selection && frame.document.selection.type != "Control") {
         text = frame.document.selection.createRange().text;
      }
   }

   //Remove popup tooltip element
	var pd=frame.document.getElementById('ttt');
	if(pd && ! retDef){
		pd.remove();
   }


   //If selection is text
	if(text){
      //load local my dictionary from storage
      chrome.storage.sync.get({
         myDict:null 
      }, function(items) {
         //log(items.myDict);
         if(items.myDict){

            //convert array to hash
            var hash={};
            for(var k in items.myDict){
               hash[items.myDict[k][0]]=items.myDict[k][1];
            }
            dictsObj['mydict']=['si','si',hash,'My dictionary (local)'];
         }
      });

      //All text read as lower case
      text=text.toLowerCase();
      text=text.split(" ")[0];
      text=text.trim();

      //Drow the tooltip element and style it
		var d = frame.document.createElement('div');
		d.id='ttt';
		d.style.left = x+'px';
      d.style.top = yTop+'px';
		d.style.position = 'absolute';
		
      //Transliterate the word si<->en
      textTr  =translit(text);

      //English word will be used to find sub-word
      var textEn=text;
      if(lang=='si'){
         var textEn=textTr;
      }

      var defHtml = '';
      var defAll  = '';
      var concat  = [];

      //Finding the words from the dictionaries
      for(var k in dictsObj){
         var dict_name=dictsObj[k][3];
         dict=dictsObj[k][2];
         //var word=text;
         var word=textEn;
         var right;
         var def  ='';
         var found=[];

   
         //Identify the starting sub-word - reduce the word from right to left <--
         if(optsObj['subwords'][0]==true){
            var subWord=word;

            while(word.length > 0){

               subWord=word;

               if(dictsObj[k][1]=='si'){
                  subWord=translit(word,true,'en');
               }

               if(dict[subWord]){
                  def+=dict[subWord];
                  concat.push(subWord);
                  found.push(subWord);
                  break;
               }else{
                  var fixW=fixRight(word);
                  if(word != fixW){
                     word=fixW;
                  }else{
                     word = word.slice(0,-1);
                  }
               }
            }

            if(def != ''){
               defAll+="<b>["+subWord+" ⇠]</b> "+def+"<br>";
            }

            //Identify the ending sub-word - reduce from left to right -->
            def='';
            var r = RegExp(word);

            right = text.replace(r,"");

            //textTr if lang is not equal to dict language
            if(lang!=dictsObj[k][1]){
               right = textTr.replace(r,"");
            }

            word  = right;
            var mdef='';

            while(word.length > 0){
               subWord=word;

               if(dictsObj[k][1]=='si'){
                  subWord=translit(word,true,'en');
               }

               if(dict[subWord]){
                  concat.push(subWord);
                  if(found.indexOf(subWord) == -1){
                     def+=dict[subWord];
                     defAll+="<b>[⇢ "+subWord+"]</b> "+def+"<br>";
                     def='';
                     found.push(subWord);
                  }
                  break;
               }else{
                  //identify the middle word - remove starting sub-word and ending sub-word from the word
                  var mid=word;
                  while(mid.length > 0){
                     mid=mid.trim();

                     subWord=mid;
                     if(dictsObj[k][1]=='si'){
                        subWord=translit(mid,true,'en');
                     }

                     if(dict[subWord]){
                        concat.push(subWord);
                        if(found.indexOf(subWord) == -1){
                           mdef+=dict[subWord];
                           defAll+="<b>[⇢ "+subWord+" ⇠]</b> "+mdef+"<br>";
                           mdef='';
                           found.push(subWord);
                        }
                        break;
                     }else{
                        var fixW=fixRight(mid);
                        if(mid != fixW){
                           mid = fixW;
                        }else{
                           mid = mid.slice(0,-1);
                        }
                     }
                  }
               }
               var fixW=fixLeft(word);
               if(word != fixW){
                  word=fixW;
               }else{
                  word = word.substring(1, word.length);
               }

            }
         }else{
            if(lang == dictsObj[k][1]){
               if(dict[text]){
                  defAll+=dict[text]+"<br>";
               }
            }else{
               if(dict[textTr]){
                  defAll+=dict[textTr];
               }
            }
         }


         //Resize the font when the meaning has more than 200 chars
         if(defAll.length > 200){
            defAll='<font size=\'2\'>'+defAll+'</font>';
         }

			if(defAll!=''){
				if(dictsObj[k][1]=='en'){
					defHtml+='<div title="'+dict_name+'" class="ttTraEn" >'+defAll+'</div>';
				}else{
					defHtml+='<div title="'+dict_name+'" class="ttTraSi" >'+defAll+'</div>';
				}
			}
         defAll='';
      }

      if(retDef){
         return defHtml;
      }else{

         d.innerHTML="<table width='100%' style='border-bottom:1px solid silver'><tr><td><div class='ttTraWord' title='"+concat.join()+"'>"+text+" ⇠⇢ "+textTr+"</div></td><td align=right><button class='ttButton' style='color:green' id='ttBtnAdd'>+</button><button class='ttButton' style='color:red' id='ttBtnClose'>x</button></td></tr></table><div id='ttDef'>"+defHtml+"</div>";
         //frame.document.getElementsByTagName('body')[0].appendChild(d);
         frame.document.scrollingElement.appendChild(d);
         d.parentElement.style.position='relative';

         //Titlebar buttons
         var ttBtnClose=frame.document.getElementById('ttBtnClose');
         ttBtnClose.onclick=function(){
            rmTt();
         };

         var ttBtnAdd=frame.document.getElementById('ttBtnAdd');
         ttBtnAdd.onclick=function(){
            if(lang=='si'){
               addWordWin(text,"","");
            }else{
               addWordWin(textTr,"","");
            }
         };

         //Tooltip bottom edge fix - get to tooltip to the top of the word
         //log(ih+"::"+y+"::"+d.offsetHeight+"::"+yOffset+"::"+scrollHeight);
         //log(scrollHeight-yOffset-y+10);
         if((ih-y)<d.offsetHeight){
            d.style.top = '';
            d.style.bottom = (scrollHeight-yOffset-y-10)+'px';
         }
      }
   }
}

var body=frame.document.getElementsByTagName('body')[0];
body.onclick=function(event){
   //Delete tooltip only if the mouse is out of the tooltip
   var path=event.path;
   var inTt=false;
   for(var d in path){
      if(path[d].id=='ttt'){
         inTt=true;
         break;
      }
   }

	var pd=frame.document.getElementById('ttt');
	if(pd){
      if(! inTt) rmTt();                         
   }else{
      gst(false);
   }
};


//Addword form and functionality
function manSearchWin(){

   //CLeanup tooltip window
   rmTt();

   //Drow the tooltip element and style it
   var d = frame.document.createElement('div');
   d.id='ttt';
   d.style.right = '5px';
   d.style.top = '10px';
   d.style.position = 'fixed';

   d.innerHTML="<table width='100%' style='border-bottom:1px solid silver'><tr><td><div class='ttTraWord' title='Type word in sinhala or english'>Word: <input type='text' id='manSearchWord' size=35></input><button id='manSearch' >Search</button></div></td><td align=right><button style='color:green' id='ttBtnAdd'>+</button><button style='color:red' id='ttBtnClose'>x</button></td></tr></table><div id='ttDef'></div>";


   frame.document.scrollingElement.appendChild(d);
   d.parentElement.style.position='relative';
   d.style.fontFamily='initial';

   var ttBtnClose=frame.document.getElementById('ttBtnClose').onclick=function(){
      rmTt();
   };

   var ttBtnAdd=frame.document.getElementById('ttBtnAdd').onclick=function(){
      if(text == ''){
         text     =frame.document.getElementById('manSearchWord').value;
         textTr   =translit(text);
      }
      if(lang=='si'){
         addWordWin(text,"","");
      }else{
         addWordWin(textTr,"","");
      }
   };

   frame.document.getElementById('manSearch').onclick=function(){
      var word=frame.document.getElementById('manSearchWord').value;
      frame.document.getElementById('ttDef').innerHTML=gst(true,word);
      frame.document.getElementById('manSearchWord').value=text+" - "+textTr;
   }
}
manSearchWin();

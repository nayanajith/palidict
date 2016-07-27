alert("Started..");
var frame=window.frames['text'];
function gst(){
	var x = frame.event.clientX;     // Get the horizontal coordinate
	var y = frame.event.clientY;     // Get the vertical coordinate
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
		d.style.width='300px';
		d.style.height='100px';
		d.style.border="1px solid #999";
		d.style.background="#ffd";
		d.style.borderRadius="4px";
		d.style.padding="9px";
		d.style.boxShadow="0 0 20px rgba(0,0,0,0.5)";

  		d.style.fontFamily='UN-Abhaya,KaputaUnicode,"Noto Sans Sinhala",Tipitaka_Sinhala1,"Iskoola Pota"';
		d.innerHTML=text;
		if(text=='පාරාජික'){
			d.innerHTML+="<hr>භික්ෂුභාවය නසාගත් පුද්ගලයා.";
		}
		frame.document.getElementsByTagName('body')[0].appendChild(d);
	}
}

body=frame.document.getElementsByTagName('body')[0]
body.onclick=function(){gst()};

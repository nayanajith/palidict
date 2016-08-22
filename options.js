// Saves options to chrome.storage
var dictsObj={
	pbps:	[false,"si","si",'/data/buddhadatta_data.json',"Polwatte Buddhadatta himi (SI)Pali-Sinhala"],
	msps:	[false,"si","si",'/data/sumangala_data.json',"Madithiyawela Siri Sumangala himi (SI)Pali-Sinhala"],
	tpe:	[false,"en","en",'/data/tummodic.json',"Tummo (EN)Pali-English"],
	ype:	[false,"en","en",'/data/yuttadhammo_ped.json',"Yuttadhammo (EN)Pali-English"],
	ycpe:	[false,"en","en","/data/yuttadhammo_cped_v.json","Yuttadhammo Concise (EN)Pali-English"],
	yppn:	[false,"en","en","/data/yuttadhammo_dppn_v.json","Yuttadhammo Dictionary of (EN)Pali Proper Names"]
}
  

function save_options() {
	var color = 'red';
	for(var d in dictsObj){
		dictsObj[d][0] = document.getElementById(d).checked;
	}
	chrome.storage.sync.set({
		dicts: dictsObj
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	chrome.storage.sync.get({
		dicts: dictsObj
	}, function(items) {
		var innerHtml='<legend>Select dictionaries</legend>';
		for(var d in items.dicts){
			var checked='';
			if(items.dicts[d][0]){
				var checked='checked';
			}
			innerHtml +="<label><input type='checkbox' id='"+d+"' "+checked+">"+items.dicts[d][4]+"</label><br>";
		}
		document.getElementById('dictFieldset').innerHTML=innerHtml;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

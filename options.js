// Saves options to chrome.storage
var dictsObj={
	pbps:	[true,"si","si",'/data/buddhadatta_data.json',"Polwatte Buddhadatta himi (SI)Pali-Sinhala"],
	msps:	[true,"si","si",'/data/sumangala_data.json',"Madithiyawela Siri Sumangala himi (SI)Pali-Sinhala"],
	tppe:	[true,"en","en",'/data/tummodic.json',"Tummo (EN)Pali-English"],
	cpe:	[false,"en","en","","Concise (EN)Pali-English"],
	dppn:	[false,"en","en","","Dictionary of (EN)Pali Proper Names"],
	pe:	[true,"en","en",'/data/yuttadhammo_ped.json',"(EN)Pali-English"]
}

function save_options() {
	var color = 'red';
	for(var d in dictsObj){
		dictsObj[d][0] = document.getElementById(d).checked;
	}
	chrome.storage.sync.set({
		dicts: dictsObj,
		color: color 
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
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get({
		dicts: dictsObj,
		color: 'red' 
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

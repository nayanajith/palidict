// Saves options to chrome.storage
 
var dictsObj={};

function save_options() {
   var color = 'red';
   chrome.storage.sync.get({
      dicts: dictsObj
   }, function(items) {
      dictsObj=items.dicts;
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
   });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	chrome.storage.sync.get({
		dicts: dictsObj
	}, function(items) {
      console.log(items);
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

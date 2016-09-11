/*
   Copyright (C) 2016 Nayanajit Mahendra Laxaman mail: nmlaxaman@gmail.com       

	This file is part of palidict.

	Palidict is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Foobar is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with Foobar.  If not, see <http://www.gnu.org/licenses/>.

*/

// Saves options to chrome.storage
 
var dictsObj={};
var optsObj ={};

function save_options() {
   var color = 'red';
   chrome.storage.sync.get({
      dicts: dictsObj,
      opts: optsObj
   }, function(items) {
      dictsObj=items.dicts;
      for(var d in dictsObj){
         dictsObj[d][0] = document.getElementById(d).checked;
      }

      optsObj=items.opts;
      for(var d in optsObj){
         optsObj[d][0] = document.getElementById(d).checked;
      }

      chrome.storage.sync.set({
         dicts: dictsObj,
         opts: optsObj
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
		dicts: dictsObj,
      opts: optsObj
	}, function(items) {
      //dictionaries
		var innerHtml='<legend>Select dictionaries</legend>';
		for(var d in items.dicts){
			var checked='';
			if(items.dicts[d][0]){
				var checked='checked';
			}
			innerHtml +="<label><input type='checkbox' id='"+d+"' "+checked+">"+items.dicts[d][4]+"</label><br>";
		}
		document.getElementById('dictFieldset').innerHTML=innerHtml;

      //Options
      console.log(items.opts);
		innerHtml='<legend>Options</legend>';
      for(var d in items.opts){
         var checked='';
         if(items.opts[d][0]){
            var checked='checked';
         }
         innerHtml +="<label><input type='radio' name='mode' id='"+d+"' "+checked+">"+items.opts[d][1]+"</label><br>";
      }
		document.getElementById('optsFieldset').innerHTML=innerHtml;
   });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

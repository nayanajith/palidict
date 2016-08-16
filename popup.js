alert('dddddddddd');
/*
chrome.tabs.executeScript('startStop', {
   "file": "transliterate.js"
});
*/
//document.getElementById('startStop').onclick = start;
//

var ssButton=document.getElementById('startStop');
function saveOptions(sKey,sVal) {
   chrome.storage.sync.set({
      sKey: sVal
   }, function() {
      console.log(sKey);
      console.log(sVal);
      if(sVal){
         ssButton.innerHTML='off';
      }else{
         ssButton.innerHTML='on';
      }
   });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
   chrome.storage.sync.get({
      'startStop':false
   }, function(items) {
      console.log(items);
      if(items.startStop==true){
         ssButton.innerHTML='off';
      }else{
         ssButton.innerHTML='on';
      }
   });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
//document.getElementById('save').addEventListener('click', save_options);

function start(state) {
   if(state){
      chrome.tabs.executeScript({
         file: 'transliterate.js'
      }); 
   }else{
      saveOptions('startStop',false);
   }
}
ssButton.addEventListener('click', start(true));

//ssButton.onclick=start(true);

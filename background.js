chrome.browserAction.onClicked.addListener(function (tab) { 
   //   if (tab.url.indexOf("http://www.tipitaka.org") != -1) {
   chrome.tabs.executeScript(tab.id, {
      "file": "transliterate.js"
   });
   //  }
});

/*
//for popup
chrome.tabs.onUpdated.addListener(function(id, info, tab){
   chrome.pageAction.show(tab.id);
   chrome.tabs.executeScript(null, {"file": "transliterate.js"});
});

// show the popup when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
   chrome.pageAction.show(tab.id);
});
*/

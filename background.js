chrome.browserAction.onClicked.addListener(function (tab) { 
//   if (tab.url.indexOf("http://www.tipitaka.org") != -1) {
      chrome.tabs.executeScript(tab.id, {
         "file": "transliterate.js"
      });
 //  }
});

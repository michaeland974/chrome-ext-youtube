(() => {
  const targetUrl = 'https://www.youtube.com/';
  listener(targetUrl, injectScript);  
})();

type TabInject = {
  tab: chrome.tabs.Tab, 
  targetUrl: string
}

function listener(targetUrl: string, callback: (tabInject: TabInject) => void){
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(tab.url === targetUrl && tab.status === 'complete'){
      callback({tab, targetUrl});
    }
  })
}

function injectScript(tabInject: TabInject) {
  const {tab, targetUrl} = tabInject;

  if(tab.url && tab.id && tab.url === targetUrl){
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['./foreground.js']
    });
  }
}


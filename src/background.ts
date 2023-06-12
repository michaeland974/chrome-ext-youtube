type Tab = {
  status: boolean,
  browserTab: chrome.tabs.Tab
}

(async () => {
  const targetUrl = 'https://www.youtube.com/';
  const {status, browserTab}: Tab = await setTabListenerOnUpdate(targetUrl);
  if(status === true){
    injectScript(browserTab, targetUrl);
  }
})();

function injectScript(tab: chrome.tabs.Tab, targetUrl: string) {
  if(tab.url && tab.id && 
     tab.url === targetUrl){
       chrome.scripting.executeScript({
         target: {tabId: tab.id},
         files: ['./foreground.js']
       });
       console.log("from inject");
  }
}

function setTabListenerOnUpdate(targetUrl: string): Promise<Tab>{
  let statusFlag = false;
    
  return new Promise((resolve) => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if(statusFlag){
        resolve({status: statusFlag, browserTab: tab});
      }
      //Check tab status to prevent multiple fires
      if(tab.url === targetUrl && tab.status === 'complete'){
        statusFlag = true;
      }
    })
  });
}

// function setTabListenerOnUpdate(targetUrl: string): void{
//   chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//       if(tab.url === targetUrl && tab.status === 'complete'){
//         injectScript(tab, targetUrl);
//       }
//   })
// }
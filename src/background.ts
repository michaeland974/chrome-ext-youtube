listener('https://www.youtube.com/', injectScript);  

type TabInject = {
  tab: chrome.tabs.Tab, 
  targetUrl: string
}

async function getTab() {
  const queryOptions = {active: true, 
                        currentWindow: true};
  const tabs = await chrome.tabs.query(queryOptions);
  return tabs[0];
}

function listener(targetUrl: string, 
                  callback: (tabInject: TabInject) => void) {
  chrome.webNavigation.onCompleted.addListener(async () => {
    const tab = await getTab();
    callback({tab, targetUrl});
  }, 
  { url: [{urlEquals: targetUrl}] });
}

function injectScript (tabInject: TabInject) {
  const {tab, targetUrl} = tabInject;

  if(tab.url && tab.id && 
     tab.url === targetUrl){
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['./foreground.js']
    });
  }
}


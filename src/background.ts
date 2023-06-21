import { TabInject } from "./interfaces/background";

listener('https://www.youtube.com/', injectScript, injectCSS);  

async function getTab() {
  const queryOptions = {active: true, 
                        currentWindow: true};
  const tabs = await chrome.tabs.query(queryOptions);
  return tabs[0];
}

function listener(targetUrl: string, 
                  callback: (tabInject: TabInject) => void, 
                  nextCallback: (tabInject: TabInject) => void) {
  chrome.webNavigation.onCompleted.addListener(async () => {
    const tab = await getTab();
    callback({tab, targetUrl});
    nextCallback({tab, targetUrl});
  }, 
  { url: [{urlEquals: targetUrl}] });
}

function injectScript (tabInject: TabInject) {
  const {tab, targetUrl} = tabInject;
  if(tab.id){
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['./foreground.js']
    });
  }
}

function injectCSS (tabInject: TabInject) {
  const {tab, targetUrl} = tabInject;
  if(tab.id){
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['./styles/homepage.css']
    });
  }
}


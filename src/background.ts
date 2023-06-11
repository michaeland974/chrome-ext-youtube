console.log("From background");

const injectScript = (tab: chrome.tabs.Tab) => {
  if(tab.url && tab.id && 
     tab.url === 'https://www.youtube.com/'){
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['./foreground.ts']
      });
  }
}
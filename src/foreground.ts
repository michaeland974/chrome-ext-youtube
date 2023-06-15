import { YoutubeElement, DOMManipulator } from './classes/DOMManipulator'

const Shorts: YoutubeElement = {
  selector: '#contents #content #contents',
  childrenSelector: '#content'
}

const Grid: YoutubeElement = {
  selector: '#contents',
  childrenSelector: '#contents'
}

const Guide: YoutubeElement = {
  selector: '#guide-wrapper > #guide-content > #guide-renderer',
  childrenSelector: '#sections' //ytd-guide-renderer
}

const GuideButton: YoutubeElement = {
  selector: '#guide-button',
  childrenSelector: '#button'
}

const chipBar: HTMLElement | null = document.getElementById('chips');
const chips: HTMLCollection | undefined = chipBar?.children;

(async () => {
  const YouTubeDOM = new DOMManipulator(Shorts, Grid, GuideButton);
  await waitForElement(YouTubeDOM.parentElements.grid);
  console.log(YouTubeDOM.parentElements.grid);
})()

 function waitForElement(element: HTMLElement | null): Promise<boolean> {
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        if (element) {
          resolve(true);
          observer.disconnect();
        }
      });
      if(element){
        resolve(true);
      }else{
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    });
  }








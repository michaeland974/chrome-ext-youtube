import { YoutubeElement, DOMManipulator } from './classes/DOMManipulator';
import { setAttributes, createElements  } from './scripts/utils';

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

const GuideHeader: YoutubeElement = {
  selector: '#guide-content', 
  childrenSelector: '#header'
}

const PrimaryContent: Omit<YoutubeElement, 'childrenSelector'> = {
  selector: '#primary'
}

const chipBar: HTMLElement | null = document.getElementById('chips');
const chips: HTMLCollection | undefined = chipBar?.children;

(async () => {
  const YouTubeDOM = new DOMManipulator(Shorts, Grid, GuideHeader, PrimaryContent);
  const { header } = YouTubeDOM.parentElements;
 
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








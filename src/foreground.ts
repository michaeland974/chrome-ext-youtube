import { DOMSelect } from './classes/DOMSelect';
import { DOMManipulate } from './classes/DOMManipulate';
import { YoutubeElement } from './interfaces/interfaces';

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
  const YouTubeDOM = new DOMSelect(Shorts, Grid, GuideHeader, PrimaryContent);
  const Factory = new DOMManipulate([
    {id: 'header-wrapper', tag: 'div'}, 
    {id: 'toggle-videos-view', tag: 'button', text: 'Homepage Videos'}
  ]);
  const [wrapper, toggle] = Factory.elements;
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








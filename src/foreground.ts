import { DOMSelect } from './classes/DOMSelect';
import { DOMManipulate } from './classes/DOMManipulate';
import { YoutubeElement } from './interfaces/interfaces';
import { waitForElement } from './scripts/utils';

const Shorts: YoutubeElement = {
  selector: '#contents #content #contents',
  childrenSelector: '#content'
}

const Grid: YoutubeElement = {
  selector: '#contents',
  childrenSelector: '#contents'
}

const PrimaryContent: Omit<YoutubeElement, 'childrenSelector'> = {
  selector: '#primary'
}

const Guide: Omit<YoutubeElement, 'childrenSelector'> = {
  selector: '#guide-content'
}

const GuideHeader: YoutubeElement = {
  selector: Guide.selector, 
  childrenSelector: '#header'
}

const GuideContent: YoutubeElement = {
  selector: Guide.selector,
  childrenSelector: '#guide-inner-content'
}

const chipBar: HTMLElement | null = document.getElementById('chips');
const chips: HTMLCollection | undefined = chipBar?.children;

(async () => {
  const Factory = new DOMManipulate([
    {id: 'header-wrapper', tag: 'div'}, 
    {id: 'toggle-videos-view', tag: 'button', text: 'Homepage Videos'},
    {id: 'videos-view', tag: 'div', text: 'open', attribute: 'closed'}
  ]);
  const YouTubeDOM = new DOMSelect(
    Shorts, Grid, {header: GuideHeader, content: GuideContent}, PrimaryContent
  );
  const {guide} = YouTubeDOM.elements;
  const [navIcon, youtubeIcon] = [...(guide.header).children];
  const [wrapper, toggleView, videosView] = Factory.elements;
  
  wrapper.append(navIcon, youtubeIcon);
  (guide.header).append(wrapper, toggleView);
  (guide.content).append(videosView);
  Factory.addToggleListener({target: toggleView as HTMLButtonElement, 
                             displayChange: guide.content,
                             inserted: videosView as HTMLDivElement,
                             attribute: 'closed'});
})()









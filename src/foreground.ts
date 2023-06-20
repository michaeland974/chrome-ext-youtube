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
    {id: 'toggle-videos-view', tag: 'button', text: 'Homepage Videos'}
  ]);
  const [wrapper, toggle] = Factory.elements;
  
  const YouTubeDOM = new DOMSelect
    (Shorts, Grid, {header: GuideHeader, content: GuideContent}, PrimaryContent);
  const { header, content }= YouTubeDOM.elements.guide;
    if(header){
      const [ navIcon, youtubeIcon ] = [...header.children];
      wrapper.append(navIcon, youtubeIcon);
      header.append(wrapper, toggle);
    }
})()









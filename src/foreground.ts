import { DOMSelect } from './classes/DOMSelect';
import { DOMManipulate } from './classes/DOMManipulate';
import { YoutubeSelector } from './interfaces/foreground';
import { waitForElement, } from './scripts';

const Shorts: YoutubeSelector = {
  selector: '#contents #content #dismissible',
  childrenSelector: '#content'
}
const Grid: YoutubeSelector = {
  selector: '#contents',
  childrenSelector: '#contents'
}
const PrimaryContent: Omit<YoutubeSelector, 'childrenSelector'> = {
  selector: '#contents'
}
const Guide: Omit<YoutubeSelector, 'childrenSelector'> = {
  selector: '#guide-content'
}
const GuideHeader: YoutubeSelector = {
  selector: Guide.selector, 
  childrenSelector: '#header'
}
const GuideContent: YoutubeSelector = {
  selector: Guide.selector,
  childrenSelector: '#guide-inner-content'
}
const GuideButton: YoutubeSelector = {
  selector: '#guide-button',
  childrenSelector: '#button'
}
const ChipBar: Omit<YoutubeSelector, 'childrenSelector'> = {
  selector: '#chips'
};

(async () => {
  const Factory = new DOMManipulate([
    {id: 'header-wrapper', tag: 'div'}, 
    {id: 'toggle-videos-view', tag: 'button', text: 'Homepage Videos'},
    {id: 'videos-view', tag: 'div', attribute: 'closed'},
    {id: 'refresh-message', tag: 'div', text: 'Refresh the page',}
  ]);
  const YouTubeDOM = new DOMSelect(
    Shorts, Grid, PrimaryContent, ChipBar, {header: GuideHeader, 
                                            content: GuideContent, 
                                            button: GuideButton}, 
  );
  const {guide, chipBar} = YouTubeDOM.elements;
  const {grid} = YouTubeDOM.parentElements;
   
  if(guide && guide.button && guide.content && guide.header){      
    const [navIcon, youtubeIcon] = [...(guide.header).children];
    const [wrapper, toggleView, videosView, refresh] = Factory.elements;
      try{
        await waitForElement(grid);
        YouTubeDOM.setAttribute([grid, chipBar], 'invisible');
      } catch(error) {}

    Factory.toggleOnClick({
      target: toggleView as HTMLButtonElement, 
      displayChange: guide.content,
      inserted: videosView,
      attribute: 'closed'
    });
    Factory.appendOnClick({ 
      target: guide.button, 
      inserted: grid ?? refresh,
      attribute: 'invisible',
      appendTo: videosView
    });

    wrapper.append(navIcon, youtubeIcon);
    (guide.header).append(wrapper, toggleView);
    (guide.content).append(videosView);
  }
  
})();









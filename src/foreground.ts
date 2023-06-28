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
const InputBar: Omit<YoutubeSelector, 'childrenSelector'> = {
  selector: '#center'
}; 
const Logo: Omit<YoutubeSelector, 'childrenSelector'> = {
  selector: '#logo-icon'
};

(async () => {
  const Factory = new DOMManipulate([
    {id: 'header-wrapper', tag: 'div'}, 
    {id: 'toggle-videos-view', tag: 'button', text: 'Homepage Videos'},
    {id: 'videos-view', tag: 'div', attribute: 'closed'},
    {id: 'refresh-message', tag: 'div', text: 'Refresh the page'},
  ]);
  const YouTubeDOM = new DOMSelect(
    Shorts, Grid, PrimaryContent, ChipBar, InputBar, Logo,
    {header: GuideHeader, content: GuideContent, button: GuideButton}, 
  );
  const {guide, chipBar, logo, inputBar} = YouTubeDOM.elements;
  const {grid} = YouTubeDOM.parentElements
   
  if(guide && guide.button && guide.content && guide.header && logo){      
    const [navIcon, youtubeIcon] = [...(guide.header).children];
    const [headerWrapper, toggleView, videosView, refresh] = Factory.elements;
      try{
        await waitForElement(grid);
        // YouTubeDOM.setAttribute([logo, inputBar], 'center')
        YouTubeDOM.setAttribute([grid, chipBar], 'invisible');
      } catch(error) {}
    
    Factory.toggleOnClick({
      target: toggleView as HTMLButtonElement, 
      displayChange: guide.content,
      inserted: videosView,
      attribute: 'closed',
      callback: () => YouTubeDOM.videos()
    });
    Factory.appendOnClick({ 
      target: guide.button, 
      inserted: YouTubeDOM.videos().grid as HTMLElement[] ?? refresh,//
      attribute: 'invisible',
      appendTo: videosView
    });

    headerWrapper.append(navIcon, youtubeIcon);
    (guide.header).append(headerWrapper, toggleView);
    (guide.content).append(videosView);
  }
  
})();









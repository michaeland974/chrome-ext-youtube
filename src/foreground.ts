console.log("From foreground");

/*
chips id rendering on multiples pages
*/
const chipBar: HTMLElement | null = document.getElementById('chips');
const chips: HTMLCollection | undefined = chipBar?.children;

const gridVideos: HTMLElement | null = document.getElementById('contents');

const shortsSelector = '#contents > ytd-rich-section-renderer';
const shorts: HTMLElement | null = document.querySelector(shortsSelector);

const getVideoElements = (parent: HTMLElement | null, 
                          selector: string): Element[] | [] => {
  const videosContainer = parent?.querySelector(selector);
  const videos = videosContainer?.children;
  
  return (videos===undefined) ? [] : [...videos];                  
};










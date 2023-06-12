import { YoutubeElement, DOMManipulator } from "./classes/DOMManipulator"

const Shorts: YoutubeElement = {
  selector: '#contents #content #contents',
  childrenSelector: '#content'
}

const Grid: YoutubeElement = {
  selector: '#contents',
  childrenSelector: '#contents'
}

const chipBar: HTMLElement | null = document.getElementById('chips');
const chips: HTMLCollection | undefined = chipBar?.children;

const YouTubeDOM = new DOMManipulator(Shorts, Grid);


                     










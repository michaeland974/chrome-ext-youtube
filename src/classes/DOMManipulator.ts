export interface YoutubeElement {
  selector: string,
  childrenSelector: string
}

export class DOMManipulator{
  constructor(
    public readonly Shorts: YoutubeElement,
    public readonly Grid: YoutubeElement
    ) {
    this.getVideos = this.getVideos.bind(this);
  }

  private getVideos (parent: HTMLElement | null, 
                     selector: string): Element[] | [] {
    const videos = parent?.querySelectorAll(selector);
    return (videos===undefined) ? [] : [...videos];  
  }

  parentElements: Record<string, HTMLElement | null> = {
    shorts: document.querySelector(this.Shorts.selector),
    grid: document.querySelector(this.Grid.selector)
  }

  videos = {
    shorts: this.getVideos(this.parentElements.shorts, 
                           this.Shorts.childrenSelector),
    grid: this.getVideos(this.parentElements.grid, 
                         this.Grid.childrenSelector)
  }
}
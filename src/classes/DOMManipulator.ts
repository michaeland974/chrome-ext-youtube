export interface YoutubeElement {
  selector: string,
  childrenSelector: string
}

export class DOMManipulator{
  constructor(
    public Shorts: YoutubeElement,
    public Grid: YoutubeElement,
    public GuideHeader: YoutubeElement,
    public PrimaryContent: Omit<YoutubeElement, 'childrenSelector'>
  ) {}

  elements: Record<string, HTMLElement | null> = {
    primary: document.querySelector(this.PrimaryContent.selector)
  }

  parentElements: Record<string, HTMLElement | null> = {
    shorts: document.querySelector(this.Shorts.selector),
    grid: document.querySelector(this.Grid.selector),
    header: document.querySelector
      (`${this.GuideHeader.selector} > ${this.GuideHeader.childrenSelector}`)
  }

  private getVideos (parent: HTMLElement | null, 
                     selector: string): Element[] | [] {
    const videos = parent?.querySelectorAll(selector);
    return (videos===undefined) ? [] : [...videos];  
  }

  public videos() {
    return {
      shorts: this.getVideos(this.parentElements.shorts, 
                             this.Shorts.childrenSelector),
      grid: this.getVideos(this.parentElements.grid, 
                           this.Grid.childrenSelector)
    }
  }
}
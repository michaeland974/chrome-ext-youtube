import { YoutubeElement } from "../interfaces/interfaces";

export class DOMSelect{
  constructor(
    public Shorts: YoutubeElement,
    public Grid: YoutubeElement,
    public Guide: {
      header: YoutubeElement,
      content: YoutubeElement
    },
    public PrimaryContent: Omit<YoutubeElement, 'childrenSelector'>
  ) {}

  elements = {
    primary: document.querySelector(this.PrimaryContent.selector),
    guide: {
      header: document.querySelector
        (`${this.Guide.header.selector} > ${this.Guide.header.childrenSelector}`) as HTMLDivElement,
      content: document.querySelector
        (`${this.Guide.content.selector} > ${this.Guide.content.childrenSelector}`) as HTMLDivElement
    }
  }

  parentElements: Record<string, HTMLElement | null> = {
    shorts: document.querySelector(this.Shorts.selector),
    grid: document.querySelector(this.Grid.selector),
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
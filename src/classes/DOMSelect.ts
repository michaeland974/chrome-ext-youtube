import { YoutubeSelector, YoutubeElementWithNullable, GuideElement } from "../interfaces/foreground";

export class DOMSelect{
  constructor(
    public Shorts: YoutubeSelector,
    public Grid: YoutubeSelector,
    public PrimaryContent: Omit<YoutubeSelector, 'childrenSelector'>,
    public ChipBar: Omit<YoutubeSelector, 'childrenSelector'>,
    public Guide: Record<keyof GuideElement, YoutubeSelector>
  ) {}

  elements: Pick<YoutubeElementWithNullable, 'primary' | 'guide' | 'chipBar'> = {
    primary: document.querySelector(this.PrimaryContent.selector),
    chipBar: document.querySelector(this.ChipBar.selector),
    guide: {
      header: document.querySelector
        (`${this.Guide.header.selector} > ${this.Guide.header.childrenSelector}`),
      content: document.querySelector
        (`${this.Guide.content.selector} > ${this.Guide.content.childrenSelector}`),
      button: document.querySelector
        (`${this.Guide.button.selector} > ${this.Guide.button.childrenSelector}`)
    }
  }

  parentElements: Pick<YoutubeElementWithNullable, 'shorts' | 'grid'> = {
    shorts: document.querySelector(this.Shorts.selector),
    grid: document.querySelector(this.Grid.selector),
  }

  private getVideos (parent: HTMLElement | null, 
                     selector: string): Element[] | [] {
    const videos = parent?.querySelectorAll(selector);
    return (videos===undefined) ? [] : [...videos];  
  }

  public videos(){
    return{ shorts: this.getVideos(this.parentElements.shorts, this.Shorts.childrenSelector),
            grid: this.getVideos(this.parentElements.grid, this.Grid.childrenSelector) }
  }

  public setAttribute(elements: (HTMLElement | null)[],
                      attribute: string){
    return elements?.forEach((el) => {
      if(el) el.setAttribute(attribute, '')});
  }
}
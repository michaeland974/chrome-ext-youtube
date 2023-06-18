export interface YoutubeElement {
  selector: string,
  childrenSelector: string
}

export interface NewElement {
  id: string, 
  tag: keyof HTMLElementTagNameMap,
  text?: string
}
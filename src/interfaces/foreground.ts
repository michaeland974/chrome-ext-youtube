export interface YoutubeSelector {
  selector: string,
  childrenSelector: string
}

export interface NewElement{
  id: string, 
  tag: keyof HTMLElementTagNameMap,
  text?: string
  attribute?: string
}

type WithNull<T> = {
  [K in keyof T]: T[K] | null;
}

export type GuideElement = {
  header: HTMLDivElement, 
  content: HTMLDivElement,
  button: HTMLButtonElement
}

export type YoutubeElement = {
  primary: HTMLDivElement,
  chipBar: HTMLElement,
  inputBar: HTMLElement,
  logo: HTMLElement,
  guide: WithNull<GuideElement>,
  shorts: HTMLElement,
  grid: HTMLElement
}

export type YoutubeElementWithNullable = WithNull<YoutubeElement>;

export type EventListener = {
  target: HTMLButtonElement, 
  displayChange?: HTMLDivElement, 
  inserted?: HTMLElement | HTMLElement[], 
  attribute?: string, 
  appendTo?: HTMLElement,
  callback?: () => void
}

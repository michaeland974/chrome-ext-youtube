import { NewElement } from "../interfaces/interfaces";

export class DOMManipulate{
  constructor(
    public NewElements: NewElement[]
  ) {}

  private createElements(elements: NewElement[]): HTMLElement[] {
    return (
      elements.map((el) => {
        const element = document.createElement(el['tag']);
        element.id = el['id'];
        element.setAttribute('chrome-ext', 'true');   
        el['text'] !== undefined ?
          element.textContent = el['text'] : 
          element.textContent = '';
        return element;
      })
    ) 
  };

  elements = this.createElements(this.NewElements);

  public addListener(listener: { target: HTMLElement, 
                                 display: HTMLDivElement }){
    const {target, display} = listener;
    target.addEventListener('click', () => {
      display.toggleAttribute('is-closed');
    })                    
  }
}
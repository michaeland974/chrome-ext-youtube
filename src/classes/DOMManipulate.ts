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
        element.setAttribute('chrome-ext', '');   
          if(el['text']) element.textContent = el['text'];
          if(el['attribute']) element.setAttribute(el['attribute'], '');
        return element;
      })
    ) 
  };

  elements = this.createElements(this.NewElements);

  public addToggleListener(listener: {target: HTMLButtonElement, 
                                      displayChange: HTMLDivElement,
                                      inserted: HTMLDivElement,
                                      attribute: string }){
    const {target, displayChange, inserted, attribute} = listener;    
    target.addEventListener('click', () => {
      displayChange.toggleAttribute(attribute);
      inserted.toggleAttribute(attribute);
    })                    
  }
}
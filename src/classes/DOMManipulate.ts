import { NewElement, EventListener } from "../interfaces/foreground";

export class DOMManipulate{
  constructor(
    public NewElements: NewElement[]
  ) {}

  private createElements(elements: NewElement[]): HTMLElement[] {
    return (
      elements.map((el) => {
        const element = document.createElement(el['tag']);
        element.id = el['id'];
          if(el['text']) element.textContent = el['text'];
          if(el['attribute']) element.setAttribute(el['attribute'], '');
        return element;
      })
    ) 
  };

  elements = this.createElements(this.NewElements);

  public toggleOnClick(listener: EventListener){
    const {target, displayChange, inserted, attribute} = listener; 
    if(displayChange && attribute && inserted){
      target.addEventListener('click', () => {
        displayChange.toggleAttribute(attribute);
        inserted.toggleAttribute(attribute);
      })                    
    }   
  }

  public appendOnClick(listener: EventListener){
    const {target, appendTo, inserted, attribute} = listener;
    if(appendTo && inserted && attribute){
      target.addEventListener('click', () => {
        inserted.removeAttribute(attribute);
        appendTo.append(inserted);
      })
    }
  }
}
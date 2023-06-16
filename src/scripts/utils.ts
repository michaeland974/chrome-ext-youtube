type NewElement = {
  id: string, 
  tag: keyof HTMLElementTagNameMap
}

export function createElements(elements: NewElement[]) {
  let newElements: HTMLElement[] = [];
  
  elements.forEach((el) => {
    const newElement = document.createElement(el['tag']);
      newElement.id = el['id'];
    newElements.push(newElement);
  })
  return newElements;                           
}

export function setAttributes(elements: HTMLElement[]): void{
  elements.forEach((el) => el.setAttribute('chrome-ext', 'true'));
}


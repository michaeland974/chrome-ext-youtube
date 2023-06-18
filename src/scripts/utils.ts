interface NewElement {
  id: string, 
  tag: keyof HTMLElementTagNameMap,
  text?: string
}

export function createElements(elements: NewElement[]): HTMLElement[] {
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


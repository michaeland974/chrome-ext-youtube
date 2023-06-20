export function waitForElement(element: HTMLElement | null): Promise<boolean> {
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      if (element) {
        resolve(true);
        observer.disconnect();
      }
    });
    if(element){
      resolve(true);
    }
    else{
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  });
};


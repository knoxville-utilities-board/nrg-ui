export function scrollTo(elementOrSelector: HTMLElement | string) {
  let element: HTMLElement;

  if (typeof elementOrSelector === 'string') {
    element = document.querySelector(elementOrSelector) as HTMLElement;
    if (!element) {
      return;
    }
  } else {
    element = elementOrSelector;
  }

  element.scrollIntoView({
    behavior: 'auto',
    block: 'start',
  });
}

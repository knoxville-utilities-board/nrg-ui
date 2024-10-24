function scrollTo(elementOrSelector) {
  let element;
  if (typeof elementOrSelector === 'string') {
    element = document.querySelector(elementOrSelector);
    if (!element) {
      return;
    }
  } else {
    element = elementOrSelector;
  }
  element.scrollIntoView({
    behavior: 'auto',
    block: 'start'
  });
}

export { scrollTo };
//# sourceMappingURL=dom.js.map

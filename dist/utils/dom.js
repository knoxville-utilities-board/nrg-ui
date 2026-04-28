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
function getRemValue() {
  const rootFontSize = getComputedStyle(document.documentElement).fontSize;
  return parseFloat(rootFontSize);
}
var dom = {
  scrollTo,
  getRemValue
};

export { dom as default, getRemValue, scrollTo };
//# sourceMappingURL=dom.js.map

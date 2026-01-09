function collapseWhitespace(string) {
  return string.replace(/[\t\r\n]/g, ' ').replace(/ +/g, ' ').replace(/^ /, '').replace(/ $/, '');
}
var string = {
  collapseWhitespace
};

export { collapseWhitespace, string as default };
//# sourceMappingURL=string.js.map

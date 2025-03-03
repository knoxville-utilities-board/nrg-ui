function collapseWhitespace(string) {
  return string.replace(/[\t\r\n]/g, ' ').replace(/ +/g, ' ').replace(/^ /, '').replace(/ $/, '');
}

export { collapseWhitespace };
//# sourceMappingURL=string.js.map

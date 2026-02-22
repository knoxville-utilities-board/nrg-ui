import Helper from '@ember/component/helper';

function classes(...args) {
  const classes = args.filter(Boolean);
  return classes.join(' ');
}
class Classes extends Helper {
  compute(positional) {
    return classes(positional);
  }
}

export { classes, Classes as default };
//# sourceMappingURL=classes.js.map

function ensurePathExists(object, path) {
  const keys = path.split?.('.');
  ensure(object, keys);
}
function ensure(object, keys) {
  const key = keys?.[0];
  const nextKey = keys?.[1];
  if (!key || !nextKey) {
    return;
  }
  if (typeof object[key] === 'undefined') {
    const index = parseInt(nextKey);
    const isArray = Number.isInteger(index);
    if (isArray) {
      const newArray = [];
      newArray[index] = {};
      object[key] = newArray;
      ensure(object[key][index], keys.slice(2));
      return;
    }
    object[key] = {};
  }
  ensure(object[key], keys.slice(1));
}
var ensurePathExists_default = {
  ensurePathExists
};

export { ensurePathExists_default as default, ensurePathExists };
//# sourceMappingURL=ensure-path-exists.js.map

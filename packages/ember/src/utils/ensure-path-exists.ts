export function ensurePathExists<
  Model extends object = Record<string, unknown>,
>(object: Model, path: string) {
  const keys = path.split('.');
  ensure(object, keys);
}

function ensure<Model extends object = Record<string, unknown>>(
  object: Model,
  keys: string[],
) {
  const key = keys[0];
  const nextKey = keys[1];

  if (!key || !nextKey) {
    return;
  }

  // @ts-expect-error - Type checking is hard with these generics
  if (typeof object[key] === 'undefined') {
    const index = parseInt(nextKey);
    const isArray = Number.isInteger(index);

    if (isArray) {
      const newArray = [];
      newArray[index] = {};
      // @ts-expect-error - See above
      object[key] = newArray;
      ensure(
        // @ts-expect-error - See above
        (object[key] as unknown[])[index] as Record<string, unknown>,
        keys.slice(2),
      );
      return;
    }

    // @ts-expect-error - See above
    object[key] = {};
  }

  // @ts-expect-error - See above
  ensure(object[key] as Record<string, unknown>, keys.slice(1));
}

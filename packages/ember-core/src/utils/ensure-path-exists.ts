export function ensurePathExists(
  object: Record<string, unknown>,
  path: string,
) {
  const keys = path.split?.('.');
  ensure(object, keys);
}

function ensure(object: Record<string, unknown>, keys: string[]) {
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
      ensure(
        (object[key] as unknown[])[index] as Record<string, unknown>,
        keys.slice(2),
      );
      return;
    }

    object[key] = {};
  }

  ensure(object[key] as Record<string, unknown>, keys.slice(1));
}

export default {
  ensurePathExists,
};

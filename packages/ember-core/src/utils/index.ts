export function uid() {
  return Math.random().toString(36).substring(2);
}

export function guid() {
  return crypto.randomUUID();
}

/**
 * Returns the difference between two arrays.
 * @param a The first array.
 * @param b The second array.
 *
 * @returns A tuple containing the elements in `a` that are not in `b` and the elements in `b` that are not in `a`.
 */
export function diff<T>(a: T[], b: T[]): [T[], T[]] {
  const clonedA = new Set(a);
  const clonedB = new Set(b);

  const inANotB = [];
  const inBNotA = [];

  for (const item of a) {
    if (clonedB.delete(item)) {
      continue;
    }
    inANotB.push(item);
  }

  for (const item of b) {
    if (clonedA.delete(item)) {
      continue;
    }
    inBNotA.push(item);
  }

  return [inANotB, inBNotA];
}

export default {
  uid,
  guid,
  diff,
};

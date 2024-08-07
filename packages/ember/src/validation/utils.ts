import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';

export function isProxy(
  value: unknown,
): value is ObjectProxy | ArrayProxy<never> {
  return value instanceof ObjectProxy || value instanceof ArrayProxy;
}

export function unwrapProxy<T>(value: T): T {
  if (isProxy(value)) {
    return unwrapProxy(value.content as T);
  }

  return value;
}

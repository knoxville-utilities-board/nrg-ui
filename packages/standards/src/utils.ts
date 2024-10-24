import { readFileSync } from 'fs';

import logger from './logging.js';

export async function load(dep: string) {
  try {
    const module = await import(dep);

    return module.default;
  } catch (e) {
    logger.debug(e);
    logger.missingRequired(dep);
  }
}

export function getDependenciesFromPackage(
  path: string,
): Record<string, string> {
  const packageJson = JSON.parse(readFileSync(path, 'utf-8'));

  return {
    ...packageJson?.dependencies,
    ...packageJson?.devDependencies,
  };
}

export async function merge<T>(
  ...objects: T[] | Promise<T>[] | Promise<T[]>[]
): Promise<T[]> {
  const flat = ([] as T[] | Promise<T>[] | Promise<T[]>[]).concat(...objects);

  const flatObjects = await Promise.all(flat.flat());

  return flatObjects.flat() as T[];
}

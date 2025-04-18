import { ExecaError, execa } from 'execa';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import logger from './logging.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Package = Record<string, any>;

export async function load(dep: string) {
  try {
    const module = await import(dep);

    return module.default;
  } catch (e) {
    logger.debug(e);
    logger.missingRequired(dep);
  }
}

const pkgCache = new Map<string, Package>();

export function getPackageFile(
  path: string = 'package.json',
  ignoreCache: boolean = false,
): Package {
  path = resolve(path);

  if (pkgCache.has(path) && !ignoreCache) {
    return pkgCache.get(path)!;
  }

  const packageJson = JSON.parse(readFileSync(path, 'utf-8'));

  pkgCache.set(path, packageJson);

  return packageJson;
}

export function getDependenciesFromPackage(
  path: string = 'package.json',
): Record<string, string> {
  const pkg = getPackageFile(path);

  const dependencies = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  return dependencies;
}

export async function format(...files: string[]) {
  files = files.map((file) => resolve(file));

  logger.debug(`Formatting ${files.join(', ')}`);

  await exec('prettier', '--write', ...files);
}

export async function exec(command: string, ...args: string[]) {
  try {
    await execa(command, args);
  } catch (e) {
    const whitespace = /\s/;
    const fullCommand =
      command +
      ' ' +
      args.map((a) => (whitespace.test(a) ? `'${a}'` : a)).join(' ');
    logger.debug(e);
    let errorMessage = 'Command failed';
    if (e instanceof ExecaError) {
      errorMessage += ` with exit code [${e.exitCode ?? 'unknown'}]`;
    }
    errorMessage += `: ${fullCommand}`;
    logger.error(errorMessage);
  }
}

export async function merge<T>(
  ...objects: T[] | Promise<T>[] | Promise<T[]>[]
): Promise<T[]> {
  const flat = ([] as T[] | Promise<T>[] | Promise<T[]>[]).concat(...objects);

  const flatObjects = await Promise.all(flat.flat());

  return flatObjects.flat() as T[];
}

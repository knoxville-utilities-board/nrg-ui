import { ExecaError, execa } from 'execa';
import { readFileSync } from 'fs';
import { resolve } from 'path';
export const PATH_SEP = process.platform === 'win32' ? ';' : ':';
export const NODE_BIN_PATH = resolve(process.cwd(), 'node_modules', '.bin');
import logger from './logging.js';
export async function load(dep) {
    try {
        const module = await import(dep);
        return module.default;
    }
    catch (e) {
        logger.debug(e);
        logger.missingRequired(dep);
    }
}
const pkgCache = new Map();
export function getPackageFile(path = 'package.json', ignoreCache = false) {
    path = resolve(path);
    if (pkgCache.has(path) && !ignoreCache) {
        return pkgCache.get(path);
    }
    const packageJson = JSON.parse(readFileSync(path, 'utf-8'));
    pkgCache.set(path, packageJson);
    return packageJson;
}
export function getDependenciesFromPackage(path = 'package.json') {
    const pkg = getPackageFile(path);
    const dependencies = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
    };
    return dependencies;
}
export async function format(...files) {
    files = files.map((file) => resolve(file));
    logger.debug(`Formatting ${files.join(', ')}`);
    await exec('prettier', '--write', ...files);
}
export async function exec(command, ...args) {
    try {
        await execa(command, args, {
            env: {
                PATH: NODE_BIN_PATH + PATH_SEP + process.env.PATH,
            },
        });
    }
    catch (e) {
        const whitespace = /\s/;
        const fullCommand = command + ' ' + args.map((a) => (whitespace.test(a) ? `'${a}'` : a)).join(' ');
        logger.debug(e);
        let errorMessage = 'Command failed';
        if (e instanceof ExecaError) {
            errorMessage += ` with exit code [${e.exitCode ?? 'unknown'}]`;
        }
        errorMessage += `: ${fullCommand}`;
        logger.error(errorMessage);
    }
}
export async function merge(...objects) {
    const flat = [].concat(...objects);
    const flatObjects = await Promise.all(flat.flat());
    return flatObjects.flat();
}

import { ExecaError, execa } from 'execa';
import { findUpSync } from 'find-up';
import { dirname } from 'path';
import { cwd } from 'process';
import { coerce, gte, satisfies } from 'semver';
import logger from '../../logging.js';
import { getDependenciesFromPackage, getPackageFile } from '../../utils.js';
const commands = {
    add: {
        pnpm: 'add',
        yarn: 'add',
        npm: 'add',
    },
    install: {
        pnpm: 'install',
        yarn: 'install',
        npm: 'install',
    },
    update: {
        pnpm: 'update',
        yarn: 'upgrade',
        npm: 'update',
    },
    uninstall: {
        pnpm: 'uninstall',
        yarn: 'remove',
        npm: 'uninstall',
    },
};
export const compatibility = {
    'eslint-plugin-decorator-position': '^6.0.0',
    'eslint-plugin-ember': '^12.3.0',
    'eslint-plugin-import': '^2.31.0',
    'eslint-plugin-n': '^17.0.0',
    'eslint-plugin-qunit': '^8.1.2',
    'typescript-eslint': '^8.0.0',
};
let packageManager = false;
export function detectPackageManager() {
    if (packageManager) {
        return packageManager;
    }
    const stopAt = dirname(cwd());
    let detected = false;
    if (findUpSync('pnpm-lock.yaml', { stopAt })) {
        detected = 'pnpm';
    }
    else if (findUpSync('yarn.lock', { stopAt })) {
        detected = 'yarn';
    }
    else if (findUpSync('package-lock.json', { stopAt })) {
        detected = 'npm';
    }
    if (detected) {
        packageManager = detected;
        return detected;
    }
    return logger.error('Package manager could not be detected. Make sure you are in the root of a project with a package.json file, and that dependencies are installed.');
}
export function hasDependency(dep) {
    const dependencies = getDependenciesFromPackage();
    return dep in dependencies;
}
export function getVersion(dep) {
    const dependencies = getDependenciesFromPackage();
    return coerce(dependencies[dep]);
}
export async function installMany(deps) {
    const depEntries = Object.entries(deps);
    if (!depEntries.length) {
        logger.debug('No dependency specified, installing all dependencies');
        await run('install', '--ignore-scripts');
        return;
    }
    const args = depEntries
        .map(([dep, version]) => {
        const currentVersion = getVersion(dep);
        if (version && satisfies(currentVersion, version)) {
            logger.debug(`Dependency '${dep}' satisfies the minimum version ${version}`);
            return;
        }
        if (!version) {
            logger.debug(`No version specified for '${dep}', installing latest`);
            version = 'latest';
        }
        const arg = `${dep}@${version}`;
        logger.info(`Installing '${arg}'`);
        return arg;
    })
        .filter(Boolean);
    if (!args.length) {
        logger.debug('All dependencies are up to date, skipping installation');
        return;
    }
    // Yarn uses `--dev` while npm and pnpm use `--save-dev`
    await run('add', '--ignore-scripts', ...args, '-D');
    // Refresh cached package.json
    getPackageFile('package.json', true);
}
export async function install(dep, version) {
    if (!dep) {
        logger.debug('No dependency specified, installing all dependencies');
        await run('install', '--ignore-scripts');
        return;
    }
    if (dep in compatibility) {
        version = version ?? compatibility[dep];
    }
    if (hasDependency(dep)) {
        return;
    }
    const currentVersion = getVersion(dep);
    if (version && satisfies(currentVersion, version)) {
        logger.debug(`Dependency '${dep}' satisfies the minimum version ${version}`);
        return;
    }
    if (!version) {
        logger.debug(`No version specified for '${dep}', installing latest`);
        version = 'latest';
    }
    const arg = `${dep}@${version}`;
    logger.info(`Installing '${arg}'`);
    // Yarn uses `--dev` while npm and pnpm use `--save-dev`
    await run('add', '--ignore-scripts', arg, '-D');
    // Refresh cached package.json
    getPackageFile('package.json', true);
}
export async function update(dep, version, force) {
    if (dep in compatibility) {
        version = version ?? compatibility[dep];
    }
    if (!version) {
        logger.debug(`No version specified for '${dep}'`);
        return false;
    }
    if (!hasDependency(dep)) {
        return false;
    }
    const currentVersion = coerce(getVersion(dep));
    if (satisfies(currentVersion, version) || gte(currentVersion, coerce(version))) {
        logger.debug(`Dependency '${dep}@${currentVersion}' satisfies the minimum version ${version}`);
        if (!force) {
            return true;
        }
    }
    logger.info(`Updating '${dep}' to ${version}`);
    await run('update', '--ignore-scripts', `${dep}@${version}`);
    // Refresh cached package.json
    getPackageFile('package.json', true);
    return true;
}
export async function uninstall(...deps) {
    const toUninstall = [];
    for (const dep of deps) {
        if (!hasDependency(dep)) {
            logger.debug(`Dependency '${dep}' not found, skipping`);
            continue;
        }
        toUninstall.push(dep);
    }
    if (!toUninstall.length) {
        logger.debug('No dependencies specified, uninstalling nothing');
        return;
    }
    logger.info(`Uninstalling ${toUninstall.join(', ')}`);
    await run('uninstall', ...toUninstall);
    // Refresh cached package.json
    getPackageFile('package.json', true);
}
async function run(subcommand, ...args) {
    args = args.filter(Boolean).map(String);
    const manager = detectPackageManager();
    args = [commands[subcommand][manager], ...args];
    const command = `${manager} ${args.map((a) => "'" + a + "'").join(' ')}`;
    try {
        await execa(manager, args);
    }
    catch (e) {
        logger.debug(e);
        let errorMessage = 'Command failed';
        if (e instanceof ExecaError) {
            errorMessage += ` with exit code [${e.exitCode ?? 'unknown'}]`;
        }
        errorMessage += `: ${command}`;
        logger.error(errorMessage);
    }
}

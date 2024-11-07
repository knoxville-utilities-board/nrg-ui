import { ExecaError, execa } from 'execa';
import { findUpSync } from 'find-up';
import { coerce, gte, satisfies } from 'semver';

import logger from '../../logging.js';
import { getDependenciesFromPackage, getPackageFile } from '../../utils.js';

type PackageManager = 'pnpm' | 'yarn' | 'npm';

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

export const compatibility: Record<string, string> = {
  'eslint-plugin-decorator-position': '^5.0.2',
  'eslint-plugin-ember': '^12.2.0',
  'eslint-plugin-import': '^2.31.0',
  'eslint-plugin-n': '^16.0.0',
  'eslint-plugin-qunit': '8.1.2',
};

let packageManager: PackageManager | false = false;

export function detectPackageManager(): PackageManager | never {
  if (packageManager) {
    return packageManager;
  }

  let detected: PackageManager | false = false;
  if (findUpSync('pnpm-lock.yaml')) {
    detected = 'pnpm';
  }

  if (findUpSync('yarn.lock')) {
    detected = 'yarn';
  }

  if (findUpSync('package-lock.json')) {
    detected = 'npm';
  }

  if (detected) {
    packageManager = detected;
    return detected;
  }

  return logger.error(
    'Package manager could not be detected. Make sure you are in the root of a project with a package.json file, and that dependencies are installed.',
  );
}

export function hasDependency(dep: string): boolean {
  const dependencies = getDependenciesFromPackage();

  return dep in dependencies;
}

export function getVersion(dep: string): string | undefined {
  const dependencies = getDependenciesFromPackage();

  return dependencies[dep];
}

export async function installMany(deps: { [dep: string]: string | undefined }) {
  const depEntries = Object.entries(deps);

  if (!depEntries.length) {
    logger.debug('No dependency specified, installing all dependencies');

    await run('install', '--ignore-scripts');
    return;
  }

  const args = depEntries.map(([dep, version]) => {
    const currentVersion = getVersion(dep)!;
    if (version && satisfies(currentVersion, version)) {
      logger.debug(
        `Dependency '${dep}' satisfies the minimum version ${version}`,
      );
      return;
    }

    if (!version) {
      logger.debug(`No version specified for '${dep}', installing latest`);
      version = 'latest';
    }

    const arg = `${dep}@${version}`;

    logger.info(`Installing '${arg}'`);

    return arg;
  }).filter(Boolean) as string[];

  // Yarn uses `--dev` while npm and pnpm use `--save-dev`
  await run('add', '--ignore-scripts', ...args, '-D');

  // Refresh cached package.json
  getPackageFile('package.json', true);
}

export async function install(dep?: string, version?: string) {
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

  const currentVersion = getVersion(dep)!;
  if (version && satisfies(currentVersion, version)) {
    logger.debug(
      `Dependency '${dep}' satisfies the minimum version ${version}`,
    );
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

export async function update(dep: string, version?: string, force?: boolean) {
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

  const currentVersion = coerce(getVersion(dep))!;
  if (
    satisfies(currentVersion, version) ||
    gte(currentVersion, coerce(version)!)
  ) {
    logger.debug(
      `Dependency '${dep}@${currentVersion}' satisfies the minimum version ${version}`,
    );

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

export async function uninstall(...deps: string[]) {
  const toUninstall: string[] = [];

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

async function run(subcommand: keyof typeof commands, ...args: string[]) {
  args = args.filter(Boolean).map(String);

  const manager = detectPackageManager();

  args = [commands[subcommand][manager], ...args];

  const command = `${manager} ${args.map((a) => "'" + a + "'").join(' ')}`;

  try {
    await execa(manager, args);
  } catch (e) {
    logger.debug(e);
    let errorMessage = 'Command failed';
    if (e instanceof ExecaError) {
      errorMessage += ` with exit code [${e.exitCode ?? 'unknown'}]`;
    }
    errorMessage += `: ${command}`;
    logger.error(errorMessage);
  }
}

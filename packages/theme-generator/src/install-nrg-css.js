import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { coerce, gte } from 'semver';

export function getPackageFile() {
  return JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));
}

export function getDependenciesFromPackage() {
  const pkg = getPackageFile();

  const dependencies = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  return dependencies;
}

export default async function () {
  if (!existsSync('package.json')) {
    console.error(
      'No package file found. Please run this command in a directory with a package.json file.'
    );
  }

  console.debug('Checking dependencies in package.json');

  const dependencies = getDependenciesFromPackage();
  const nrgVersion = dependencies['@nrg-ui/css'];

  if (!nrgVersion) {
    throw new Error(`'@nrg-ui/css' not found in package.json`);
  }

  const minAcceptableVersion = '0.8.0';
  try {
    const nrgVersionObject = coerce(nrgVersion);
    const versionObject = coerce(minAcceptableVersion);
    const isValidVersion = gte(nrgVersionObject.version, versionObject.version);
    if (!isValidVersion) {
      throw new Error(
        `'@nrg-ui/css' must be at least version ${minAcceptableVersion}`
      );
    }
  } catch (e) {
    throw new Error(`semver check failed: ${e}`);
  }

  const command = 'pnpm install --ignore-scripts';
  const WRITE_STDOUT = [null, 'inherit', null];
  try {
    execSync(command, {
      stdio: WRITE_STDOUT,
    });
  } catch (e) {
    throw new Error(`Command failed: ${command}`);
  }
}

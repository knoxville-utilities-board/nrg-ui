import chalk from 'chalk';
import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { coerce, gte, satisfies } from 'semver';
import fs from 'fs';

const NRG_CSS_PACKAGE = '@nrg-ui/css';
const NRG_CSS_VERSION_REQUIRED = '0.9.0';
const NODE_VERSION_REQUIRED = '20.11.0';

export function getPackageFile(fileHelper) {
  return JSON.parse(
    readFileSync(resolve(fileHelper.targetPackageJson), 'utf-8')
  );
}

export function getDependenciesFromPackage(fileHelper) {
  const pkg = getPackageFile(fileHelper);

  const dependencies = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  return dependencies;
}

export async function installNrgCss(fileHelper) {
  if (!existsSync(fileHelper.targetPackageJson)) {
    console.error(
      'No package file found. Please run this command in a directory with a package.json file.'
    );
  }

  const dependencies = getDependenciesFromPackage(fileHelper);
  const nrgVersion = dependencies[NRG_CSS_PACKAGE];

  if (!nrgVersion) {
    console.error(
      chalk.yellow(NRG_CSS_PACKAGE) +
        chalk.red(' is not found in package.json. Please use ') +
        chalk.yellow(`${NRG_CSS_PACKAGE} ${NRG_CSS_VERSION_REQUIRED}`) +
        chalk.red(' or later.')
    );
    process.exit(1);
  }

  const nrgVersionObject = coerce(nrgVersion);
  const versionObject = coerce(NRG_CSS_VERSION_REQUIRED);
  const isValidVersion = gte(nrgVersionObject.version, versionObject.version);
  if (!isValidVersion) {
    console.error(
      chalk.yellow(`${NRG_CSS_PACKAGE} ${nrgVersionObject.version}`) +
        chalk.red(' is not supported. Please use ') +
        chalk.yellow(`${NRG_CSS_PACKAGE} ${NRG_CSS_VERSION_REQUIRED}`) +
        chalk.red(' or later.')
    );
    process.exit(1);
  }

  const command = 'pnpm install --ignore-scripts';
  try {
    execSync(command);
  } catch (e) {
    console.error(
      chalk.yellow(command) + chalk.red(` failed with the following output:\n`)
    );
    console.error(chalk.white(e.stdout.toString()));
    process.exit(1);
  }
}

export function ensureNrgDirectoryExists(fileHelper) {
  const nrgDirectoryIsPresent = fs
    .statSync(fileHelper.nrgDirectory)
    .isDirectory();
  if (!nrgDirectoryIsPresent) {
    console.error(
      chalk.red('No ') +
        chalk.yellow('.nrg') +
        chalk.red(
          ' directory found. Please create this directory and add your theme '
        ) +
        chalk.yellow('.scss') +
        chalk.red(' files there.')
    );
    process.exit(1);
  }
}

export function checkNodeVersion() {
  const nodeVersion = process.version;

  if (!satisfies(nodeVersion, `>=${NODE_VERSION_REQUIRED}`)) {
    console.error(
      chalk.red('Node.js ') +
        chalk.yellow(nodeVersion) +
        chalk.red(' is not supported. Please use Node.js ') +
        chalk.yellow(`v${NODE_VERSION_REQUIRED}}`) +
        chalk.red(' or later.')
    );
    process.exit(1);
  }
}

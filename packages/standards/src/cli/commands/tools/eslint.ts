import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';

import logger from '../../../logging.js';
import {
  format,
  getDependenciesFromPackage,
  getPackageFile,
} from '../../../utils.js';
import {
  compatibility,
  hasDependency,
  install,
  installMany,
  uninstall,
  update,
} from '../../utils/dependencies.js';

const eslintCompatibility = '^8.21.0';

const configPath = 'eslint.config';

const configPaths = [
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.yaml',
  '.eslintrc.yml',
  '.eslintrc.json',
  `${configPath}.js`,
  `${configPath}.mjs`,
  `${configPath}.cjs`,
];

async function ensureInstallation() {
  if (!existsSync('package.json')) {
    logger.error(
      'No package file found. Please run this command in a directory with a package.json file.',
    );
  }

  logger.debug('Checking dependencies in package.json');

  const dependencies = getDependenciesFromPackage();
  const hasEslint = 'eslint' in dependencies;

  if (!hasEslint) {
    logger.debug('`eslint` not found in package.json, installing...');

    await install('eslint');
  } else {
    await update('eslint', eslintCompatibility);
  }
}

function getConfigFile(): string | undefined {
  for (const file of configPaths) {
    if (existsSync(file)) {
      logger.debug(`Found config file: ${file}`);

      return file;
    }
  }

  logger.debug('No config file found, checking package.json');

  const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

  if (pkg.eslintConfig) {
    logger.debug('Found config in package.json');

    return 'package.json';
  }
}

async function removeConfigFile() {
  const config = getConfigFile();
  if (!config) {
    return;
  }

  if (config !== 'package.json') {
    logger.debug(`Removing config file ${config}`);

    rmSync(config);

    return;
  }

  logger.debug('Removing config from package.json');

  const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
  delete pkg.eslintConfig;

  writeFileSync('package.json', JSON.stringify(pkg, null, 2));

  await format('package.json');
}

async function createNewConfigFile() {
  logger.debug('Creating config file');

  const hasTypescript = hasDependency('typescript');
  const ruleSets = new Map<string, unknown>();

  ruleSets.set('ignore', getIgnoredFiles());
  ruleSets.set('base', null);
  ruleSets.set('js', null);

  if (hasTypescript) {
    logger.debug('Found TypeScript, adding TypeScript rule sets');

    await handleTypescript();

    ruleSets.set('ts', null);
  }

  if (hasDependency('ember-template-imports')) {
    logger.debug('Found ember-template-lint, adding .gjs rule sets');

    ruleSets.set('gjs', null);

    if (hasTypescript) {
      logger.debug('  and .gts rule sets');
      ruleSets.set('gts', null);
    }
  }

  await addRuleSets(ruleSets);
}

async function handleTypescript() {
  const toUninstall: string[] = [];

  if (hasDependency('@typescript-eslint/eslint-plugin')) {
    logger.debug('Found legacy TypeScript ESLint plugin, removing...');

    toUninstall.push('@typescript-eslint/eslint-plugin');
  }
  if (hasDependency('@typescript-eslint/parser')) {
    logger.debug('Found legacy TypeScript ESLint parser, removing...');

    toUninstall.push('@typescript-eslint/parser');
  }

  await uninstall(...toUninstall);

  if (!hasDependency('typescript-eslint')) {
    logger.debug('Adding new TypeScript ESLint plugin and parser');

    await install('typescript-eslint');
  }
}

async function addRuleSets(ruleSets: Map<string, unknown>) {
  const extension = isESM() ? 'js' : 'mjs';
  const path = `${configPath}.${extension}`;
  let content =
    'import { eslint, merge } from "@nrg-ui/standards";\n\nexport default await merge(\n';

  for (const [ruleSet, options] of ruleSets.entries()) {
    content += `  eslint.rules.${ruleSet}(`;

    if (options) {
      content += JSON.stringify(options);
    }

    content += `),\n`;
  }

  content += ');\n';

  logger.debug(`Generated config:\n\n${content}`);
  logger.debug(`Writing to ${path}`);

  writeFileSync(path, content);

  await format(path);

  await installPlugins();
}

function isESM() {
  const pkg = getPackageFile();
  const isESM = pkg.type === 'module';

  logger.debug(`Determined package ${isESM ? 'is' : 'is not'} ESM`);

  return isESM;
}

async function installPlugins() {
  logger.debug('Installing plugins');

  const neededPlugins = detectNeededPlugins();
  await installMany(
    Object.fromEntries(
      neededPlugins.map((plugin) => [plugin, compatibility[plugin]]),
    ),
  );
}

function detectNeededPlugins(): string[] {
  const plugins = [
    'eslint-plugin-import',
    'eslint-plugin-decorator-position',
    'eslint-plugin-n',
  ];

  if (hasDependency('ember-source')) {
    plugins.push('eslint-plugin-ember');
  }

  if (hasDependency('typescript')) {
    plugins.push('typescript-eslint');
  }

  if (existsSync('tests')) {
    plugins.push('eslint-plugin-qunit');
  }

  return plugins;
}

function getIgnoredFiles(): string[] | null {
  const path = '.eslintignore';

  if (!existsSync(path)) {
    logger.debug(`No ${path} found`);

    return null;
  }

  const content = readFileSync(path, 'utf-8');
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith('#'));

  logger.debug(`Found ${lines.length} ignored files in ${path}`);
  logger.debug(`Ignored files:\n${lines.join('\n')}`);

  logger.debug(`Removing ${path}`);
  rmSync(path);

  return lines;
}

export async function migrate() {
  logger.info('Migrating ESLint configuration');

  await ensureInstallation();
  await removeConfigFile();
  await createNewConfigFile();

  logger.info('ESLint migration complete');
}

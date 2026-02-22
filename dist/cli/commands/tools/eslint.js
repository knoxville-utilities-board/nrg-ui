import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import logger from '../../../logging.js';
import { defaultJsIgnores, defaultTsIgnores } from '../../../tools/eslint.js';
import { format, getDependenciesFromPackage, getPackageFile } from '../../../utils.js';
import { getVersion } from '../../index.js';
import { compatibility, hasDependency, install, installMany, uninstall, update, } from '../../utils/dependencies.js';
const eslintCompatibility = '^9.0.0';
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
        logger.error('No package file found. Please run this command in a directory with a package.json file.');
    }
    logger.debug('Checking dependencies in package.json');
    const dependencies = getDependenciesFromPackage();
    const hasThisPackage = '@nrg-ui/standards' in dependencies;
    if (!hasThisPackage) {
        logger.debug('`@nrg-ui/standards` not found in package.json, installing...');
        await install('@nrg-ui/standards', `^${getVersion()}`);
    }
    const hasEslint = 'eslint' in dependencies;
    if (!hasEslint) {
        logger.debug('`eslint` not found in package.json, installing...');
        await install('eslint');
    }
    else {
        await update('eslint', eslintCompatibility);
    }
}
async function getConfigFile() {
    for (const file of configPaths) {
        if (existsSync(file)) {
            logger.debug(`Found config file: ${file}`);
            const config = { path: file };
            if (file.startsWith('eslint.config')) {
                config.content = (await import(resolve(file))).default;
            }
            return config;
        }
    }
    logger.debug('No config file found, checking package.json');
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
    if (pkg.eslintConfig) {
        logger.debug('Found config in package.json');
        return {
            path: 'package.json',
            content: pkg.eslintConfig,
        };
    }
}
async function removeConfigFile() {
    const config = await getConfigFile();
    if (!config) {
        return;
    }
    if (config.path !== 'package.json') {
        logger.debug(`Removing config file ${config.path}`);
        rmSync(config.path);
        return config.content;
    }
    logger.debug('Removing config from package.json');
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
    delete pkg.eslintConfig;
    writeFileSync('package.json', JSON.stringify(pkg, null, 2));
    await format('package.json');
    return config.content;
}
async function createNewConfigFile(priorConfig) {
    logger.debug('Creating config file');
    const hasTypescript = hasDependency('typescript');
    const ruleSets = new Map();
    ruleSets.set('ignore', getIgnoredFiles(priorConfig));
    ruleSets.set('base', null);
    if (hasDependency('ember-source')) {
        logger.debug('Found Ember.js, adding Ember rule sets');
        ruleSets.set('ember', null);
    }
    ruleSets.set('js', null);
    if (hasTypescript) {
        logger.debug('Found TypeScript, adding TypeScript rule sets');
        await handleTypescript();
        ruleSets.set('ts', null);
    }
    const hasTemplateImports = hasDependency('ember-template-imports');
    const hasVite = hasDependency('vite');
    if (hasTemplateImports || hasVite) {
        if (hasTemplateImports) {
            logger.debug('Found ember-template-imports, adding .gjs rule sets');
        }
        else if (hasVite) {
            logger.debug('Found Vite, adding .gjs rule sets');
        }
        ruleSets.set('gjs', null);
        if (hasTypescript) {
            logger.debug('  and .gts rule sets');
            ruleSets.set('gts', null);
        }
    }
    const scriptGlobs = getScriptGlobs(priorConfig);
    if (scriptGlobs.length) {
        logger.debug('Found script globs in existing config');
        ruleSets.set('scripts', scriptGlobs);
    }
    await addRuleSets(ruleSets);
}
async function handleTypescript() {
    const toUninstall = [];
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
async function addRuleSets(ruleSets) {
    const extension = isESM() ? 'js' : 'mjs';
    const path = `${configPath}.${extension}`;
    let content = 'import { eslint, merge } from "@nrg-ui/standards";\n\nexport default await merge(\n';
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
    await installMany(Object.fromEntries(neededPlugins.map((plugin) => [plugin, compatibility[plugin]])));
}
function detectNeededPlugins() {
    const plugins = ['eslint-plugin-import', 'eslint-plugin-decorator-position', 'eslint-plugin-n'];
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
function getIgnoredFiles(priorConfig) {
    const path = '.eslintignore';
    const paths = new Set();
    const hasTypescript = hasDependency('typescript');
    const defaultIgnores = hasTypescript ? defaultTsIgnores : defaultJsIgnores;
    if (existsSync(path)) {
        const content = readFileSync(path, 'utf-8');
        const lines = content
            .split('\n')
            .map((line) => line.trim())
            .map((line) => line.replace(/^\//, ''))
            .filter(Boolean)
            .filter((line) => !line.startsWith('#'))
            .filter((line) => !defaultIgnores.includes(line));
        logger.debug(`Found ${lines.length} ignored files in ${path}`);
        logger.debug(`Ignored files:\n${lines.join('\n')}`);
        logger.debug(`Removing ${path}`);
        rmSync(path);
        lines.forEach((line) => paths.add(line));
    }
    else {
        logger.debug(`No ${path} found`);
    }
    if (priorConfig) {
        const ignoreEntry = priorConfig.find((entry) => entry.name === '@nrg-ui/standards/eslint/ignore');
        if (ignoreEntry?.ignores) {
            logger.debug(`Found ${ignoreEntry.ignores.length} paths from existing config`, `\n${ignoreEntry.ignores.join('\n')}`);
            ignoreEntry.ignores
                .filter((ignore) => !defaultIgnores.includes(ignore))
                .forEach((ignore) => paths.add(ignore));
        }
    }
    return Array.from(paths);
}
function getScriptGlobs(priorConfig) {
    if (!priorConfig) {
        return [];
    }
    const baseEntry = priorConfig.find((entry) => entry.name === '@nrg-ui/standards/eslint/scripts/base');
    return (baseEntry?.files ?? []).flat();
}
export async function migrate() {
    logger.info('Migrating ESLint configuration');
    await ensureInstallation();
    const priorConfig = await removeConfigFile();
    await createNewConfigFile(priorConfig);
    logger.info('ESLint migration complete');
}

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Config_instances, _Config_deps, _Config_loadDeps;
import { existsSync, readFileSync } from 'fs';
import allGlobals from 'globals';
import { join } from 'path';
import { cwd } from 'process';
import logger from '../logging.js';
import { getDependenciesFromPackage, load } from '../utils.js';
export const defaultJsIgnores = ['node_modules/', 'dist/', 'vendor/', 'assets/'];
export const defaultTsIgnores = defaultJsIgnores.concat(['declarations/']);
function flatten(o) {
    return Object.values(o).reduce((acc, cur) => ({ ...acc, ...cur }), {});
}
const esmParserOptions = {
    ecmaFeatures: { modules: true },
    ecmaVersion: 'latest',
    requireConfigFile: false,
    babelOptions: {
        plugins: [],
    },
};
export class Config {
    constructor() {
        _Config_instances.add(this);
        _Config_deps.set(this, void 0);
        this.rules = {
            ignore: (files = []) => {
                const globs = new Set(files.concat(this.hasTypescript ? defaultTsIgnores : defaultJsIgnores));
                return [
                    {
                        name: '@nrg-ui/standards/eslint/ignore',
                        ignores: [...globs],
                    },
                ];
            },
            base: async (globals = ['browser']) => {
                const objects = [];
                if (this.hasDependency('babel-eslint')) {
                    logger.error(`Using deprecated parser: 'babel-eslint'. Consider switching to '@babel/eslint-parser'`);
                }
                const { configs: recommendedConfigs } = (await load('@eslint/js'));
                objects.push({
                    name: '@nrg-ui/standards/eslint/js/recommended',
                    languageOptions: {
                        globals: flatten(globals.map((g) => allGlobals[g])),
                    },
                    rules: {
                        ...recommendedConfigs.recommended.rules,
                        'no-duplicate-imports': [
                            'error',
                            {
                                allowSeparateTypeImports: true,
                            },
                        ],
                    },
                });
                let defaultParser;
                if (this.hasDependency('@babel/eslint-parser')) {
                    defaultParser = (await load('@babel/eslint-parser'));
                }
                if (this.hasDependency('eslint-plugin-import', 'base')) {
                    const importPlugin = (await load('eslint-plugin-import'));
                    const parserOptions = structuredClone(esmParserOptions);
                    if (!this.hasDependency('decorator-transforms')) {
                        parserOptions.babelOptions.plugins.push([
                            '@babel/plugin-proposal-decorators',
                            { decoratorsBeforeExport: true },
                        ]);
                    }
                    objects.push({
                        name: '@nrg-ui/standards/eslint/base/import',
                        languageOptions: {
                            parser: defaultParser,
                            parserOptions,
                        },
                        plugins: {
                            import: importPlugin,
                        },
                        rules: {
                            'import/order': [
                                'error',
                                {
                                    'newlines-between': 'always',
                                    groups: [
                                        ['builtin', 'external', 'internal', 'object'],
                                        ['parent', 'sibling', 'index'],
                                        'type',
                                    ],
                                    alphabetize: {
                                        order: 'asc',
                                        orderImportKind: 'asc',
                                    },
                                    named: true,
                                },
                            ],
                        },
                    });
                }
                if (this.hasDependency('eslint-plugin-decorator-position', 'base')) {
                    const decoratorPositionPlugin = (await load('eslint-plugin-decorator-position'));
                    const parserOptions = structuredClone(esmParserOptions);
                    if (!this.hasDependency('decorator-transforms')) {
                        parserOptions.babelOptions.plugins.push([
                            '@babel/plugin-proposal-decorators',
                            { decoratorsBeforeExport: true },
                        ]);
                    }
                    objects.push({
                        name: '@nrg-ui/standards/eslint/base/decorator-position',
                        languageOptions: {
                            parser: defaultParser,
                            parserOptions,
                        },
                        plugins: {
                            'decorator-position': decoratorPositionPlugin,
                        },
                        rules: {
                            'decorator-position/decorator-position': [
                                'error',
                                {
                                    methods: 'above',
                                    properties: 'above',
                                },
                            ],
                        },
                    });
                }
                return objects;
            },
            ember: async () => {
                const objects = [];
                if (this.hasDependency('eslint-plugin-ember', 'ember')) {
                    const emberRecommended = (await load('eslint-plugin-ember/configs/recommended'));
                    objects.push(...emberRecommended);
                }
                return objects;
            },
            js: async (globals = ['browser'], rules) => {
                const objects = [];
                const fileTypes = ['js'];
                let root = '';
                if (this.isEmberAddon) {
                    root = 'src/';
                }
                if (this.hasTemplateImports) {
                    fileTypes.push('gjs');
                }
                const files = [`${root}**/*.{${fileTypes.join()}}`];
                if (this.hasDependency('babel-eslint')) {
                    logger.error(`Using deprecated parser: 'babel-eslint'. Consider switching to '@babel/eslint-parser'`);
                }
                let defaultParser;
                if (this.hasDependency('@babel/eslint-parser')) {
                    defaultParser = (await load('@babel/eslint-parser'));
                }
                if (this.hasDependency('eslint-plugin-import', 'js')) {
                    const importPlugin = (await load('eslint-plugin-import'));
                    objects.push({
                        name: '@nrg-ui/standards/eslint/js/import',
                        files,
                        languageOptions: {
                            globals: flatten(globals.map((g) => allGlobals[g])),
                            parser: defaultParser,
                        },
                        plugins: {
                            import: importPlugin,
                        },
                        rules: {
                            'import/extensions': [
                                'error',
                                'always',
                                {
                                    ignorePackages: true,
                                },
                            ],
                            ...rules,
                        },
                    });
                }
                if (rules) {
                    objects.push({
                        name: '@nrg-ui/standards/eslint/js/custom',
                        languageOptions: {
                            globals: flatten(globals.map((g) => allGlobals[g])),
                        },
                        files,
                        rules: {
                            ...rules,
                        },
                    });
                }
                return objects;
            },
            ts: async (globals = ['browser'], rules) => {
                var _a;
                const objects = [];
                const fileTypes = ['ts'];
                if (!this.hasDependencies(['typescript', 'typescript-eslint'], 'ts')) {
                    return objects;
                }
                if (this.hasTemplateImports) {
                    fileTypes.push('gts');
                }
                const files = [`**/*.{${fileTypes.join()}}`];
                const tseslint = (await load('typescript-eslint'));
                objects.push(...tseslint.configs.recommended);
                objects.push(tseslint.configs.eslintRecommended);
                if (rules) {
                    objects.push({
                        name: '@nrg-ui/standards/eslint/ts/custom',
                        files,
                        languageOptions: {
                            globals: flatten(globals.map((g) => allGlobals[g])),
                            parser: tseslint.parser,
                            parserOptions: {
                                tsconfigRootDir: cwd(),
                            },
                        },
                        plugins: {
                            '@typescript-eslint': tseslint.plugin,
                        },
                        rules: {
                            ...rules,
                        },
                    });
                }
                for (const obj of objects) {
                    obj.languageOptions ?? (obj.languageOptions = {});
                    (_a = obj.languageOptions).parserOptions ?? (_a.parserOptions = {});
                    obj.languageOptions.parserOptions['tsconfigRootDir'] = cwd();
                }
                return objects;
            },
            gjs: async (rules) => {
                const objects = [];
                if (!this.supportsEmberTemplateTags) {
                    logger.warn('This application does not support GJS files. One of the following is required:', 'ember-template-imports', 'ember-source and vite');
                    logger.warn(`  Called from .rules.gjs()`);
                    return objects;
                }
                const recommended = (await load('eslint-plugin-ember/configs/recommended'));
                const recommendedGjs = (await load('eslint-plugin-ember/configs/recommended-gjs'));
                objects.push(...recommended, ...recommendedGjs);
                if (!rules) {
                    return objects;
                }
                const plugin = (await load('eslint-plugin-ember'));
                const parser = (await load('ember-eslint-parser'));
                return [
                    {
                        name: '@nrg-ui/standards/eslint/gjs/custom',
                        files: ['**/*.gjs'],
                        plugins: {
                            ember: plugin,
                        },
                        languageOptions: {
                            parser,
                        },
                        rules: {
                            ...rules,
                        },
                    },
                ];
            },
            gts: async (rules) => {
                const objects = [];
                if (!this.supportsEmberTemplateTags || !this.hasDependency('typescript', 'gts')) {
                    logger.warn('This application does not support GTS files. In addition to typescript, one of the following is required:', 'ember-template-imports', 'ember-source and vite');
                    logger.warn(`  Called from .rules.gts()`);
                    return objects;
                }
                const recommended = (await load('eslint-plugin-ember/configs/recommended'));
                const recommendedGts = (await load('eslint-plugin-ember/configs/recommended-gts'));
                objects.push(...recommended, ...recommendedGts);
                if (!rules) {
                    return objects;
                }
                const emberPlugin = (await load('eslint-plugin-ember'));
                const parser = (await load('ember-eslint-parser'));
                if (rules) {
                    objects.push({
                        name: '@nrg-ui/standards/eslint/gts/custom',
                        files: ['**/*.gts'],
                        languageOptions: {
                            parser,
                            parserOptions: {
                                tsconfigRootDir: cwd(),
                            },
                        },
                        plugins: {
                            ember: emberPlugin,
                        },
                        rules: {
                            ...rules,
                        },
                    });
                }
                return objects;
            },
            scripts: async (globs, rules = {}) => {
                const objects = [];
                if (!globs?.length) {
                    logger.warn('No globs provided for `.rules.scripts()`');
                    return objects;
                }
                if (!this.hasDependency('eslint-plugin-n', 'scripts')) {
                    return objects;
                }
                const nodePlugin = (await load('eslint-plugin-n'));
                const defaultConfig = nodePlugin.configs['flat/recommended'];
                objects.push({
                    ...defaultConfig,
                    name: '@nrg-ui/standards/eslint/scripts/base',
                    languageOptions: {
                        globals: {
                            ...(defaultConfig.languageOptions?.globals ?? {}),
                            ...allGlobals.node,
                        },
                    },
                    files: globs,
                    rules: {
                        ...rules,
                    },
                });
                if (rules) {
                    objects.push({
                        name: '@nrg-ui/standards/eslint/scripts/custom',
                        languageOptions: {
                            globals: {
                                ...allGlobals.node,
                            },
                        },
                        files: globs,
                        rules: {
                            ...rules,
                        },
                    });
                }
                return objects;
            },
            tests: async (rules) => {
                const objects = [];
                const fileTypes = ['js'];
                if (this.hasTemplateImports) {
                    fileTypes.push('gjs');
                }
                if (this.hasTypescript) {
                    fileTypes.push('ts');
                    if (this.hasTemplateImports) {
                        fileTypes.push('gts');
                    }
                }
                if (this.hasDependency('eslint-plugin-qunit', 'tests')) {
                    const qunitPlugin = (await load('eslint-plugin-qunit'));
                    objects.push({
                        name: '@nrg-ui/lint/tests/base',
                        files: [`tests/**/*-test.{${fileTypes.join()}}`],
                        plugins: {
                            qunit: qunitPlugin,
                        },
                        rules: {
                            'qunit/require-expect': ['error', 'except-simple'],
                        },
                    });
                }
                if (rules) {
                    objects.push({
                        name: '@nrg-ui/lint/tests/custom',
                        files: [`tests/**/*-test.{${fileTypes.join()}}`],
                        rules: {
                            ...rules,
                        },
                    });
                }
                return objects;
            },
            custom: async (name, options) => {
                if (!name) {
                    logger.error('No name provided for `.rules.custom()`');
                }
                logger.warn(`Custom configurations are not recommended. It might be better to merge with other configurations: ${name}`);
                return [
                    {
                        name,
                        ...options,
                    },
                ];
            },
        };
    }
    get hasTypescript() {
        return __classPrivateFieldGet(this, _Config_instances, "m", _Config_loadDeps).call(this).has('typescript');
    }
    get hasTemplateImports() {
        return __classPrivateFieldGet(this, _Config_instances, "m", _Config_loadDeps).call(this).has('ember-template-imports');
    }
    get isEmberApp() {
        return existsSync(join(cwd(), 'app')) && existsSync(join(cwd(), 'ember-cli-build.js'));
    }
    get isEmberAddon() {
        const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
        return 'ember-addon' in packageJson;
    }
    hasDependency(dep, message) {
        if (!__classPrivateFieldGet(this, _Config_instances, "m", _Config_loadDeps).call(this).has(dep)) {
            if (message) {
                logger.missing(dep, `.rules.${message}()`);
            }
            return false;
        }
        return true;
    }
    hasDependencies(deps, message) {
        for (const dep of deps) {
            if (!this.hasDependency(dep, message)) {
                return false;
            }
        }
        return true;
    }
    get supportsEmberTemplateTags() {
        // Webpack and classic apps require ember-template-imports to support
        // .gjs/.gts files.
        if (this.hasDependency('ember-template-imports')) {
            return true;
        }
        // Vite apps do not require ember-template-imports to support .gjs/.gts
        if (this.hasDependencies(['vite', 'ember-source'])) {
            return true;
        }
        // V2 addons do not require anything extra to support .gjs/.gts
        return this.hasDependency('@embroider/addon-dev');
    }
}
_Config_deps = new WeakMap(), _Config_instances = new WeakSet(), _Config_loadDeps = function _Config_loadDeps() {
    if (!__classPrivateFieldGet(this, _Config_deps, "f")) {
        __classPrivateFieldSet(this, _Config_deps, new Map(Object.entries(getDependenciesFromPackage(join(process.cwd(), 'package.json')))), "f");
    }
    return __classPrivateFieldGet(this, _Config_deps, "f");
};
export default new Config();

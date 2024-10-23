import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { missing, warn, error } from '../logging.js';
import { load, getDependenciesFromPackage } from '../utils.js';

import type { Linter } from 'eslint';

export const defaultIgnores = ['node_modules/', 'dist/', 'vendor/', 'assets/'];

export class Config {
  readonly #deps: Map<string, string>;

  constructor() {
    this.#deps = new Map(
      Object.entries(
        getDependenciesFromPackage(join(process.cwd(), 'package.json')),
      ),
    );
  }

  get hasTypescript() {
    return this.#deps.has('typescript');
  }

  get hasTemplateImports() {
    return this.#deps.has('ember-template-imports');
  }

  get isEmberApp() {
    return (
      existsSync(join(process.cwd(), 'app')) &&
      existsSync(join(process.cwd(), 'ember-cli-build.js'))
    );
  }

  get isEmberAddon() {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf-8'),
    );

    return 'ember-addon' in packageJson;
  }

  hasDependency(dep: string, message?: string) {
    if (!this.#deps.has(dep)) {
      missing(dep, `.rules.${message}()`);
      return false;
    }

    return true;
  }

  hasDependencies(deps: string[], message?: string) {
    for (const dep of deps) {
      if (!this.hasDependency(dep, message)) {
        return false;
      }
    }

    return true;
  }

  rules = {
    ignore: (files: string[] = []): Linter.Config[] => {
      const globs = new Set<string>(files.concat(defaultIgnores));

      if (this.hasTypescript) {
        globs.add('declarations/');
      }

      return [
        {
          name: '@nrg-ui/standards/eslint/ignore',
          ignores: [...globs],
        },
      ];
    },

    base: async (): Promise<Linter.Config[]> => {
      const objects: Linter.Config[] = [];

      if (this.hasDependency('eslint-plugin-import', 'base')) {
        const importPlugin = await load('eslint-plugin-import');

        objects.push({
          name: '@nrg-ui/standards/eslint/base/import',
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
              },
            ],
          },
        });
      }

      if (this.hasDependency('eslint-plugin-decorator-position', 'base')) {
        const decoratorPositionPlugin = await load(
          'eslint-plugin-decorator-position',
        );

        objects.push({
          name: '@nrg-ui/standards/eslint/base/decorator-position',
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

    ember: async (): Promise<Linter.Config[]> => {
      const objects: Linter.Config[] = [];

      if (this.hasDependency('eslint-plugin-ember', 'ember')) {
        const emberRecommended = await load(
          'eslint-plugin-ember/configs/recommended',
        );

        objects.push(...emberRecommended);
      }

      return objects;
    },

    js: async (rules?: Linter.RulesRecord): Promise<Linter.Config[]> => {
      const objects: Linter.Config[] = [];
      const fileTypes = ['js'];
      let root = '';

      if (this.isEmberAddon) {
        root = 'src/';
      }

      if (this.hasTemplateImports) {
        fileTypes.push('gjs');
      }

      const files = [`${root}**/*.{${fileTypes.join()}}`];

      if (this.hasDependency('eslint-plugin-import', 'js')) {
        const importPlugin = await load('eslint-plugin-import');

        objects.push({
          name: '@nrg-ui/standards/eslint/js/import',
          files,
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
          files,
          rules: {
            ...rules,
          },
        });
      }

      return objects;
    },

    ts: async (rules?: Linter.RulesRecord): Promise<Linter.Config[]> => {
      const objects: Linter.Config[] = [];
      const fileTypes = ['ts'];

      if (!this.hasDependencies(['typescript', 'typescript-eslint'], 'ts')) {
        return objects;
      }

      if (this.hasTemplateImports) {
        fileTypes.push('gts');
      }

      const files = [`**/*.{${fileTypes.join()}}`];
      const tseslint = await load('typescript-eslint');

      objects.push(...tseslint.configs.recommended);
      objects.push(tseslint.configs.eslintRecommended);

      if (rules) {
        objects.push({
          name: '@nrg-ui/standards/eslint/ts/custom',
          files,
          languageOptions: {
            parser: tseslint.parser,
          },
          plugins: {
            '@typescript-eslint': tseslint.plugin,
          },
          rules: {
            ...rules,
          },
        });
      }

      return objects;
    },

    gjs: async (rules?: Linter.RulesRecord): Promise<Linter.Config[]> => {
      const objects: Linter.Config[] = [];

      if (
        !this.hasDependencies(
          ['ember-template-imports', 'eslint-plugin-ember'],
          'gjs',
        )
      ) {
        return objects;
      }

      const recommended = await load('eslint-plugin-ember/configs/recommended');
      const recommendedGjs = await load(
        'eslint-plugin-ember/configs/recommended-gjs',
      );

      objects.push(...recommended, ...recommendedGjs);

      if (!rules) {
        return objects;
      }

      const plugin = await load('eslint-plugin-ember');
      const parser = await load('ember-eslint-parser');

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

    gts: async (rules?: Linter.RulesRecord): Promise<Linter.Config[]> => {
      const objects: Linter.Config[] = [];

      if (
        !this.hasDependencies(['ember-template-imports', 'typescript'], 'gts')
      ) {
        return objects;
      }

      const recommended = await load('eslint-plugin-ember/configs/recommended');
      const recommendedGjs = await load(
        'eslint-plugin-ember/configs/recommended-gts',
      );

      objects.push(...recommended, ...recommendedGjs);

      if (!rules) {
        return objects;
      }

      const emberPlugin = await load('eslint-plugin-ember');
      const parser = await load('ember-eslint-parser');

      if (rules) {
        objects.push({
          name: '@nrg-ui/standards/eslint/gts/custom',
          files: ['**/*.gts'],
          languageOptions: {
            parser,
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

    scripts: async (
      globs: string[],
      rules: Linter.RulesRecord = {},
    ): Promise<Linter.Config[]> => {
      const objects: Linter.Config[] = [];

      if (!globs?.length) {
        warn('No globs provided for `.rules.scripts()`');

        return objects;
      }

      if (!this.hasDependency('eslint-plugin-n', 'scripts')) {
        return objects;
      }

      const nodePlugin = await load('eslint-plugin-n');
      const defaultConfig = nodePlugin.configs['flat/recommended-script'];

      objects.push({
        ...defaultConfig,
        name: '@nrg-ui/standards/eslint/scripts/base',
        files: globs,
        rules: {
          ...defaultConfig.rules,
          ...rules,
        },
      });

      if (rules) {
        objects.push({
          name: '@nrg-ui/standards/eslint/scripts/custom',
          files: globs,
          rules: {
            ...rules,
          },
        });
      }

      return objects;
    },

    custom: async (
      name: string,
      options: Partial<Linter.Config>,
    ): Promise<Linter.Config[]> => {
      if (!name) {
        error('No name provided for `.rules.custom()`');
      }

      warn(
        `Custom configurations are not recommended. It might be better to merge with other configurations: ${name}`,
      );

      return [
        {
          name,
          ...options,
        },
      ];
    },
  };
}

export default new Config();

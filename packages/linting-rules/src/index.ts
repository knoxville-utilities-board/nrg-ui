import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

const prefix = chalk.blue('[@nrg-ui/lint] ');
const orange = chalk.hex('#FF8200');

function warn(message: string) {
  console.warn(prefix + orange(message));
}

function missing(dep: string, message?: string) {
  warn(`Missing dependency: \`${chalk.red(dep)}\`${orange('...')}`);
  if (message) {
    warn(`  Called from ${message}`);
  }
}

interface BaseConfig {
  root: boolean;
  plugins: string[],
  extends?: string[],
  env?: {
    browser: boolean;
  },
  settings?: Record<string, unknown>,
  parser?: string,
  parserOptions?: Record<string, unknown>,
}

interface Override {
  files?: string[];
  parser?: string;
  parserOptions?: Record<string, unknown>;
  env?: Record<string, boolean>;
  extends?: string[];
  plugins?: string[];
  rules?: Record<string, unknown>;
}

export function getDependenciesFromPackage(path: string) {
  const packageJson = JSON.parse(readFileSync(path, 'utf-8'));

  return {
    ...packageJson?.dependencies,
    ...packageJson?.devDependencies,
  };
}

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

  init() {
    const base: BaseConfig = {
      root: true,
      plugins: ['ember'],
      extends: ['eslint:recommended', 'plugin:ember/recommended'],
      env: {
        browser: true,
      },
    };

    // Settings
    if (this.#deps.has('eslint-plugin-import')) {
      base.plugins.push('import');
      if (this.#deps.has('eslint-import-resolver-webpack')) {
        base.settings = {
          'import/resolver': 'webpack',
        };
      }
    }

    // Parser
    if (this.#deps.has('@babel/eslint-parser')) {
      base.parser = '@babel/eslint-parser';
      base.parserOptions = {
        ecmaVersion: 'latest',
      };
    }
    if (this.#deps.has('@typescript-eslint/parser')) {
      base.parser = '@typescript-eslint/parser';
      base.parserOptions = {
        ecmaVersion: 'latest',
      };
    }

    // Plugins
    if (this.#deps.has('eslint-plugin-decorator-position')) {
      base.plugins.push('decorator-position');
      base.extends = ['plugin:decorator-position/ember'];
    } else {
      missing('eslint-plugin-decorator-position');
    }

    return base;
  }

  rules = {
    base: () => {
      const rules: Record<string, unknown> = {};

      if (this.#deps.has('eslint-plugin-import')) {
        rules['import/order'] = [
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
        ];
      } else {
        missing('eslint-plugin-import');
      }

      if (this.#deps.has('eslint-plugin-decorator-position')) {
        rules['decorator-position/decorator-position'] = [
          'error',
          {
            methods: 'above',
            properties: 'above',
          },
        ];
      } else {
        missing('eslint-plugin-decorator-position');
      }

      return rules;
    },
  };

  overrides = {
    js: (rules: unknown[] = []): Override[] => {
      const fileTypes = ['js'];
      let root = '';

      if (this.isEmberAddon) {
        root = 'src/';
      }

      if (this.hasTypescript) {
        fileTypes.push('ts');
      }

      if (this.hasTemplateImports) {
        fileTypes.push('gjs');
        if (this.hasTypescript) {
          fileTypes.push('gts');
        }
      }

      if (!this.#deps.has('eslint-plugin-import')) {
        missing('eslint-plugin-import');

        return [];
      }

      return [
        {
          files: [`${root}**/*.{${fileTypes.join()}}`, '**/*.ts', '**/*.gts'],
          rules: {
            'import/extensions': ['error', 'always', { ignorePackages: true }],
            ...rules,
          },
        },
      ];
    },

    ts: (rules: unknown[] = []): Override[] => {
      const fileTypes = ['ts'];

      if (!this.hasTypescript) {
        missing('typescript', '.overrides.ts()');

        return [];
      }

      if (!this.#deps.has('@typescript-eslint/eslint-plugin')) {
        missing('@typescript-eslint/eslint-plugin', '.overrides.ts()');

        return [];
      }

      if (!this.#deps.has('@typescript-eslint/parser')) {
        missing('@typescript-eslint/parser', '.overrides.ts()');

        return [];
      }

      if (this.hasTemplateImports) {
        fileTypes.push('gts');
      }

      return [
        {
          files: [`**/*.${fileTypes.join()}`],
          parser: '@typescript-eslint/parser',
          extends: [
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/eslint-recommended',
          ],
          rules: {
            ...rules,
          },
        },
      ];
    },

    gjs: (rules: unknown[] = []): Override[] => {
      if (!this.hasTemplateImports) {
        missing('ember-template-imports', '.overrides.gjs()');

        return [];
      }

      return [
        {
          files: ['**/*.gjs'],
          parser: 'ember-eslint-parser',
          plugins: ['ember'],
          extends: [
            'eslint:recommended',
            'plugin:ember/recommended',
            'plugin:ember/recommended-gjs',
          ],
          rules: {
            ...rules,
          },
        },
      ];
    },

    gts: (rules: unknown[] = []): Override[] => {
      if (!this.hasTemplateImports) {
        missing('ember-template-imports', '.overrides.gts()');

        return [];
      }
      if (!this.hasTypescript) {
        missing('typescript', '.overrides.gts()');

        return [];
      }

      return [
        {
          files: ['**/*.gts'],
          parser: 'ember-eslint-parser',
          plugins: ['ember'],
          extends: ['plugin:ember/recommended', 'plugin:ember/recommended-gts'],
          rules: {
            ...rules,
          },
        },
      ];
    },

    scripts: (globs: string[], rules: unknown[] = []): Override[] => {
      if (!globs?.length) {
        warn('No globs provided for `.overrides.scripts()`');

        return [];
      }

      if (!this.#deps.has('eslint-plugin-n')) {
        missing('eslint-plugin-n', '.overrides.scripts()');

        return [];
      }

      return [
        {
          files: globs,
          parserOptions: {
            sourceType: 'script',
          },
          env: {
            browser: false,
            node: true,
          },
          plugins: ['n'],
          extends: ['plugin:n/recommended'],
          rules: {
            ...rules,
          },
        },
      ];
    },
  };
}

export default new Config();

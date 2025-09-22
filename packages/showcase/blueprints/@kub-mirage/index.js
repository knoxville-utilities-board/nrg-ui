'use strict';

/* eslint-disable @typescript-eslint/no-require-imports */

const chalk = require('chalk');
const {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} = require('fs');
const { EOL } = require('os');
const { join } = require('path');
const { cwd } = require('process');

const {
  APP_DIR,
  MODELS_DIR,
  ROOT_MIRAGE_DIR,
  SERIALIZERS_DIR,
  findUp,
  formatFile,
} = require('../index.js');

const prefix = chalk.magenta('[@kub/mirage]') + chalk.reset('');

const workspaceFile = 'pnpm-workspace.yaml';

module.exports = {
  description:
    'The default blueprint for @kub/mirage. This runs when you run `ember install @kub/mirage` in your project.',

  fileMapTokens() {
    return {
      __root__() {
        return 'app';
      },
      __tests__() {
        return 'tests';
      },
    };
  },

  locals() {
    const environment = require(join(cwd(), 'config', 'environment.js'));
    const { modulePrefix } = environment();

    return { modulePrefix };
  },

  async beforeInstall() {
    await this.addPackagesToProject([
      { name: 'mirage-msw', target: '^0.2.2' },
      { name: 'miragejs', target: '^0.2.0-alpha.3' },
      { name: 'msw', target: '^2.7.0' },
      { name: '@faker-js/faker', target: 'latest' },
    ]);

    let workspaceFileLocation = findUp(workspaceFile, this.project.root);
    if (!workspaceFileLocation) {
      writeFileSync(
        workspaceFile,
        `onlyBuiltDependencies:${EOL}packages:${EOL}  - '.'${EOL}  `,
      );
      workspaceFileLocation = findUp(workspaceFile, this.project.root);
    }

    let pnpmWorkspace = readFileSync(workspaceFileLocation).toString();
    if (!pnpmWorkspace.includes('msw')) {
      pnpmWorkspace = pnpmWorkspace.replace(
        /onlyBuiltDependencies:\s+/,
        `onlyBuiltDependencies:${EOL}  - msw${EOL}  `,
      );
      writeFileSync(workspaceFileLocation, pnpmWorkspace);
    }
  },

  async afterInstall(options) {
    await this.setupMockServiceWorker();

    this.ui.writeLine(`${prefix} Initializing @kub/mirage`);

    await importModels(this);
    await importSerializers(this);

    await this.lookupBlueprint('mirage-scenario').install({
      ...options,
      entity: {
        name: 'default',
      },
    });
  },

  async setupMockServiceWorker() {
    this.ui.writeLine(`${prefix} Initializing msw`);
    await this.exec('msw', 'init', 'public', '--save');

    await this.insertIntoFile(
      '.prettierignore',
      `\n# Ignore the mock service worker\npublic/mockServiceWorker.js`,
    );

    this.ui.writeLine(
      `${prefix}   Adding script to exclude mock service worker from the build`,
    );
    let pkg = JSON.parse(readFileSync('package.json').toString());
    pkg.scripts = pkg.scripts || {};
    pkg.scripts['postbuild'] = 'rm dist/mockServiceWorker.js';

    pkg = await formatFile('package.json', JSON.stringify(pkg));
    writeFileSync('package.json', pkg);
  },

  async exec(command, ...args) {
    const execaModule = await import('execa');
    let execa = execaModule;
    const { target } = this.options;

    if (typeof execa !== 'function') {
      execa = execaModule.default;
    }

    if (typeof execa !== 'function') {
      execa = execaModule.execa;
    }

    await execa(command, args, {
      cwd: target,
      env: {
        PATH: process.env.PATH + ':' + join(target, 'node_modules', '.bin'),
      },
    });
  },

  /* The blueprint base verifies that an entity name is passed to the
   * blueprint. This is not necessary for this blueprint, so we want
   * to bypass it.
   */
  normalizeEntityName() {},
};

async function importModels(context) {
  context.ui.writeLine(`${prefix}   Importing models...`);

  const { options } = context;
  const modelsDir = join(options.target, APP_DIR, MODELS_DIR);

  if (!existsSync(modelsDir)) {
    options.ui.writeLine(
      `${prefix}   The \`/app/${MODELS_DIR}\` directory does not exist, skipping import...`,
    );
    return;
  }

  const mirageModelsDir = join(ROOT_MIRAGE_DIR, MODELS_DIR);

  if (!existsSync(mirageModelsDir)) {
    mkdirSync(mirageModelsDir, { recursive: true });
  }

  const models = readdirSync(modelsDir)
    .filter((file) => file.endsWith('.js'))
    .map((file) => {
      return file.replace('.js', '');
    });

  const modelBlueprint = context.lookupBlueprint('mirage-model');
  const factoryBlueprint = context.lookupBlueprint('mirage-factory');
  for (const model of models) {
    await modelBlueprint.install({
      ...options,
      entity: {
        name: model,
      },
    });
    await factoryBlueprint.install({
      ...options,
      entity: {
        name: model,
      },
    });
  }
}

async function importSerializers(context) {
  context.ui.writeLine(`${prefix}   Importing serializers...`);

  const { options } = context;
  const serializersDir = join(options.target, APP_DIR, SERIALIZERS_DIR);

  if (!existsSync(serializersDir)) {
    options.ui.writeLine(
      `${prefix}   The \`/app/${SERIALIZERS_DIR}\` directory does not exist, skipping import...`,
    );
    return;
  }

  const mirageSerializersDir = join(ROOT_MIRAGE_DIR, SERIALIZERS_DIR);

  if (!existsSync(mirageSerializersDir)) {
    mkdirSync(mirageSerializersDir, { recursive: true });
  }

  const serializers = readdirSync(serializersDir)
    .filter(
      (file) =>
        file.endsWith('.js') &&
        file !== 'application.js' &&
        file !== 'json-api-application.js',
    )
    .map((file) => {
      return file.replace('.js', '');
    });

  const blueprint = context.lookupBlueprint('mirage-serializer');
  for (const serializer of serializers) {
    await blueprint.install({
      ...options,
      entity: {
        name: serializer,
      },
    });
  }
}

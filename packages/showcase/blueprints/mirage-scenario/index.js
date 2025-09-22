'use strict';

/* eslint-disable @typescript-eslint/no-require-imports */

const { classify, dasherize } = require('ember-cli-string-utils');
const {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} = require('fs');
const { EOL } = require('os');
const { join, relative } = require('path');
const SilentError = require('silent-error');

const {
  APP_DIR,
  ROOT_MIRAGE_DIR,
  SCENARIOS_DIR,
  formatFile,
  prefix,
} = require('../index.js');

module.exports = {
  description: 'Generates a Mirage scenario',

  normalizeEntityName(entityName) {
    if (!entityName) {
      throw new SilentError('You must provide a name for the scenario.');
    }

    entityName = dasherize(entityName);

    if (entityName === 'json-api-application') {
      throw new SilentError(
        'The scenario name "json-api-application" is reserved. Please choose a different name.',
      );
    }

    return entityName;
  },

  async beforeInstall(options) {
    const mirageScenariosDir = join(
      options.target,
      APP_DIR,
      ROOT_MIRAGE_DIR,
      SCENARIOS_DIR,
    );
    if (!existsSync(mirageScenariosDir)) {
      mkdirSync(mirageScenariosDir, { recursive: true });
    }

    options.mirageScenariosDir = mirageScenariosDir;
    options.mirageScenarioPath = join(
      mirageScenariosDir,
      `${options.entity.name}.js`,
    );
  },

  async afterInstall(options) {
    await generateScenarioFile(options);
    this.ui.writeLine(
      `${prefix} Created file ${this.rel(options.mirageScenarioPath)}`,
    );

    await generateBarrelFile(options);
    this.ui.writeLine(
      `${prefix} Updated file ${this.rel(options.mirageScenariosDir)}.js`,
    );
  },

  async beforeUninstall(options) {
    const mirageScenariosDir = join(
      options.target,
      APP_DIR,
      ROOT_MIRAGE_DIR,
      SCENARIOS_DIR,
    );
    const { name: entityName } = options.entity;

    options.mirageScenariosDir = mirageScenariosDir;
    options.mirageScenarioPath = join(mirageScenariosDir, `${entityName}.js`);
  },

  async afterUninstall(options) {
    const filePath = options.mirageScenarioPath;
    const barrelFilePath = `${options.mirageScenariosDir}.js`;

    if (!existsSync(filePath)) {
      return;
    }

    rmSync(filePath);
    this.ui.writeLine(`${prefix} Deleted file ${this.rel(filePath)}`);

    await generateBarrelFile(options);
    this.ui.writeLine(`${prefix} Updated file ${this.rel(barrelFilePath)}`);
  },

  rel(filePath) {
    return relative(this.options.target, filePath);
  },
};

async function generateScenarioFile(options) {
  const mirageScenario = await formatFile(
    options.mirageScenarioPath,
    `export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);

  server.loadFixtures();
}`,
  );

  writeFileSync(options.mirageScenarioPath, mirageScenario);
}

async function generateBarrelFile(options) {
  const barrelFilePath = `${options.mirageScenariosDir}.js`;
  const scenarios = readdirSync(options.mirageScenariosDir)
    .filter((file) => file.endsWith('.js'))
    .map((file) => file.replace('.js', ''));

  const barrelContent = `// This file is auto-generated. Do not edit it directly.
${scenarios
  .map((scenario) => {
    const scenarioClass = classify(scenario);
    return `import ${scenarioClass} from './${SCENARIOS_DIR}/${scenario}.js';`;
  })
  .join(EOL)}

export default {
  ${scenarios
    .map((scenario) => `'${scenario}': ${classify(scenario)}`)
    .sort()
    .join()}
};`;

  writeFileSync(
    barrelFilePath,
    await formatFile(barrelFilePath, barrelContent),
  );
}

'use strict';

/* eslint-disable @typescript-eslint/no-require-imports */

const { camelize, dasherize } = require('ember-cli-string-utils');
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
  FIXTURES_DIR,
  ROOT_MIRAGE_DIR,
  formatFile,
  prefix,
} = require('../index.js');

module.exports = {
  description: 'Generates a Mirage fixture',

  normalizeEntityName(entityName) {
    if (!entityName) {
      throw new SilentError('You must provide a name for the fixture.');
    }

    return dasherize(entityName);
  },

  async beforeInstall(options) {
    const mirageFixturesDir = join(
      options.target,
      APP_DIR,
      ROOT_MIRAGE_DIR,
      FIXTURES_DIR,
    );

    if (!existsSync(mirageFixturesDir)) {
      mkdirSync(mirageFixturesDir, { recursive: true });
    }

    options.mirageFixturesDir = mirageFixturesDir;
    options.mirageFixturePath = join(
      mirageFixturesDir,
      `${options.entity.name}.js`,
    );
  },

  async afterInstall(options) {
    await generateFixtureFile(options);
    this.ui.writeLine(
      `${prefix} Created file ${this.rel(options.mirageFixturePath)}`,
    );

    await generateBarrelFile(options);
    this.ui.writeLine(
      `${prefix} Updated file ${this.rel(options.mirageFixturesDir)}.js`,
    );
  },

  async beforeUninstall(options) {
    const mirageFixturesDir = join(
      options.target,
      APP_DIR,
      ROOT_MIRAGE_DIR,
      FIXTURES_DIR,
    );
    const { name: entityName } = options.entity;

    options.mirageFixturesDir = mirageFixturesDir;
    options.mirageFixturePath = join(mirageFixturesDir, `${entityName}.js`);
  },

  async afterUninstall(options) {
    const filePath = options.mirageFixturePath;
    const barrelFilePath = `${options.mirageFixturesDir}.js`;

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

async function generateFixtureFile(options) {
  const mirageFixture = await formatFile(
    options.mirageFixturePath,
    `export default [];`,
  );

  writeFileSync(options.mirageFixturePath, mirageFixture);
}

async function generateBarrelFile(options) {
  const barrelFilePath = `${options.mirageFixturesDir}.js`;
  const fixtures = readdirSync(options.mirageFixturesDir)
    .filter((file) => file.endsWith('.js'))
    .map((file) => file.replace('.js', ''));

  const barrelContent = `// This file is auto-generated. Do not edit it directly.
${fixtures
  .map((fixture) => {
    const fixtureClass = camelize(fixture);
    return `import ${fixtureClass} from './${FIXTURES_DIR}/${fixture}.js';`;
  })
  .join(EOL)}

export default {
  ${fixtures
    .map((fixture) => camelize(fixture))
    .sort()
    .join()}
};`;

  writeFileSync(
    barrelFilePath,
    await formatFile(barrelFilePath, barrelContent),
  );
}

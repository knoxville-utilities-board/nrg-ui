'use strict';

/* eslint-disable @typescript-eslint/no-require-imports */

const { camelize, dasherize } = require('ember-cli-string-utils');
const {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} = require('fs');
const { EOL } = require('os');
const { join, relative } = require('path');
const SilentError = require('silent-error');

const {
  APP_DIR,
  FACTORIES_DIR,
  MODELS_DIR,
  ROOT_MIRAGE_DIR,
  formatFile,
  prefix,
} = require('../index.js');

module.exports = {
  description: 'Generates a Mirage factory',

  normalizeEntityName(entityName) {
    if (!entityName) {
      throw new SilentError('You must provide a name for the factory.');
    }

    return dasherize(entityName);
  },

  async beforeInstall(options) {
    const mirageFactoriesDir = join(
      options.target,
      APP_DIR,
      ROOT_MIRAGE_DIR,
      FACTORIES_DIR,
    );
    const { name: entityName } = options.entity;

    const modelPath = join(
      options.target,
      APP_DIR,
      MODELS_DIR,
      `${entityName}.js`,
    );

    if (!existsSync(mirageFactoriesDir)) {
      mkdirSync(mirageFactoriesDir, { recursive: true });
    }

    options.modelPath = modelPath;
    options.mirageFactoriesDir = mirageFactoriesDir;
    options.mirageFactoryPath = join(mirageFactoriesDir, `${entityName}.js`);
  },

  async afterInstall(options) {
    await generateFactoryFile(options);
    this.ui.writeLine(
      `${prefix} Created file ${this.rel(options.mirageFactoryPath)}`,
    );

    await generateBarrelFile(options);
    this.ui.writeLine(
      `${prefix} Updated file ${this.rel(options.mirageFactoriesDir)}.js`,
    );
  },

  async beforeUninstall(options) {
    const mirageFactoriesDir = join(
      options.target,
      APP_DIR,
      ROOT_MIRAGE_DIR,
      FACTORIES_DIR,
    );
    const { name: entityName } = options.entity;

    options.mirageFactoriesDir = mirageFactoriesDir;
    options.mirageFactoryPath = join(mirageFactoriesDir, `${entityName}.js`);
  },

  async afterUninstall(options) {
    const filePath = options.mirageFactoryPath;
    const barrelFilePath = `${options.mirageFactoriesDir}.js`;

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

async function generateFactoryFile(options) {
  let factoryFunctions = [];
  if (existsSync(options.modelPath)) {
    const modelContent = readFileSync(options.modelPath).toString();
    const factoryOptions = extractAttributes(modelContent);
    factoryFunctions = Object.entries(factoryOptions).map(
      ([key, value]) => `  ${key}() { // TODO: ${value ?? 'unknown type'}\n }`,
    );
  }

  const mirageFactory = await formatFile(
    options.mirageFactoryPath,
    `import { Factory } from 'miragejs';

     export default Factory.extend({${factoryFunctions.join()}});`,
  );

  writeFileSync(options.mirageFactoryPath, mirageFactory);
}

async function generateBarrelFile(options) {
  const barrelFilePath = `${options.mirageFactoriesDir}.js`;
  const factories = readdirSync(options.mirageFactoriesDir)
    .filter((file) => file.endsWith('.js'))
    .map((file) => file.replace('.js', ''));

  const barrelContent = `// This file is auto-generated. Do not edit it directly.
${factories
  .map((factory) => {
    const factoryClass = camelize(factory);
    return `import ${factoryClass} from './${FACTORIES_DIR}/${factory}.js';`;
  })
  .join(EOL)}

export default {
  ${factories
    .map((factory) => camelize(factory))
    .sort()
    .join()}
};`;

  writeFileSync(
    barrelFilePath,
    await formatFile(barrelFilePath, barrelContent),
  );
}

function extractAttributes(modelContent) {
  const attributes = {};

  const attrPattern = /@attr\(\s*['"]([^'"]+)['"]\s*\)\s+([^;]+);/g;
  let match;
  while ((match = attrPattern.exec(modelContent)) !== null) {
    const type = match[1];
    const name = match[2].trim();

    attributes[name] = type;
  }

  return attributes;
}

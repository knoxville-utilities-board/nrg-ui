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
  MODELS_DIR,
  ROOT_MIRAGE_DIR,
  formatFile,
  prefix,
} = require('../index.js');

module.exports = {
  description: 'Generates a Mirage model',

  normalizeEntityName(entityName) {
    if (!entityName) {
      throw new SilentError('You must provide a name for the model.');
    }

    return dasherize(entityName);
  },

  async beforeInstall(options) {
    const mirageModelsDir = join(
      options.target,
      APP_DIR,
      ROOT_MIRAGE_DIR,
      MODELS_DIR,
    );
    const { name: entityName } = options.entity;

    const modelPath = join(
      options.target,
      APP_DIR,
      MODELS_DIR,
      `${entityName}.js`,
    );

    if (!existsSync(mirageModelsDir)) {
      mkdirSync(mirageModelsDir, { recursive: true });
    }

    options.modelPath = modelPath;
    options.mirageModelsDir = mirageModelsDir;
    options.mirageModelPath = join(mirageModelsDir, `${entityName}.js`);
  },

  async afterInstall(options) {
    await generateModelFile(options);
    this.ui.writeLine(
      `${prefix} Created file ${this.rel(options.mirageModelPath)}`,
    );

    await generateBarrelFile(options);
    this.ui.writeLine(
      `${prefix} Updated file ${this.rel(options.mirageModelsDir)}.js`,
    );
  },

  async beforeUninstall(options) {
    const mirageModelsDir = join(
      options.target,
      APP_DIR,
      ROOT_MIRAGE_DIR,
      MODELS_DIR,
    );
    const { name: entityName } = options.entity;

    options.mirageModelsDir = mirageModelsDir;
    options.mirageModelPath = join(mirageModelsDir, `${entityName}.js`);
  },

  async afterUninstall(options) {
    const filePath = options.mirageModelPath;
    const barrelFilePath = `${options.mirageModelsDir}.js`;

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

async function generateModelFile(options) {
  const mirageImports = new Set(['Model']);
  const relationshipsDeclarations = [];

  if (existsSync(options.modelPath)) {
    const modelContent = readFileSync(options.modelPath).toString();
    const relationships = extractRelationships(modelContent);

    for (const relationship of relationships) {
      const { type, name } = relationship;

      mirageImports.add(type);
      relationshipsDeclarations.push(`${name}: ${type}()`);
    }
  }

  const mirageModel = await formatFile(
    options.modelPath,
    `import { ${joinIter(mirageImports)} } from 'miragejs';

      export default Model.extend({
        ${joinIter(relationshipsDeclarations)}
      });`,
  );

  writeFileSync(options.mirageModelPath, mirageModel);
}

async function generateBarrelFile(options) {
  const barrelFilePath = `${options.mirageModelsDir}.js`;
  const models = readdirSync(options.mirageModelsDir)
    .filter((file) => file.endsWith('.js'))
    .map((file) => file.replace('.js', ''));

  const barrelContent = `// This file is auto-generated. Do not edit it directly.
${models
  .map((model) => {
    const modelClass = camelize(model);
    return `import ${modelClass} from './${MODELS_DIR}/${model}.js';`;
  })
  .join(EOL)}

export default {
  ${models
    .map((model) => camelize(model))
    .sort()
    .join()}
};`;

  writeFileSync(
    barrelFilePath,
    await formatFile(barrelFilePath, barrelContent),
  );
}

function extractRelationships(modelContent) {
  const RELATIONSHIP_PATTERN = /@((?:belongsTo)|(?:hasMany))\([^)]*\)\s+(\w+)/g;
  const relationships = [];
  let match;
  while ((match = RELATIONSHIP_PATTERN.exec(modelContent))) {
    const [, type, name] = match;
    relationships.push({ type, name });
  }
  return relationships;
}

function joinIter(iterable) {
  return Array.from(iterable).join(`, ${EOL}`);
}

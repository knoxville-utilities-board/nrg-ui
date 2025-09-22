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
  ROOT_MIRAGE_DIR,
  SERIALIZERS_DIR,
  formatFile,
  prefix,
} = require('../index.js');

module.exports = {
  description: 'Generates a Mirage serializer',

  normalizeEntityName(entityName) {
    if (!entityName) {
      throw new SilentError('You must provide a name for the serializer.');
    }

    return dasherize(entityName);
  },

  async beforeInstall(options) {
    const mirageSerializersDir = join(
      options.target,
      APP_DIR,
      ROOT_MIRAGE_DIR,
      SERIALIZERS_DIR,
    );
    const { name: entityName } = options.entity;

    const serializerPath = join(
      options.target,
      APP_DIR,
      SERIALIZERS_DIR,
      `${entityName}.js`,
    );

    if (!existsSync(mirageSerializersDir)) {
      mkdirSync(mirageSerializersDir, { recursive: true });
    }

    options.serializerPath = serializerPath;
    options.mirageSerializersDir = mirageSerializersDir;
    options.mirageSerializerPath = join(
      mirageSerializersDir,
      `${entityName}.js`,
    );
  },

  async afterInstall(options) {
    await generateSerializerFile(options);
    this.ui.writeLine(
      `${prefix} Created file ${this.rel(options.mirageSerializerPath)}`,
    );

    await generateBarrelFile(options);
    this.ui.writeLine(
      `${prefix} Updated file ${this.rel(options.mirageSerializersDir)}.js`,
    );
  },

  async beforeUninstall(options) {
    const mirageSerializersDir = join(
      options.target,
      APP_DIR,
      ROOT_MIRAGE_DIR,
      SERIALIZERS_DIR,
    );
    const { name: entityName } = options.entity;

    options.mirageSerializersDir = mirageSerializersDir;
    options.mirageSerializerPath = join(
      mirageSerializersDir,
      `${entityName}.js`,
    );
  },

  async afterUninstall(options) {
    const filePath = options.mirageSerializerPath;
    const barrelFilePath = `${options.mirageSerializersDir}.js`;

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

async function generateSerializerFile(options) {
  let serializerOptions = {};

  if (existsSync(options.serializerPath)) {
    const serializerContent = readFileSync(options.serializerPath).toString();

    serializerOptions = extractOptions(serializerContent);
  }

  const mirageSerializer = await formatFile(
    options.serializerPath,
    `import ApplicationSerializer from './application.js';

     export default ApplicationSerializer.extend(${JSON.stringify(serializerOptions, null, 2)});`,
  );

  writeFileSync(options.mirageSerializerPath, mirageSerializer);
}

async function generateBarrelFile(options) {
  const barrelFilePath = `${options.mirageSerializersDir}.js`;
  const serializers = readdirSync(options.mirageSerializersDir)
    .filter((file) => file.endsWith('.js'))
    .map((file) => file.replace('.js', ''));

  const barrelContent = `// This file is auto-generated. Do not edit it directly.
${serializers
  .map((serializer) => {
    const serializerClass = camelize(serializer);
    return `import ${serializerClass} from './${SERIALIZERS_DIR}/${serializer}.js';`;
  })
  .join(EOL)}

export default {
  ${serializers
    .map((serializer) => camelize(serializer))
    .sort()
    .join()}
};`;

  writeFileSync(
    barrelFilePath,
    await formatFile(barrelFilePath, barrelContent),
  );
}

function extractOptions(serializerContent) {
  const options = {};

  const primaryKeyPattern = /primaryKey = \s*['"]([^'"]+)['"]/;
  const primaryKeyMatch = serializerContent.match(primaryKeyPattern);

  if (primaryKeyMatch) {
    options.primaryKey = primaryKeyMatch[1];
  }

  return options;
}

'use strict';

/* eslint-disable @typescript-eslint/no-require-imports */

const chalk = require('chalk');
const { format, getFileInfo, resolveConfig } = require('prettier');

const prefix = chalk.magenta('[@kub/mirage]') + chalk.reset('');
const APP_DIR = 'app';
const ROOT_MIRAGE_DIR = 'mirage';
const FACTORIES_DIR = 'factories';
const FIXTURES_DIR = 'fixtures';
const MODELS_DIR = 'models';
const SCENARIOS_DIR = 'scenarios';
const SERIALIZERS_DIR = 'serializers';

async function formatFile(filePath, content) {
  const prettierConfig = await resolveConfig(filePath);
  const { ignored, inferredParser } = await getFileInfo(filePath, {
    ...prettierConfig,
    withNodeModules: true,
  });

  if (ignored) {
    return content;
  }

  return format(content, {
    ...prettierConfig,
    parser: inferredParser,
  });
}

function findUp(file, dir = process.cwd()) {
  const { dirname, join } = require('path');
  const { existsSync } = require('fs');

  if (existsSync(join(dir, file))) {
    return join(dir, file);
  }

  const parentDir = dirname(dir);
  if (parentDir === dir) {
    return null;
  }

  return findUp(file, parentDir);
}

module.exports = {
  APP_DIR,
  FACTORIES_DIR,
  FIXTURES_DIR,
  MODELS_DIR,
  ROOT_MIRAGE_DIR,
  SCENARIOS_DIR,
  SERIALIZERS_DIR,
  findUp,
  formatFile,
  prefix,
};

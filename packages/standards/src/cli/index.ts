import { LogLevel } from '@nrg-ui/cli/logger';
import { readFileSync } from 'fs';
import { join } from 'path';
import { satisfies } from 'semver';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import logger, { setLogLevel } from '../logging.js';
import migrate from './commands/migrate.js';

const MIN_NODE_VERSION = '^20.11.0';

export function checkNodeVersion() {
  const nodeVersion = process.version;

  if (!satisfies(nodeVersion, MIN_NODE_VERSION)) {
    logger.error(
      `Node.js ${logger.palette.warn(MIN_NODE_VERSION)} ${logger.palette.error(' is not supported. Please use Node.js ')} ${logger.palette.warn('v20.11.0')} ${logger.palette.error(' or later.')}`,
    );
  }
}

export async function run() {
  checkNodeVersion();

  const pkg = JSON.parse(
    readFileSync(join(import.meta.dirname, '../../package.json'), 'utf-8'),
  );

  await yargs(hideBin(process.argv))
    .option('log-level', {
      alias: 'l',
      choices: Object.keys(LogLevel),
      default: 'info',
      description: 'Run with verbose logging',
    })
    .command(migrate)
    .middleware([setupLogging])
    .demandCommand(1, '')
    .help()
    .group(['log-level', 'help', 'version'], 'Global:')
    .version(pkg.version)
    .strict()
    .parse();
}

function setupLogging(argv: { logLevel: string }) {
  setLogLevel(LogLevel[argv.logLevel as keyof typeof LogLevel]);
}

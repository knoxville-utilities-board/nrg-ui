import chalk from 'chalk';
import { readFileSync } from 'fs';
import { join } from 'path';
import { satisfies } from 'semver';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { LogLevel, setLogLevel } from '../logging.js';
import migrate from './commands/migrate.js';
export function checkNodeVersion() {
    const nodeVersion = process.version;
    if (!satisfies(nodeVersion, '>=20')) {
        console.error(chalk.red('Node.js ') +
            chalk.yellow(nodeVersion) +
            chalk.red(' is not supported. Please use Node.js ') +
            chalk.yellow('v20') +
            chalk.red(' or later.'));
        process.exit(1);
    }
}
export function getVersion() {
    const pkg = JSON.parse(readFileSync(join(import.meta.dirname, '../../package.json'), 'utf-8'));
    return pkg.version;
}
export async function run() {
    checkNodeVersion();
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
        .version(getVersion())
        .strict()
        .parse();
}
function setupLogging(argv) {
    setLogLevel(LogLevel[argv.logLevel]);
}

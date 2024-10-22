import chalk from 'chalk';
import { exit } from 'process';

export const prefix = chalk.blue('[@nrg-ui/lint] ');
const orange = chalk.hex('#FF8200');

export function missing(dep: string, location?: string) {
  warn(`Missing dependency: \`${chalk.red(dep)}\`${orange('...')}`);
  if (location) {
    warn(`  Called from ${location}`);
  }
}

export function missingRequired(dep: string, location?: string) {
  error(
    `Missing required dependency: \`${chalk.yellow(dep)}\`${chalk.red('...')}` +
      (location ? `\n  Called from ${location}` : ''),
  );
}

export function warn(message: string) {
  console.warn(prefix + orange(message));
}

export function error(message: string): never {
  console.error(prefix + chalk.red(message));

  exit(1);
}

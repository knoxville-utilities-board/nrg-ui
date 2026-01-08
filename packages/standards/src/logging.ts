import chalk from 'chalk';
import { exit } from 'process';

export const prefix = chalk.blue('[@nrg-ui/standards] ');
const orange = chalk.hex('#FF8200');

export const LogLevel = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

function split(messages: unknown[]) {
  return messages
    .map(String)
    .map((message) => message.split('\n').map((line, i) => (i ? '  ' : '') + line))
    .flat();
}

export class Logger {
  prefix: string;
  logLevel: number = LogLevel.info;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  debug(...messages: unknown[]) {
    if (this.logLevel >= LogLevel.debug) {
      messages = split(messages);
      for (const message of messages) {
        console.debug(prefix + chalk.magenta(message));
      }
    }
  }

  info(...messages: unknown[]) {
    if (this.logLevel >= LogLevel.info) {
      messages = split(messages);
      for (const message of messages) {
        console.info(prefix + chalk.green(message));
      }
    }
  }

  warn(...messages: unknown[]) {
    if (this.logLevel >= LogLevel.warn) {
      messages = split(messages);
      for (const message of messages) {
        console.warn(prefix + orange(message));
      }
    }
  }

  error(exitCode: number, ...messages: unknown[]): never;
  error(...messages: unknown[]): never;
  error(exitCodeOrMessage: unknown, ...messages: unknown[]): never {
    const hasExitCode = typeof exitCodeOrMessage === 'number';

    if (!hasExitCode) {
      messages.unshift(exitCodeOrMessage);
    }

    if (this.logLevel >= LogLevel.error) {
      messages = split(messages);
      for (const message of messages) {
        console.error(prefix + chalk.red(message));
      }
    }

    exit(hasExitCode ? exitCodeOrMessage : 1);
  }

  missing(dep: string, location?: string) {
    this.warn(`Missing dependency: \`${chalk.red(dep)}\`${orange('...')}`);
    if (location) {
      this.warn(`  Called from ${location}`);
    }
  }

  missingRequired(dep: string, location?: string) {
    this.error(
      `Missing required dependency: \`${chalk.yellow(dep)}\`${chalk.red('...')}` +
        (location ? `\n  Called from ${location}` : ''),
    );
  }
}

const logger = new Logger(prefix);

export default logger;

export function setLogLevel(level: number) {
  logger.logLevel = level;
}

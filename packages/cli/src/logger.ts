import chalk from 'chalk';
import { exit } from 'process';

import type { ChalkInstance } from 'chalk';

export const prefix = chalk.blue('[@nrg-ui] ');
export const orange = chalk.hex('#FF8200');

export const LogLevel = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

export type Palette = {
  debug: ChalkInstance;
  info: ChalkInstance;
  warn: ChalkInstance;
  error: ChalkInstance;
};

const colorPalette: Palette = Object.freeze({
  debug: chalk.magenta,
  info: chalk.green,
  warn: chalk.yellow,
  error: chalk.red,
});

function split(messages: unknown[]) {
  return messages
    .map(String)
    .map((message) =>
      message.split('\n').map((line, i) => (i ? '  ' : '') + line),
    )
    .flat();
}

const indentLevel = ' '.repeat(2);

export class Logger {
  prefix: string;
  palette: Palette;
  logLevel: number = LogLevel.info;
  indentation = '';

  constructor(prefix: string, palette: Partial<Palette> = colorPalette) {
    this.prefix = prefix;
    this.palette = { ...colorPalette, ...palette };
  }

  indent(message: unknown) {
    return this.indentation + message;
  }

  log(message: unknown, error: boolean = false) {
    const stream = error ? console.error : console.log;

    stream(prefix + this.indent(message));
  }

  group(logLevel: number, ...messages: unknown[]) {
    if (this.logLevel >= logLevel) {
      messages = split(messages);
      for (const message of messages) {
        this.log(prefix + message, logLevel === LogLevel.error);
      }
      this.indentation += indentLevel;
    }
  }

  ungroup() {
    this.indentation = this.indentation.slice(0, -indentLevel.length);
  }

  debug(...messages: unknown[]) {
    if (this.logLevel >= LogLevel.debug) {
      messages = split(messages);
      for (const message of messages) {
        this.log(this.palette['debug'](message));
      }
    }
  }

  info(...messages: unknown[]) {
    if (this.logLevel >= LogLevel.info) {
      messages = split(messages);
      for (const message of messages) {
        this.log(this.palette['info'](message));
      }
    }
  }

  warn(...messages: unknown[]) {
    if (this.logLevel >= LogLevel.warn) {
      messages = split(messages);
      for (const message of messages) {
        this.log(this.palette['warn'](message));
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
        this.log(this.palette['error'](message), true);
      }
    }

    exit(hasExitCode ? exitCodeOrMessage : 1);
  }
}

const logger = new Logger(prefix);

export default logger;

export function setLogLevel(level: number) {
  logger.logLevel = level;
}

export function setPrefix(newPrefix: string) {
  logger.prefix = newPrefix;
}

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
function split(messages) {
    return messages
        .map(String)
        .map((message) => message.split('\n').map((line, i) => (i ? '  ' : '') + line))
        .flat();
}
export class Logger {
    constructor(prefix) {
        this.logLevel = LogLevel.info;
        this.prefix = prefix;
    }
    debug(...messages) {
        if (this.logLevel >= LogLevel.debug) {
            messages = split(messages);
            for (const message of messages) {
                console.debug(prefix + chalk.magenta(message));
            }
        }
    }
    info(...messages) {
        if (this.logLevel >= LogLevel.info) {
            messages = split(messages);
            for (const message of messages) {
                console.info(prefix + chalk.green(message));
            }
        }
    }
    warn(...messages) {
        if (this.logLevel >= LogLevel.warn) {
            messages = split(messages);
            for (const message of messages) {
                console.warn(prefix + orange(message));
            }
        }
    }
    error(exitCodeOrMessage, ...messages) {
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
    missing(dep, location) {
        this.warn(`Missing dependency: \`${chalk.red(dep)}\`${orange('...')}`);
        if (location) {
            this.warn(`  Called from ${location}`);
        }
    }
    missingRequired(dep, location) {
        this.error(`Missing required dependency: \`${chalk.yellow(dep)}\`${chalk.red('...')}` +
            (location ? `\n  Called from ${location}` : ''));
    }
}
const logger = new Logger(prefix);
export default logger;
export function setLogLevel(level) {
    logger.logLevel = level;
}

import { Logger, setPrefix } from '@nrg-ui/cli/logger';
import chalk from 'chalk';

const prefix = chalk.blue('[@nrg-ui/standards] ');

class StandardsLogger extends Logger {
  missing(dep: string, location?: string) {
    this.warn(`Missing dependency: \`${this.palette.error(dep)}\`${this.palette.warn('...')}`);
    if (location) {
      this.warn(`  Called from ${location}`);
    }
  }

  missingRequired(dep: string, location?: string) {
    this.error(
      `Missing required dependency: \`${this.palette.warn(dep)}\`${this.palette.error('...')}` +
        (location ? `\n  Called from ${location}` : ''),
    );
  }
}

const logger = new StandardsLogger(prefix);

setPrefix(prefix);

export default logger;

export function setLogLevel(level: number) {
  logger.logLevel = level;
}

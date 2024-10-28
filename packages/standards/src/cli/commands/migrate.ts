import logger from '../../logging.js';
import { migrate as migrateEslint } from './tools/eslint.js';

import type { CommandBuilder, CommandModule, MiddlewareFunction } from 'yargs';

const availableTools = ['eslint'] as const;
type IncludeOptions = ['all', ...typeof availableTools];
type IncludeOption = IncludeOptions[number];

export interface MigrateOptions {
  include: IncludeOption[];
}

class MigrateCommandModule implements CommandModule<unknown, MigrateOptions> {
  command = 'migrate';
  describe = 'Migrate supported configurations to new standards';

  builder: CommandBuilder<unknown, MigrateOptions> = {
    include: {
      alias: 'i',
      choices: ['all', ...availableTools],
      default: 'all',
      defaultDescription: 'All available tools',
      description: 'Which tool(s) to migrate',
    },
  };

  validate: MiddlewareFunction<MigrateOptions> = (argv) => {
    if (typeof argv.include === 'string') {
      argv.include = [argv.include];
    }
    if (argv.include.includes('all') && argv.include.length > 1) {
      logger.error('Cannot specify other tools when using `all`');
    }
    if (argv.include[0] === 'all') {
      argv.include = [...availableTools];
    }
  };

  async handler(options: MigrateOptions) {
    if (options.include.includes('eslint')) {
      await migrateEslint();
    }
  }

  middlewares: MiddlewareFunction<MigrateOptions>[] = [this.validate];
}

const module = new MigrateCommandModule();

export default module;

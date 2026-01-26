import logger from '../../logging.js';
import { migrate as migrateEslint } from './tools/eslint.js';
const availableTools = ['eslint'];
class MigrateCommandModule {
    constructor() {
        this.command = 'migrate';
        this.describe = 'Migrate supported configurations to new standards';
        this.builder = {
            include: {
                alias: 'i',
                choices: ['all', ...availableTools],
                default: 'all',
                defaultDescription: 'All available tools',
                description: 'Which tool(s) to migrate',
            },
        };
        this.validate = (argv) => {
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
        this.middlewares = [this.validate];
    }
    async handler(options) {
        if (options.include.includes('eslint')) {
            await migrateEslint();
        }
    }
}
const module = new MigrateCommandModule();
export default module;

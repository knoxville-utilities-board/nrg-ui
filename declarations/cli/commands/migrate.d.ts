import type { CommandBuilder, CommandModule, MiddlewareFunction } from 'yargs';
declare const availableTools: readonly ["eslint"];
type IncludeOptions = ['all', ...typeof availableTools];
type IncludeOption = IncludeOptions[number];
export interface MigrateOptions {
    include: IncludeOption[];
}
declare class MigrateCommandModule implements CommandModule<unknown, MigrateOptions> {
    command: string;
    describe: string;
    builder: CommandBuilder<unknown, MigrateOptions>;
    validate: MiddlewareFunction<MigrateOptions>;
    handler(options: MigrateOptions): Promise<void>;
    middlewares: MiddlewareFunction<MigrateOptions>[];
}
declare const module: MigrateCommandModule;
export default module;

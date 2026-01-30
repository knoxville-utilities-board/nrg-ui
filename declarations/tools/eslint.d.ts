import allGlobals from 'globals';
import type { Linter } from 'eslint';
export declare const defaultJsIgnores: string[];
export declare const defaultTsIgnores: string[];
export declare class Config {
    #private;
    get hasTypescript(): boolean;
    get hasTemplateImports(): boolean;
    get isEmberApp(): boolean;
    get isEmberAddon(): boolean;
    hasDependency(dep: string, message?: string): boolean;
    hasDependencies(deps: string[], message?: string): boolean;
    get supportsEmberTemplateTags(): boolean;
    rules: {
        ignore: (files?: string[]) => Linter.Config[];
        base: (globals?: (keyof typeof allGlobals)[]) => Promise<Linter.Config[]>;
        ember: () => Promise<Linter.Config[]>;
        js: (globals?: (keyof typeof allGlobals)[], rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        ts: (globals?: (keyof typeof allGlobals)[], rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        gjs: (rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        gts: (rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        scripts: (globs: string[], rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        tests: (rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        custom: (name: string, options: Partial<Linter.Config>) => Promise<Linter.Config[]>;
    };
}
declare const _default: Config;
export default _default;

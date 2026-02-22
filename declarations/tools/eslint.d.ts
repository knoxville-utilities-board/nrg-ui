import allGlobals from 'globals';
import type { Linter } from 'eslint';
interface Nothing {
}
/**
 * Borrowed from Shiki.js <https://github.com/shikijs/shiki/blob/213f19bf464423795f20ce51fe73fe7bb5d45e00/packages/types/src/utils.ts#L7-L14>
 *
 * type StringLiteralUnion<'foo'> = 'foo' | string
 * This has auto completion whereas `'foo' | string` doesn't
 * Adapted from https://github.com/microsoft/TypeScript/issues/29729
 */
export type StringLiteralUnion<T extends U, U = string> = T | (U & Nothing);
export type Global = keyof typeof allGlobals;
export type AnyGlobal = StringLiteralUnion<Global>;
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
        base: (globals?: AnyGlobal[]) => Promise<Linter.Config[]>;
        ember: () => Promise<Linter.Config[]>;
        js: (globals?: AnyGlobal[], rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        ts: (globals?: AnyGlobal[], rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        gjs: (rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        gts: (rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        scripts: (globs: string[], rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        tests: (rules?: Linter.RulesRecord) => Promise<Linter.Config[]>;
        custom: (name: string, options: Partial<Linter.Config>) => Promise<Linter.Config[]>;
    };
}
declare const _default: Config;
export default _default;

import type { Config as PrettierConfig } from 'prettier';
export type Parser = PrettierConfig['parser'];
type RawOverrideRule = Exclude<PrettierConfig['overrides'], undefined>[number];
type OverrideRule = Omit<RawOverrideRule, 'options'> & {
    options: {
        [key: string]: unknown;
        parser?: Parser;
        plugins?: string[];
    };
};
type ConfigBuilder = {
    config: typeof prettier;
    html: () => Promise<OverrideRule>;
    css: () => Promise<OverrideRule>;
    java: () => Promise<OverrideRule>;
    md: () => Promise<OverrideRule>;
    ember: () => Promise<OverrideRule>;
    tsql: () => Promise<OverrideRule>;
};
export declare function html(): Promise<OverrideRule>;
export declare function css(): Promise<OverrideRule>;
export declare function java(): Promise<OverrideRule>;
export declare function md(): Promise<OverrideRule>;
export declare function ember(): Promise<OverrideRule>;
export declare function tsql(): Promise<OverrideRule>;
export declare function prettier(...rulesets: (OverrideRule | Promise<OverrideRule>)[]): Promise<PrettierConfig>;
export declare const builder: ConfigBuilder;
export default builder;

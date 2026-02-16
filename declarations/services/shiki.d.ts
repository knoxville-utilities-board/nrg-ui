import Service from '@ember/service';
import type { BundledLanguage, BundledTheme, CodeToHastOptions, HighlighterCore } from 'shiki';
export type AllowedLanguage = BundledLanguage | 'glimmer-template' | 'plaintext';
export interface ShikiServiceOptions {
    defaultLightTheme?: BundledTheme;
    defaultDarkTheme?: BundledTheme;
    cssVariablePrefix?: string;
}
export interface HighlightedCode {
    html: string;
    isRendered: boolean;
    background: {
        light: string;
        dark: string;
    };
}
export default class ShikiService extends Service {
    highlighter?: HighlighterCore;
    loadedThemes?: BundledTheme[];
    defaultLightTheme: BundledTheme;
    defaultDarkTheme: BundledTheme;
    cssVariablePrefix: string;
    initialize: import("ember-concurrency").TaskForAsyncTaskFunction<unknown, (options?: ShikiServiceOptions) => Promise<void>>;
    highlight(code: string, lang: AllowedLanguage, options?: Partial<CodeToHastOptions>): HighlightedCode;
    extractBackgroundColor(style: string, theme: 'light' | 'dark'): string;
}

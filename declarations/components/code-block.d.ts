import Component from '@glimmer/component';
import type ShikiService from '../services/shiki.ts';
import type { AllowedLanguage } from '../services/shiki.ts';
import type ThemeService from '@nrg-ui/core/services/theme';
import type { CodeToHastOptions } from 'shiki';
import '../assets/code-block.css';
export interface CodeBlockSignature {
    Element: HTMLElement;
    Args: {
        code: string;
        label?: string;
        lang: AllowedLanguage;
        name?: string;
        showCopyButton?: boolean;
        model?: object;
        options?: Partial<CodeToHastOptions>;
        showLineNumbers?: boolean;
        startingLineNumber?: number;
        inline?: boolean;
    };
    Blocks: {
        name?: [];
    };
}
export default class CodeBlock extends Component<CodeBlockSignature> {
    theme: ThemeService;
    shiki: ShikiService;
    get resolvedCode(): string;
    get code(): import("../services/shiki.ts").HighlightedCode;
    get hasName(): boolean;
    get name(): string | undefined;
    get style(): import("@ember/template").TrustedHTML;
    get showCopyButton(): boolean;
}
export interface TypeCodeBlockSignature {
    Element: HTMLElement;
    Args: {
        code: string;
        label?: string;
        inline?: boolean;
        showCopyButton?: boolean;
        options?: Partial<CodeToHastOptions>;
    };
}
export declare class TypeCodeBlock extends Component<TypeCodeBlockSignature> {
    get options(): Partial<CodeToHastOptions>;
}

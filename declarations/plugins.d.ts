import type { Plugin } from 'vite';
export interface SnippetExtractorOptions {
    filter?: string | string[];
}
export declare function extractCodeBlocks(options?: SnippetExtractorOptions): Plugin;

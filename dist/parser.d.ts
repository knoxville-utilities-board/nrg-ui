import type { SnippetEntry } from './types.ts';
export declare function extractSnippetsFromCode(file: string, code: string, startRegex: RegExp, endRegex: RegExp): SnippetEntry[];

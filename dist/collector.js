import { createFilter } from '@rollup/pluginutils';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { globSync } from 'tinyglobby';
import { extractSnippetsFromCode } from './parser.js';
export function collectAllSnippets(options) {
    const { include, exclude, markers: { start, end }, } = options;
    const filter = createFilter(include, exclude);
    const snippets = new Map();
    const files = globSync(include, {
        ignore: exclude,
        cwd: options.rootDir,
    });
    for (const file of files) {
        const abs = resolve(file);
        if (!filter(abs)) {
            continue;
        }
        const code = readFileSync(abs, 'utf8');
        const entries = extractSnippetsFromCode(file, code, start, end);
        for (const entry of entries) {
            if (snippets.has(entry.name)) {
                const existing = snippets.get(entry.name);
                existing.code += '\n' + entry.code;
                existing.sources.push(...entry.sources);
            }
            else {
                snippets.set(entry.name, entry);
            }
        }
    }
    return snippets;
}

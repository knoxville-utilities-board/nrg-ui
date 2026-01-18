import { createFilter } from '@rollup/pluginutils';
import { relative } from 'node:path';
import { cwd } from 'node:process';
import { collectAllSnippets } from './collector.js';
import { virtualModule } from './index.js';
import { extractSnippetsFromCode } from './parser.js';
const defaultOptions = {
    include: ['app/**/*', 'src/**/*'],
    exclude: ['node_modules/**', 'dist/**'],
    rootDir: cwd(),
    markers: {
        start: /\bBEGIN-SNIPPET\s+(\S+)\b/,
        end: /\bEND-SNIPPET\b/,
    },
};
export default function codeSnippetsPlugin(options = {}) {
    const finalOptions = {
        ...defaultOptions,
        ...options,
        markers: {
            ...defaultOptions.markers,
            ...options.markers,
        },
    };
    let snippets = new Map();
    const resolvedVirtualModuleId = '\0' + virtualModule;
    const filter = createFilter(finalOptions.include, finalOptions.exclude);
    return {
        name: 'vite-plugin-code-snippets',
        enforce: 'pre',
        buildStart() {
            snippets = collectAllSnippets(finalOptions);
        },
        resolveId: (id) => {
            if (id === virtualModule) {
                return resolvedVirtualModuleId;
            }
        },
        load(id) {
            if (id === resolvedVirtualModuleId) {
                return `export default ${JSON.stringify(Object.fromEntries(snippets.entries()), null, 2)};`;
            }
        },
        async handleHotUpdate(ctx) {
            if (!filter(ctx.file)) {
                return;
            }
            const relativePath = relative(finalOptions.rootDir, ctx.file);
            const code = await ctx.read();
            for (const [name, entry] of snippets.entries()) {
                entry.sources = entry.sources.filter((s) => s.location.file !== relativePath);
                entry.code = entry.sources.map((s) => s.code).join('\n');
                if (entry.sources.length === 0) {
                    snippets.delete(name);
                }
            }
            const updated = extractSnippetsFromCode(ctx.file, code, finalOptions.markers.start, finalOptions.markers.end);
            for (const entry of updated) {
                if (snippets.has(entry.name)) {
                    const existing = snippets.get(entry.name);
                    existing.code += '\n' + entry.code;
                    existing.sources.push(...entry.sources);
                }
                else {
                    snippets.set(entry.name, entry);
                }
            }
            ctx.server.moduleGraph.invalidateModule(ctx.server.moduleGraph.getModuleById(resolvedVirtualModuleId));
            return [ctx.server.moduleGraph.getModuleById(resolvedVirtualModuleId)];
        },
    };
}

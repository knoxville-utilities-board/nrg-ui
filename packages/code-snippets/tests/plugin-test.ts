import { mkdir, mkdtemp, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { createServer } from 'vite';
import { describe, expect, it } from 'vitest';

import { virtualModule } from '../src/index.js';
import codeSnippetsPlugin from '../src/plugin.js';

import type { CodeSnippetsPluginOptions, SnippetEntry } from '../src/types.js';
import type { Plugin, ViteDevServer } from 'vite';

const fixturesDir = join(__dirname, 'fixtures');

async function createTempProject(files: Record<string, string>) {
  const dir = await mkdtemp(join(tmpdir(), 'vite-hmr-'));

  for (const [file, contents] of Object.entries(files)) {
    const abs = join(dir, file);
    await mkdir(dirname(abs), { recursive: true });
    await writeFile(abs, contents);
  }

  return dir;
}

async function standupServer(
  cb: (server: ViteDevServer, dir: string) => Promise<unknown>,
  options: CodeSnippetsPluginOptions = {},
) {
  const dir = await createTempProject({
    'src/example.js': `
        // BEGIN-SNIPPET demo
        console.log("A");
        // END-SNIPPET
      `,
  });

  const server = await createServer({
    root: dir,
    configFile: false,
    logLevel: 'silent',
    plugins: [
      codeSnippetsPlugin({
        include: [join(dir, 'src/**')],
        ...options,
      }),
    ],
  });
  try {
    await server.listen();

    await cb(server, dir);
  } finally {
    await server.close();
    await rm(dir, { recursive: true, force: true });
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('vite-plugin-code-snippets', () => {
  it('resolves the virtual module ID', async () => {
    const plugin = codeSnippetsPlugin() as Plugin;
    let resolved = await (
      plugin.resolveId as (id: string) => Promise<string | undefined>
    )?.(virtualModule);

    expect(resolved).toBe(`\0${virtualModule}`);
    resolved = await (
      plugin.resolveId as (id: string) => Promise<string | undefined>
    )?.('different-module');

    expect(resolved).toBeUndefined();
  });

  it('exposes snippets in virtual module', async () => {
    const server = await createServer({
      root: fixturesDir,
      logLevel: 'silent',
      plugins: [
        codeSnippetsPlugin({
          include: ['tests/**/*.js'],
          exclude: [],
          markers: {
            start: /\bBEGIN-SNIPPET\s+(\S+)\b/,
            end: /\bEND-SNIPPET\b/,
          },
        }),
      ],
    });
    await server.pluginContainer.buildStart();

    let mod: unknown = await server.pluginContainer.load(`\0${virtualModule}`);
    await expect(mod).toMatchFileSnapshot(join(fixturesDir, 'module.snap'));

    mod = await server.pluginContainer.load('different-module');
    expect(mod).toBeNull();

    await server.close();
  });

  it('updates snippet map when source file changes', async () => {
    await standupServer(async (server, dir) => {
      let { demo: snippet } = (await server.ssrLoadModule(virtualModule))
        .default as Record<string, SnippetEntry>;
      expect(snippet.name).toBe('demo');
      expect(snippet.code).toContain(`console.log("A");`);

      await writeFile(
        join(dir, 'src/example.js'),
        `
        // BEGIN-SNIPPET new-demo
        console.log("B");
        // END-SNIPPET
        // BEGIN-SNIPPET new-demo
        console.log("C");
        // END-SNIPPET
        `,
      );

      await server.watcher.emit('change', join(dir, 'src/example.js'));

      await sleep(50);

      ({ 'new-demo': snippet } = (await server.ssrLoadModule(virtualModule))
        .default as Record<string, SnippetEntry>);

      expect(snippet.name).toBe('new-demo');
      expect(snippet.code).toContain(`console.log("B");`);
      expect(snippet.code).toContain(`console.log("C");`);
    });
  }, 15_000);

  it('updates snippet map when multiple source files change', async () => {
    await standupServer(async (server, dir) => {
      let { demo: snippet } = (await server.ssrLoadModule(virtualModule))
        .default as Record<string, SnippetEntry>;
      expect(snippet.name).toBe('demo');
      expect(snippet.code).toContain(`console.log("A");`);

      await writeFile(
        join(dir, 'src/example.js'),
        `
        // BEGIN-SNIPPET new-demo
        console.log("B");
        // END-SNIPPET
        // BEGIN-SNIPPET new-demo
        console.log("C");
        // END-SNIPPET
        `,
      );
      await writeFile(
        join(dir, 'src/example-2.js'),
        `
        // BEGIN-SNIPPET new-demo
        console.log("D");
        // END-SNIPPET
        `,
      );

      await server.watcher.emit('change', join(dir, 'src/example.js'));
      await server.watcher.emit('change', join(dir, 'src/example-2.js'));

      await sleep(50);

      ({ 'new-demo': snippet } = (await server.ssrLoadModule(virtualModule))
        .default as Record<string, SnippetEntry>);

      expect(snippet.name).toBe('new-demo');
      expect(snippet.code).toContain(`console.log("B");`);
      expect(snippet.code).toContain(`console.log("C");`);
      expect(snippet.code).toContain(`console.log("D");`);

      expect(snippet.sources[0].location.file).toContain('example.js');
      expect(snippet.sources[1].location.file).toContain('example.js');
      expect(snippet.sources[2].location.file).toContain('example-2.js');
    });
  }, 15_000);

  it(`excluded files don't get included in the snippets`, async () => {
    await standupServer(async (server, dir) => {
      let { demo: snippet } = (await server.ssrLoadModule(virtualModule))
        .default as Record<string, SnippetEntry>;
      expect(snippet.code).toContain(`console.log("A");`);

      await server.watcher.emit('change', join(dir, 'ignore-me/example.js'));

      await sleep(50);

      ({ demo: snippet } = (await server.ssrLoadModule(virtualModule))
        .default as Record<string, SnippetEntry>);

      expect(snippet.code).not.toContain(`console.log("B");`);
    });
  });
});

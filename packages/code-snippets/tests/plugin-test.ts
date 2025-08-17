import { mkdir, mkdtemp, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { Plugin, ViteDevServer, createServer } from 'vite';
import { describe, expect, it } from 'vitest';

import codeSnippetsPlugin from '../src/plugin.js';
import { CodeSnippetsPluginOptions, SnippetEntry } from '../src/types.js';

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
    const id = 'virtual:code-snippets';
    const resolved = await (
      plugin.resolveId as (id: string) => Promise<string | undefined>
    )?.(id);

    expect(resolved).toBe('\0virtual:code-snippets');
  });

  // vi.doUnmock('path');

  it('exposes snippets in virtual module', async () => {
    const server = await createServer({
      root: fixturesDir,
      logLevel: 'silent',
      plugins: [
        codeSnippetsPlugin({
          include: ['**/*.js'],
          exclude: [],
          markers: {
            start: /\bBEGIN-SNIPPET\s+(\S+)\b/,
            end: /\bEND-SNIPPET\b/,
          },
        }),
      ],
    });
    await server.pluginContainer.buildStart();

    const mod = await server.pluginContainer.load('\0virtual:code-snippets');
    await expect(mod).toMatchFileSnapshot(join(fixturesDir, 'module.snap'));

    await server.close();
  });

  it('updates snippet map when source file changes', async () => {
    await standupServer(async (server, dir) => {
      let [snippets] = (await server.ssrLoadModule('virtual:code-snippets'))
        .default as SnippetEntry[];
      expect(snippets.code).toContain(`console.log("A");`);

      await writeFile(
        join(dir, 'src/example.js'),
        `
        // BEGIN-SNIPPET demo
        console.log("B");
        // END-SNIPPET
        // BEGIN-SNIPPET demo
        console.log("C");
        // END-SNIPPET
        `,
      );

      await server.watcher.emit('change', join(dir, 'src/example.js'));

      await sleep(50);

      [snippets] = (await server.ssrLoadModule('virtual:code-snippets'))
        .default as SnippetEntry[];

      expect(snippets.code).toContain(`console.log("B");`);
      expect(snippets.code).toContain(`console.log("C");`);
    });
  }, 15_000);

  it(`excluded files don't get included in the snippets`, async () => {
    await standupServer(async (server, dir) => {
      let [snippets] = (await server.ssrLoadModule('virtual:code-snippets'))
        .default as SnippetEntry[];
      expect(snippets.code).toContain(`console.log("A");`);

      await server.watcher.emit('change', join(dir, 'ignore-me/example.js'));

      await sleep(50);

      [snippets] = (await server.ssrLoadModule('virtual:code-snippets'))
        .default as SnippetEntry[];

      expect(snippets.code).not.toContain(`console.log("B");`);
    });
  });
});

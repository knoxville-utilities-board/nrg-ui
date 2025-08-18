import { describe, expect, it, vi } from 'vitest';

import { collectAllSnippets } from '../src/collector.js';

import type { CodeSnippetsPluginOptions, DeepRequired } from '../src/types.ts';

const fsMocks = vi.hoisted(() => {
  return {
    readFileSync: vi.fn().mockImplementation(() => ''),
  };
});
const pathMocks = vi.hoisted(() => {
  return {
    resolve: vi.fn().mockImplementation((...args: string[]) => args.join('/')),
  };
});

vi.mock('tinyglobby', async (awaitImport) => {
  const actual = (await awaitImport()) as object;

  return {
    ...actual,
    globSync: vi.fn().mockReturnValue(['a.js', 'b.js']),
  };
});

vi.mock('node:fs', () => {
  return {
    ...fsMocks,
    default: fsMocks,
  };
});
vi.mock('path', () => {
  return {
    ...pathMocks,
    default: pathMocks,
  };
});

describe('collectAllSnippets', () => {
  const options: DeepRequired<CodeSnippetsPluginOptions> = {
    include: ['**/*'],
    exclude: [],
    markers: {
      start: /\bBEGIN-SNIPPET\s+(\S+)\b/,
      end: /\bEND-SNIPPET\b/,
    },
  };

  it('exclude works', () => {
    const result = collectAllSnippets({
      ...options,
      exclude: ['**/*'],
    });

    expect(result.size).toBe(0);
  });

  it('collects snippets from multiple files', async () => {
    fsMocks.readFileSync
      .mockReturnValueOnce('// BEGIN-SNIPPET one\nA\n// END-SNIPPET')
      .mockReturnValueOnce('// BEGIN-SNIPPET two\nB\n// END-SNIPPET');

    const result = collectAllSnippets(options);

    expect(result.size).toBe(2);

    let entry = result.get('one')!;
    expect(entry.code).toBe('A');

    entry = result.get('two')!;
    expect(entry.code).toBe('B');
  });

  it('merges snippets with same name from the same file', () => {
    fsMocks.readFileSync.mockReturnValueOnce(
      `// BEGIN-SNIPPET same\nA\n// END-SNIPPET\n//BEGIN-SNIPPET same\nB\n// END-SNIPPET`,
    );

    const result = collectAllSnippets(options);
    expect(result.size).toBe(1);

    const entry = result.get('same')!;
    expect(entry.code).toBe('A\nB');

    const [source] = entry.sources;
    expect(source.code).toBe('A');
    expect(source.location.file).toBe('a.js');
    expect(source.location.lines.start).toBe(2);
    expect(source.location.lines.end).toBe(2);
  });

  it('merges snippets with same name from different files', () => {
    fsMocks.readFileSync
      .mockReturnValueOnce('// BEGIN-SNIPPET same\nA\n// END-SNIPPET')
      .mockReturnValueOnce('// BEGIN-SNIPPET same\nB\n// END-SNIPPET');

    const result = collectAllSnippets(options);
    expect(result.size).toBe(1);

    const entry = result.get('same')!;
    expect(entry.code).toBe('A\nB');

    const [source1, source2] = entry.sources;
    expect(source1.code).toBe('A');
    expect(source1.location.file).toBe('a.js');
    expect(source1.location.lines.start).toBe(2);
    expect(source1.location.lines.end).toBe(2);

    expect(source2.code).toBe('B');
    expect(source2.location.file).toBe('b.js');
    expect(source2.location.lines.start).toBe(2);
    expect(source2.location.lines.end).toBe(2);
  });
});

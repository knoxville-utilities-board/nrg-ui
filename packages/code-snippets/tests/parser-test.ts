import { describe, expect, it, vi } from 'vitest';

import { extractSnippetsFromCode } from '../src/parser.js';

describe('extractSnippetsFromCode', () => {
  const startRegex = /\bBEGIN-SNIPPET\s+(\S+)\b/;
  const endRegex = /\bEND-SNIPPET\b/;

  it('extracts a single snippet', () => {
    const code = `
// BEGIN-SNIPPET hello
console.log("Hello");
// END-SNIPPET`;
    const result = extractSnippetsFromCode(
      'file.js',
      code,
      startRegex,
      endRegex,
    );
    expect(result).toHaveLength(1);

    const [snippet] = result;
    expect(snippet.name).toBe('hello');
    expect(snippet.code).toBe('console.log("Hello");');
    expect(snippet.sources).toHaveLength(1);

    expect(snippet.sources[0].location.file).toBe('file.js');
    expect(snippet.sources[0].location.lines.start).toBe(3);
    expect(snippet.sources[0].location.lines.end).toBe(3);
  });

  it('combines snippets with the same name in one file', () => {
    const code = `
// BEGIN-SNIPPET greet
console.log("Hello");
// END-SNIPPET
// BEGIN-SNIPPET greet
console.log("World");
// END-SNIPPET
`;
    const result = extractSnippetsFromCode(
      'file.js',
      code,
      startRegex,
      endRegex,
    );
    expect(result).toHaveLength(1);

    const [snippet] = result;
    expect(snippet.code).toContain('Hello');
    expect(snippet.code).toContain('World');
    expect(snippet.sources).toHaveLength(2);

    const [source1, source2] = snippet.sources;
    expect(source1.location.file).toBe('file.js');
    expect(source1.location.lines.start).toBe(3);
    expect(source1.location.lines.end).toBe(3);

    expect(source2.location.file).toBe('file.js');
    expect(source2.location.lines.start).toBe(6);
    expect(source2.location.lines.end).toBe(6);
  });

  it('ignores unmatched markers', () => {
    const code = `
// BEGIN-SNIPPET foo
console.log("Foo");
`;
    const result = extractSnippetsFromCode(
      'file.js',
      code,
      startRegex,
      endRegex,
    );
    expect(result).toHaveLength(0);
  });

  it('strips leading whitespace', () => {
    const code = `
    // BEGIN-SNIPPET hello
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
    // END-SNIPPET`;

    const result = extractSnippetsFromCode(
      'file.js',
      code,
      startRegex,
      endRegex,
    );
    expect(result).toHaveLength(1);

    const [snippet] = result;
    expect(snippet.name).toBe('hello');
    expect(snippet.code).toBe(
      `for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}`,
    );
    expect(snippet.sources).toHaveLength(1);

    expect(snippet.sources[0].location.file).toBe('file.js');
    expect(snippet.sources[0].location.lines.start).toBe(3);
    expect(snippet.sources[0].location.lines.end).toBe(5);
  });

  it('skips empty snippets', () => {
    const consoleMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => null);

    const code = `
    // BEGIN-SNIPPET hello
    // END-SNIPPET`;

    const result = extractSnippetsFromCode(
      'file.js',
      code,
      startRegex,
      endRegex,
    );
    expect(result).toHaveLength(0);

    expect(consoleMock).toHaveBeenCalledWith(
      `Snippet "hello" in file "file.js" is empty. It will not be included in the output.`,
    );

    consoleMock.mockRestore();
  });
});

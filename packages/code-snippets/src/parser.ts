import type { SnippetEntry, SnippetLocation, SnippetSource } from './types.ts';

export function extractSnippetsFromCode(
  file: string,
  code: string,
  startRegex: RegExp,
  endRegex: RegExp,
): SnippetEntry[] {
  const lines = code.split(/\r?\n/);
  let currentName: string | null = null;
  let currentStart = -1;
  let buffer: string[] = [];
  let whitespace: string | null = null;
  const results: Map<string, SnippetEntry> = new Map();

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    if (currentName === null) {
      const startMatch = line.match(startRegex);
      if (startMatch) {
        const firstLine = lines[idx + 1];
        currentName = startMatch[1];
        currentStart = idx + 2;
        buffer = [];

        whitespace = firstLine?.match(/^(\s+)/)?.[1] ?? '';
      }

      continue;
    }

    if (endRegex.test(line)) {
      if (buffer.length === 0) {
        console.warn(
          `Snippet "${currentName}" in file "${file}" is empty. It will not be included in the output.`,
        );

        currentName = null;
        continue;
      }

      const sourceCode = buffer.join('\n');
      const location: SnippetLocation = {
        file,
        lines: { start: currentStart, end: idx },
      };
      const source: SnippetSource = { code: sourceCode, location };

      const existing = results.get(currentName);
      if (existing) {
        existing.code += '\n' + sourceCode;
        existing.sources.push(source);
      } else {
        results.set(currentName, {
          name: currentName,
          code: sourceCode,
          sources: [source],
        });
      }

      currentName = null;
      buffer = [];

      continue;
    }

    buffer.push(line.replace(new RegExp('^' + whitespace), ''));
  }

  return Array.from(results.values());
}

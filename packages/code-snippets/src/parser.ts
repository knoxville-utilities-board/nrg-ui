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
  const results: Map<string, SnippetEntry> = new Map();

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    if (currentName === null) {
      const startMatch = line.match(startRegex);
      if (startMatch) {
        currentName = startMatch[1];
        currentStart = idx + 2;
        buffer = [];
      }

      continue;
    }

    if (endRegex.test(line)) {
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

    buffer.push(line);
  }

  return Array.from(results.values());
}

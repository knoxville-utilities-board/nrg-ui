# @nrg-ui/code-snippets

Extract code snippets from your source files for runtime rendering in Vite-powered apps.

## Features

- Multiple snippets per file
- Merge snippets from multiple files
- Deterministic ordering
- Hot reload in dev mode
- TypeScript-friendly virtual module

## Installation

```bash
npm install @nrg-ui/code-snippets
```

## Usage

### Configuration

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { codeSnippetsPlugin } from '@nrg-ui/code-snippets';

export default defineConfig({
  plugins: [codeSnippetsPlugin()],
});
```

#### Plugin Options

The plugin can be used out-of-the-box, but can also be configured to suit your needs.

| Option          | Type       | Default                          | Description                                         |
| --------------- | ---------- | -------------------------------- | --------------------------------------------------- |
| `include`       | `string[]` | `['src/**/*', 'app/**/*']`       | Files to include for snippet extraction.            |
| `exclude`       | `string[]` | `['node_modules/**', 'dist/**']` | Files to exclude from snippet extraction.           |
| `rootDir`       | `string`   | `process.cwd()`                  | Root directory to scan for snippets.                |
| `markers.start` | `RegExp`   | `/\bBEGIN-SNIPPET\s+(\S+)\b/`    | Regular expression to match the start of a snippet. |
| `markers.end`   | `RegExp`   | `/\bEND-SNIPPET\b/`              | Regular expression to match the end of a snippet.   |

### Example

Assume the following `src/my-example.ts`:

```ts
import { readFileSync } from 'fs';

// BEGIN-SNIPPET example-snippet
try {
  const content = readFileSync('my-file.json', 'utf-8');
  JSON.parse(content);
} catch (e) {
  console.error('There was an error loading `my-file.json`', e);
}
// END-SNIPPET
```

```ts
import snippets from '@nrg-ui/code-snippets/virtual';

console.log(snippets['example-snippet']);
```

This would log the following object:

```json
{
  "name": "example-snippet",
  "code": "try {\n  const content = readFileSync('my-file.json', 'utf-8');\n  JSON.parse(content);\n} catch (e) {\n  console.error('There was an error loading `my-file.json`', e);\n}",
  "sources": [
    {
      "code": "try {\n  const content = readFileSync('my-file.json', 'utf-8');\n  JSON.parse(content);\n} catch (e) {\n  console.error('There was an error loading `my-file.json`', e);\n}",
      "location": {
        "file": "src/my-example.ts",
        "lines": {
          "start": 4,
          "end": 9
        }
      }
    }
  ]
}
```

Here's an example of using a code snippet in an Ember application:

```gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import snippets from '@nrg-ui/code-snippets/virtual';
import { getHighlighter } from 'shiki';

interface SnippetViewerSignature {
  Args: {
    snippetName: string;
  };
}

export default class SnippetViewer extends Component<SnippetViewerSignature> {
  @tracked
  highlightedCode: string = '';

  async setup() {
    const highlighter = await getHighlighter({ theme: 'nord' });

    const snippet = snippets[this.args.snippetName]?.code ?? '';
    this.highlightedCode = highlighter.codeToHtml(snippet, { lang: 'ts' });
  }

  <template>
    <div class='code-snippet-container'>
      {{{this.highlightedCode}}}
    </div>
  </template>
}
```

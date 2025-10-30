import { assert } from '@ember/debug';
import { failBuild, macroCondition, moduleExists } from '@embroider/macros';
import snippets from '@nrg-ui/code-snippets/virtual';

import type { SnippetEntry } from '@nrg-ui/code-snippets';

if (macroCondition(!moduleExists('@nrg-ui/code-snippets'))) {
  failBuild(
    "You can't use the code snippet helper without the `@nrg-ui/code-snippets` package.",
  );
}

export function codeSnippet(name: string): SnippetEntry {
  const snippet = snippets[name];

  assert(`No code snippet found with the name "${name}".`, snippet);

  return snippet;
}

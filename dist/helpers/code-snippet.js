
import { assert } from '@ember/debug';
import { macroCondition, moduleExists, failBuild } from '@embroider/macros';
import snippets from '@nrg-ui/code-snippets/virtual';

if (macroCondition(!moduleExists('@nrg-ui/code-snippets'))) {
  failBuild("You can't use the code snippet helper without the `@nrg-ui/code-snippets` package.");
}
function codeSnippet(name) {
  const snippet = snippets[name];
  assert(`No code snippet found with the name "${name}".`, snippet);
  return snippet;
}
var codeSnippet_default = {
  codeSnippet
};

export { codeSnippet, codeSnippet_default as default };
//# sourceMappingURL=code-snippet.js.map

import { failBuild, macroCondition, moduleExists } from '@embroider/macros';
import snippets from 'virtual:code-snippets';

if (!macroCondition(moduleExists('@nrg-ui/code-snippets'))) {
  failBuild(
    "You can't use the code snippet helper without the `@nrg-ui/code-snippets` package.",
  );
}

import { service } from '@ember/service';
import BaseService from '@nrg-ui/core/services/theme';

import { syntaxThemes } from '../routes/application.ts';

import type CodeBlock from '../components/code-block';
import type { Theme } from '@nrg-ui/core';
import type EmberFreestyleService from 'ember-freestyle/services/ember-freestyle';

export default class ThemeService extends BaseService {
  @service('ember-freestyle')
  declare freestyle: EmberFreestyleService;

  codeBlocks = new Map<CodeBlock, HTMLElement>();

  setTheme = (theme: Theme) => {
    debugger;
    const previousTheme = this.preferredTheme;

    super.setTheme(theme);
    theme = this.preferredTheme;

    if (previousTheme === theme) {
      return;
    }

    // Install new theme
    this.freestyle.ensureHljsTheme(syntaxThemes[theme]);
    this.freestyle.defaultTheme = syntaxThemes[theme];

    // Remove previous theme
    document
      .querySelector(`[data-hljs-theme=${syntaxThemes[previousTheme]}]`)
      ?.remove();

    for (const [codeBlock, el] of Object.entries(this.codeBlocks)) {
      (codeBlock as unknown as CodeBlock).highlight(el);
    }
  };
}

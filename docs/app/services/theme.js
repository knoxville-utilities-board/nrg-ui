import { service } from '@ember/service';
import BaseService from '@nrg-ui/core/services/theme';

import { syntaxThemes } from '../routes/application.ts';

// This file needs to be a standard JS file - if it's TS, Babel
// seems to ignore this one, therefore not overriding the service
export default class ThemeService extends BaseService {
  @service('ember-freestyle')
  freestyle;

  codeBlocks = new Map();

  setTheme = (theme) => {
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
      codeBlock.highlight(el);
    }
  };
}

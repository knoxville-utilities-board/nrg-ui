import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { timeout } from 'ember-concurrency';

import type ThemeService from '@nrg-ui/core/services/theme';
import type EmberFreestyleService from 'ember-freestyle/services/ember-freestyle';
import type { IntlService } from 'ember-intl';

export const syntaxThemes = {
  light: 'github',
  dark: 'github-dark',
};

export default class ApplicationRoute extends Route {
  @service('ember-freestyle')
  declare freestyle: EmberFreestyleService;

  @service('theme')
  declare theme: ThemeService;

  @service
  declare intl: IntlService;

  async beforeModel() {
    this.intl.setLocale(['en-us']);
    this.theme.load();

    // Simulate a loading delay
    await timeout(2000);

    this.freestyle.hljsThemeUrl = (theme: string) => {
      return `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${theme}.min.css`;
    };
    await this.freestyle.ensureHljs();
    await this.freestyle.ensureHljsLanguage('typescript');

    const displayTheme = syntaxThemes[this.theme.resolvedTheme];
    this.freestyle.ensureHljsTheme(displayTheme);
    this.freestyle.defaultTheme = displayTheme;
  }
}

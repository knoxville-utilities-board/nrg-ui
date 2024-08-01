import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type EmberFreestyleService from 'ember-freestyle/services/ember-freestyle';

const syntaxHighlightingTheme = 'github';

export default class ApplicationRoute extends Route {
  @service('ember-freestyle')
  declare freestyle: EmberFreestyleService;

  async beforeModel() {
    this.freestyle.hljsThemeUrl = (theme: string) => {
      return `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${theme}.min.css`;
    };
    await this.freestyle.ensureHljs();
    this.freestyle.ensureHljsTheme(syntaxHighlightingTheme);
    this.freestyle.defaultTheme = syntaxHighlightingTheme;
  }
}

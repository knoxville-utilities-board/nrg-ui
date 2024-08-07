import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';
import { tracked } from '@glimmer/tracking';

import type EmberFreestyleService from 'ember-freestyle/services/ember-freestyle';

const syntaxHighlightingTheme = 'github';

export default class ApplicationRoute extends Route {
  @service declare router: RouterService;

  @service('ember-freestyle')
  declare freestyle: EmberFreestyleService;

  get currentRoute() {
    return this.router.currentRouteName;
  }

  async beforeModel() {
    this.freestyle.hljsThemeUrl = (theme: string) => {
      return `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${theme}.min.css`;
    };
    await this.freestyle.ensureHljs();
    await this.freestyle.ensureHljsLanguage('typescript');
    this.freestyle.ensureHljsTheme(syntaxHighlightingTheme);
    this.freestyle.defaultTheme = syntaxHighlightingTheme;
  }

  async model() {
    return {
      route: this.currentRoute,
    };
  }
}

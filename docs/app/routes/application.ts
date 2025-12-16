import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type ThemeService from '@nrg-ui/core/services/theme';
import type ShikiService from '@nrg-ui/showcase/services/shiki';
import type { IntlService } from 'ember-intl';

import { formats } from '#app/ember-intl.ts';

export default class ApplicationRoute extends Route {
  @service('theme')
  declare theme: ThemeService;

  @service
  declare intl: IntlService;

  @service
  declare shiki: ShikiService;

  async beforeModel() {
    this.intl.setFormats(formats);
    this.intl.setLocale(['en-us']);
    this.theme.load();

    this.shiki.initialize.perform();
  }
}

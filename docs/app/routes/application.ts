import Route from '@ember/routing/route';
import { service } from '@ember/service';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

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
    this.theme.load();
    this.setupIntl();

    this.shiki.initialize.perform();
  }

  setupIntl() {
    this.intl.addTranslations('en-us', translationsForEnUs);
    this.intl.setFormats(formats);
    this.intl.setLocale('en-us');
  }
}

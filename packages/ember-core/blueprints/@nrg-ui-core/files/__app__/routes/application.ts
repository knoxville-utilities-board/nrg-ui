import Route from '@ember/routing/route';
import { service } from '@ember/service';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

import type ThemeService from '@nrg-ui/core/services/theme';
import type { IntlService } from 'ember-intl';

export default class ApplicationRoute extends Route {
  @service('theme')
  declare theme: ThemeService;

  @service
  declare intl: IntlService;

  async beforeModel() {
    this.theme.load();
    this.setupIntl();
  }

  setupIntl() {
    this.intl.addTranslations('en-us', translationsForEnUs);
    this.intl.setLocale('en-us');
  }
}

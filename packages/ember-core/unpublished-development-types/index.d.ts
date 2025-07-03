// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!

import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';
import 'ember-source/types';

import type CssTransitionsRegistry from 'ember-css-transitions/template-registry';
import type IntlService from 'ember-intl/services/intl';

declare interface MediaService {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isJumbo: boolean;
}

declare module '@glint/environment-ember-loose/registry' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export default interface Registry extends CssTransitionsRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}

declare module '@ember/service' {
  interface Registry {
    intl: IntlService;
  }
}

export interface EmbroiderConfig {
  appVersion: string;
  breakpoints: {
    xsmall: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    xxlarge: string;
  };
}

declare module '@embroider/macros' {
  export function getOwnConfig(): Partial<EmbroiderConfig> | undefined;
}

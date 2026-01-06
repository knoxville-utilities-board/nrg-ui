// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!

import '@glint/ember-tsc/types';
import 'ember-source/types';

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

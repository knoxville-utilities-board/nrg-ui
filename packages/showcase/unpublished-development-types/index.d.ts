// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!
import type { BundledLanguage, BundledTheme } from 'shiki';

import '@glint/ember-tsc/types';
import 'ember-source/types';

export interface EmbroiderOptions {
  imports?: {
    basePath?: string;
  };
  languages?: BundledLanguage[];
  themes?: {
    light?: BundledTheme[];
    dark?: BundledTheme[];
  };
}

declare module '@embroider/macros' {
  function getOwnConfig(): EmbroiderOptions;
}

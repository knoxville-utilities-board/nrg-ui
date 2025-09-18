import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';

import type { IconType, Theme } from '../';
import type Owner from '@ember/owner';

export const themeIcons = {
  light: 'bi-sun-fill',
  dark: 'bi-moon-stars-fill',
  auto: 'bi-circle-half',
} as const as Record<Theme, IconType>;

type OwnerLike = {
  application: {
    modulePrefix: string;
  };
};

export default class ThemeService extends Service {
  @tracked
  declare value: Theme;

  @tracked
  declare resolvedTheme: Exclude<Theme, 'auto'>;

  declare modulePrefix: string;

  constructor(owner: Owner) {
    super(owner);

    this.modulePrefix = (
      owner as unknown as OwnerLike
    ).application.modulePrefix;
  }

  get storageKey() {
    return (this.modulePrefix ? this.modulePrefix + '.' : '') + 'nrg-theme';
  }

  loaded: boolean = false;

  get icon() {
    return themeIcons[this.value];
  }

  load() {
    if (this.loaded) {
      return;
    }
    const theme = this.loadTheme();
    this.setTheme(theme);
    this.loaded = true;
  }

  loadTheme(): Theme {
    const theme = localStorage.getItem(this.storageKey) as Theme | null;
    return theme ?? 'auto';
  }

  @action
  setTheme(theme: Theme) {
    localStorage.setItem(this.storageKey, theme);

    let resolvedTheme = theme;
    if (theme === 'auto') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    if (this.resolvedTheme === resolvedTheme && this.value === theme) {
      return;
    }

    this.value = theme;
    this.resolvedTheme = resolvedTheme as Exclude<Theme, 'auto'>;

    document.body.setAttribute('data-bs-theme', resolvedTheme);
  }
}

declare module '@ember/service' {
  interface Registry {
    theme: ThemeService;
  }
}

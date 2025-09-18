import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';

import type { IconType, Theme } from '../';

export const themeIcons = {
  light: 'bi-sun-fill',
  dark: 'bi-moon-stars-fill',
  auto: 'bi-circle-half',
} as const as Record<Theme, IconType>;

export default class ThemeService extends Service {
  @tracked
  declare value: Theme;

  @tracked
  declare resolvedTheme: Exclude<Theme, 'auto'>;

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
    const theme = localStorage.getItem('nrg-theme') as Theme | null;
    return theme ?? 'auto';
  }

  @action
  setTheme(theme: Theme) {
    this.value = theme;
    localStorage.setItem('nrg-theme', theme);

    let resolvedTheme = theme;
    if (theme === 'auto') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    this.resolvedTheme = resolvedTheme as Exclude<Theme, 'auto'>;

    document.body.setAttribute('data-bs-theme', resolvedTheme);
  }
}

declare module '@ember/service' {
  interface Registry {
    theme: Theme;
  }
}

import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';

import type { Theme } from '../';

export default class ThemeService extends Service {
  @tracked
  theme!: Theme;

  loaded: boolean = false;

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
    this.theme = theme;
    localStorage.setItem('nrg-theme', theme);

    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    const domValue = theme === 'auto' ? preferredTheme : theme;

    document.body.setAttribute('data-bs-theme', domValue);
  }
}

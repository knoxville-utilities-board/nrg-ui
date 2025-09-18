
import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';
import { g, i, n } from 'decorator-transforms/runtime';

const THEME_ICONS = {
  dark: 'bi-moon-stars-fill',
  light: 'bi-sun-fill',
  auto: 'bi-circle-half'
};
class ThemeService extends Service {
  static {
    g(this.prototype, "theme", [tracked]);
  }
  #theme = (i(this, "theme"), void 0);
  static {
    g(this.prototype, "preferredTheme", [tracked]);
  }
  #preferredTheme = (i(this, "preferredTheme"), void 0);
  loaded = false;
  get icon() {
    return THEME_ICONS[this.theme];
  }
  load() {
    if (this.loaded) {
      return;
    }
    const theme = this.loadTheme();
    this.setTheme(theme);
    this.loaded = true;
  }
  loadTheme() {
    const theme = localStorage.getItem('nrg-theme');
    return theme ?? 'auto';
  }
  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('nrg-theme', theme);
    let preferredTheme = theme;
    if (preferredTheme === 'auto') {
      preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    this.preferredTheme = preferredTheme;
    document.body.setAttribute('data-bs-theme', preferredTheme);
  }
  static {
    n(this.prototype, "setTheme", [action]);
  }
  cycle() {
    const preferredTheme = this.preferredTheme;
    const newTheme = preferredTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
  static {
    n(this.prototype, "cycle", [action]);
  }
}

export { THEME_ICONS, ThemeService as default };
//# sourceMappingURL=theme.js.map

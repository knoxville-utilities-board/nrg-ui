import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';
import { g, i, n } from 'decorator-transforms/runtime';

const themeIcons = {
  light: 'bi-sun-fill',
  dark: 'bi-moon-stars-fill',
  auto: 'bi-circle-half'
};
class ThemeService extends Service {
  static {
    g(this.prototype, "value", [tracked]);
  }
  #value = (i(this, "value"), void 0);
  static {
    g(this.prototype, "resolvedTheme", [tracked]);
  }
  #resolvedTheme = (i(this, "resolvedTheme"), void 0);
  constructor(owner) {
    super(owner);
    this.modulePrefix = owner.application.modulePrefix;
  }
  get storageKey() {
    return 'nrg.' + (this.modulePrefix ? this.modulePrefix + '.' : '') + 'theme';
  }
  loaded = false;
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
  loadTheme() {
    const theme = localStorage.getItem(this.storageKey);
    return theme ?? 'auto';
  }
  setTheme(theme) {
    localStorage.setItem(this.storageKey, theme);
    let resolvedTheme = theme;
    if (theme === 'auto') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (this.resolvedTheme === resolvedTheme && this.value === theme) {
      return;
    }
    this.value = theme;
    this.resolvedTheme = resolvedTheme;
    document.body.setAttribute('data-bs-theme', resolvedTheme);
  }
  static {
    n(this.prototype, "setTheme", [action]);
  }
}

export { ThemeService as default, themeIcons };
//# sourceMappingURL=theme.js.map

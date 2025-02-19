import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

const THEME_ICONS = {
  dark: 'bi-moon-stars-fill',
  light: 'bi-sun-fill',
  auto: 'bi-circle-half'
};
class ThemeSwitcherComponent extends Component {
  static {
    g(this.prototype, "themeService", [service('theme')]);
  }
  #themeService = (i(this, "themeService"), void 0);
  constructor(owner, args) {
    super(owner, args);
    this.themeService.load();
  }
  get theme() {
    return this.themeService.theme;
  }
  setTheme(theme) {
    this.themeService.setTheme(theme);
  }
  static {
    n(this.prototype, "setTheme", [action]);
  }
  cycle() {
    const preferredTheme = this.themeService.preferredTheme;
    const newTheme = preferredTheme === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(newTheme);
  }
  static {
    n(this.prototype, "cycle", [action]);
  }
  get currentThemeIcon() {
    return THEME_ICONS[this.theme];
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <span role=\"button\" class=\"cursor-pointer py-2 px-3\" {{on \"click\" this.cycle}} ...attributes>\n      <i class=\"{{this.currentThemeIcon}}\" />\n    </span>\n  ", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { ThemeSwitcherComponent as default };
//# sourceMappingURL=theme-switcher.js.map

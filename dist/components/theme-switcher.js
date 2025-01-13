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
  #themeService = (i(this, "themeService"), undefined);
  constructor(owner1, args1) {
    super(owner1, args1);
    this.themeService.load();
  }
  get theme() {
    return this.themeService.theme;
  }
  setTheme(theme1) {
    this.themeService.setTheme(theme1);
  }
  static {
    n(this.prototype, "setTheme", [action]);
  }
  cycle() {
    const preferredTheme1 = this.themeService.preferredTheme;
    const newTheme1 = preferredTheme1 === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(newTheme1);
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

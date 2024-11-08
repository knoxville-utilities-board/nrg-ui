import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import type { Theme } from '../';
import type ThemeService from '../services/theme.ts';

export interface ThemeSwitcherSignature {
  Element: HTMLSpanElement;
}

const THEME_ICONS = {
  dark: 'bi-moon-stars-fill',
  light: 'bi-sun-fill',
  auto: 'bi-circle-half',
};

export default class ThemeSwitcherComponent extends Component<ThemeSwitcherSignature> {
  @service('theme')
  declare themeService: ThemeService;

  constructor(owner: unknown, args: object) {
    super(owner, args);
    this.themeService.load();
  }

  get theme() {
    return this.themeService.theme;
  }

  @action
  setTheme(theme: string) {
    this.themeService.setTheme(theme as Theme);
  }

  @action
  cycle() {
    const preferredTheme = this.themeService.preferredTheme;
    const newTheme = preferredTheme === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(newTheme as Theme);
  }

  get currentThemeIcon() {
    return THEME_ICONS[this.theme];
  }

  <template>
    <span
      role="button"
      class="cursor-pointer py-2 px-3"
      {{on "click" this.cycle}}
      ...attributes
    >
      <i class="{{this.currentThemeIcon}}" />
    </span>
  </template>
}

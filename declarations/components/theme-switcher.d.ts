import Component from '@glimmer/component';
import type { Theme } from '../';
import type ThemeService from '../services/theme.ts';
export interface ThemeSwitcherSignature {
    Element: HTMLSpanElement;
}
export default class ThemeSwitcherComponent extends Component<ThemeSwitcherSignature> {
    themeService: ThemeService;
    constructor(owner: unknown, args: object);
    get theme(): Theme;
    setTheme(theme: string): void;
    cycle(): void;
    get currentThemeIcon(): string;
}
//# sourceMappingURL=theme-switcher.d.ts.map
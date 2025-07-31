import Service from '@ember/service';
import type { Theme } from '../';
export declare const THEME_ICONS: {
    readonly dark: "bi-moon-stars-fill";
    readonly light: "bi-sun-fill";
    readonly auto: "bi-circle-half";
};
export default class ThemeService extends Service {
    theme: Theme;
    preferredTheme: 'light' | 'dark';
    loaded: boolean;
    get icon(): "bi-circle-half" | "bi-moon-stars-fill" | "bi-sun-fill";
    load(): void;
    loadTheme(): Theme;
    setTheme(theme: Theme): void;
    cycle(): void;
}
declare module '@ember/service' {
    interface Registry {
        theme: Theme;
    }
}

import Service from '@ember/service';
import type { Theme } from '../';
export default class ThemeService extends Service {
    theme: Theme;
    preferredTheme: 'light' | 'dark';
    loaded: boolean;
    load(): void;
    loadTheme(): Theme;
    setTheme(theme: Theme): void;
}
declare module '@ember/service' {
    interface Registry {
        theme: Theme;
    }
}
//# sourceMappingURL=theme.d.ts.map
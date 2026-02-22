import Component from '@glimmer/component';
import type { Theme } from '../index.ts';
import type ThemeService from '../services/theme.ts';
export interface ThemeControlSignature {
    Element: HTMLDivElement;
    Args: {
        onChange?: (theme: Theme) => void;
    };
}
export default class ThemeControl extends Component<ThemeControlSignature> {
    theme: ThemeService;
    onChange: (theme: Theme) => void;
}

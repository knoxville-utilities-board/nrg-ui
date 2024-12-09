import Component from '@glimmer/component';
import type { Icon as IconType } from '../';
declare type SubtleColorType = 'primary-subtle' | 'secondary-subtle' | 'success-subtle' | 'danger-subtle' | 'warning-subtle' | 'info-subtle' | 'light-subtle' | 'dark-subtle';
declare type ColorType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export interface IconSignature {
    Element: HTMLDivElement;
    Args: {
        type: IconType;
        backgroundColor?: SubtleColorType | ColorType;
        size?: '1' | '2' | '3' | '4' | '5' | '6';
        color?: ColorType;
        circular?: boolean;
    };
}
export default class Icon extends Component<IconSignature> {
    get color(): "reset" | ColorType;
    get backgroundColor(): string;
    get fontSizeClass(): string;
    get classList(): string;
}
export {};
//# sourceMappingURL=icon.d.ts.map
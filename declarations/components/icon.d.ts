import Component from '@glimmer/component';
import type { IconType } from '../';
export type SubtleColorType = 'primary-subtle' | 'secondary-subtle' | 'success-subtle' | 'danger-subtle' | 'warning-subtle' | 'info-subtle' | 'light-subtle' | 'dark-subtle';
export type ColorType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type SizeType = '1' | '2' | '3' | '4' | '5' | '6';
export interface IconSignature {
    Element: HTMLDivElement;
    Args: {
        type: IconType;
        backgroundColor?: SubtleColorType | ColorType;
        size?: SizeType;
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

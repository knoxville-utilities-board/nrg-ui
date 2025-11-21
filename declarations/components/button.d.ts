import Component from '@glimmer/component';
import type { ButtonGroupType } from './button-group';
import type { IconType } from '../';
export interface ButtonSignature {
    Element: HTMLButtonElement;
    Args: {
        _class?: string;
        disabled?: boolean;
        group?: ButtonGroupType;
        icon?: IconType;
        iconPosition?: 'right' | 'left' | 'center';
        iconLabel?: string;
        loading?: boolean;
        text?: string;
        type?: 'button' | 'submit';
        onClick?: (evt: MouseEvent) => unknown;
    };
    Blocks: {
        default?: [];
    };
}
export default class Button extends Component<ButtonSignature> {
    get classList(): string;
    get disabled(): boolean | undefined;
    get hasIcon(): boolean;
    get isLeftAlignedIcon(): boolean;
    get isRightAlignedIcon(): boolean;
    get isCenterAlignedIcon(): boolean;
    onClick(evt: MouseEvent): void;
}

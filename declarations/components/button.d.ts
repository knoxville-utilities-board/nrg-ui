import Component from '@glimmer/component';
import type { Icon } from '../types';
import type ButtonGroup from './button-group';
interface ButtonSignature {
    Element: HTMLButtonElement;
    Args: {
        disabled?: boolean;
        group?: ButtonGroup;
        icon?: Icon;
        iconPosition?: 'right' | 'left';
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
export default class ButtonComponent extends Component<ButtonSignature> {
    get classList(): string;
    get disabled(): boolean | undefined;
    get hasIcon(): boolean;
    get alignIconRight(): boolean;
    get hasIconLabel(): boolean;
    onClick(evt: MouseEvent): void;
}
export {};
//# sourceMappingURL=button.d.ts.map
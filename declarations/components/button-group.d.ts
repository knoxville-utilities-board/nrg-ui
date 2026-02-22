import Component from '@glimmer/component';
import type { ButtonSignature } from './button';
import type { ComponentLike } from '@glint/template';
export interface ButtonGroupSignature {
    Element: HTMLDivElement;
    Args: {
        disabled?: boolean;
        label?: string;
        parent?: ButtonGroupType;
        toolbar?: boolean;
        vertical?: boolean;
        onClick?: (evt: MouseEvent) => unknown;
    };
    Blocks: {
        default: [
            {
                Button: ComponentLike<ButtonSignature>;
                SubGroup: ComponentLike<ButtonGroupSignature>;
            }
        ];
    };
}
export interface ButtonGroupType {
    onClick: (evt: MouseEvent) => unknown;
}
export default class ButtonGroup extends Component<ButtonGroupSignature> implements ButtonGroupType {
    get classList(): string;
    get disabled(): true | undefined;
    get role(): "toolbar" | "group";
    get parent(): ButtonGroupType | undefined;
    onClick(evt: MouseEvent): void;
}

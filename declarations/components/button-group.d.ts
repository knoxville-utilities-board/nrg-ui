import Component from '@glimmer/component';
import Button from './button.gts';
import type { ComponentLike } from '@glint/template';
declare interface ButtonGroupSignature {
    Element: HTMLDivElement;
    Args: {
        disabled?: boolean;
        label?: string;
        parent?: ButtonGroupComponent;
        toolbar?: boolean;
        vertical?: boolean;
        onClick?: (evt: MouseEvent) => unknown;
    };
    Blocks: {
        default: [
            {
                Button: ComponentLike<Button>;
                SubGroup: ComponentLike<ButtonGroupComponent>;
            }
        ];
    };
}
export default class ButtonGroupComponent extends Component<ButtonGroupSignature> {
    get classList(): string;
    get disabled(): true | undefined;
    get role(): "toolbar" | "group";
    get parent(): ButtonGroupComponent | undefined;
    onClick(evt: MouseEvent): void;
}
export {};
//# sourceMappingURL=button-group.d.ts.map
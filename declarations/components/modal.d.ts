import Component from '@glimmer/component';
import type ModalService from '../services/modal.ts';
import type Owner from '@ember/owner';
export interface ModalSignature {
    Element: HTMLDialogElement;
    Args: {
        isOpen?: boolean;
        dismissible?: boolean;
        subtle?: boolean;
        position?: 'center' | 'left' | 'right';
        onDismiss?: () => void;
    };
    Blocks: {
        header?: [];
        default?: [];
        footer?: [];
    };
}
export default class Modal extends Component<ModalSignature> {
    modalService: ModalService;
    dialogElement: HTMLDialogElement;
    dialogId: string;
    constructor(owner: Owner, args: ModalSignature['Args']);
    get isActive(): boolean;
    get position(): "right" | "left" | "center";
    get classList(): string;
    get isDismissible(): boolean;
    onDismiss(evt?: Event): void;
    onClose(): void;
    onInsert: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: HTMLDialogElement;
    }>;
    onUpdate: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: Element;
    }>;
    openModal(): void;
    closeModal(): void;
}

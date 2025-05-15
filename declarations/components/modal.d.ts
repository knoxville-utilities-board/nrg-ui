import Component from '@glimmer/component';
import type ModalService from '../services/modal.ts';
export interface ModalSignature {
    Element: HTMLDialogElement;
    Args: {
        isOpen: boolean;
        dismissible?: boolean;
        subtle?: boolean;
        position?: 'center' | 'left' | 'right';
        onDismiss: () => void;
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
    dialogId: `${string}-${string}-${string}-${string}-${string}`;
    constructor(owner: unknown, args: ModalSignature['Args']);
    get isActive(): boolean;
    get position(): "right" | "left" | "center";
    get classList(): string;
    get isDismissible(): boolean;
    onDismiss(evt?: Event): void;
    onClose(): void;
    onInsert(element: HTMLElement): void;
    onUpdate(): void;
    openModal(): void;
    closeModal(): void;
}

import Component from '@glimmer/component';
export interface AccordionSignature {
    Element: HTMLDivElement;
    Args: {
        isOpen: boolean;
        title?: string;
        onToggle?: (isOpen: boolean) => void;
        onOpen?: () => Promise<void>;
        onClose?: () => Promise<void>;
    };
    Blocks: {
        content: [];
        title: [];
    };
}
export default class Accordion extends Component<AccordionSignature> {
    toggleMenu(): Promise<void>;
    get classList(): string;
    get menuIcon(): "bi-caret-down-fill" | "bi-caret-left-fill";
}

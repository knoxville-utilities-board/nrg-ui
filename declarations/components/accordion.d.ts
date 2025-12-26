import Component from '@glimmer/component';
export interface AccordionSignature {
    Element: HTMLDivElement;
    Args: {
        title: string;
        defaultOpen?: boolean;
    };
    Blocks: {
        content: [];
    };
}
export default class Accordion extends Component<AccordionSignature> {
    isMenuOpen: boolean;
    toggleMenu(): void;
    get title(): string;
    get classList(): string;
    get menuIcon(): "bi-caret-down-fill" | "bi-caret-left-fill";
}

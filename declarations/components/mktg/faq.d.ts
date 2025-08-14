import Component from '@glimmer/component';
export interface MktgFaqSignature {
    Element: HTMLDivElement;
    Args: {
        question: string;
        defaultOpen?: boolean;
    };
    Blocks: {
        answer: [];
    };
}
export default class FaqComponent extends Component<MktgFaqSignature> {
    isMenuOpen: boolean;
    toggleMenu(): void;
    get question(): string;
    get classList(): string;
    get menuIcon(): "bi-dash" | "bi-plus";
}

import Component from '@glimmer/component';
interface FaqSignature {
    Element: HTMLDivElement;
    Args: {
        question: string;
        defaultOpen?: boolean;
    };
    Blocks: {
        answer: [];
    };
}
export default class FaqComponent extends Component<FaqSignature> {
    isMenuOpen: boolean;
    toggleMenu(): void;
    get question(): string;
    get classList(): string;
    get menuIcon(): "bi-dash" | "bi-plus";
}
export {};
//# sourceMappingURL=faq.d.ts.map
import Component from '@glimmer/component';
import ResponsiveService from '../../services/responsive.ts';
export interface NavbarSignature {
    Element: HTMLElement;
    Blocks: {
        default: [];
        brand: [];
        actions: [];
    };
}
export default class NavbarComponent extends Component<NavbarSignature> {
    isMenuOpen: boolean;
    responsive: ResponsiveService;
    toggleMenu(): void;
    get classList(): string;
    get menuOpen(): boolean;
    get menuIcon(): "bi-list" | "bi-x";
}
//# sourceMappingURL=navbar.d.ts.map
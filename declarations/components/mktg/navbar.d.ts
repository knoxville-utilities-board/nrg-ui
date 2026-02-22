import Component from '@glimmer/component';
import ResponsiveService from '../../services/responsive.ts';
export interface MktgNavbarSignature {
    Element: HTMLElement;
    Blocks: {
        default: [];
        brand: [];
        actions: [];
    };
}
export default class MktgNavbar extends Component<MktgNavbarSignature> {
    isMenuOpen: boolean;
    responsive: ResponsiveService;
    toggleMenu(): void;
    get classList(): string;
    get menuOpen(): boolean;
    get menuIcon(): "bi-list" | "bi-x";
}

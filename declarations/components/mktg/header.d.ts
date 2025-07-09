import type { TOC } from '@ember/component/template-only';
export interface MktgHeaderSignature {
    Element: HTMLDivElement;
    Args: {
        dropSection: boolean;
        flexCollapse: boolean;
    };
    Blocks: {
        brand: [];
        title: [];
        options: [];
        nav: [];
    };
}
declare const Header: TOC<MktgHeaderSignature>;
export default Header;

import type { TOC } from '@ember/component/template-only';
export interface MktgFooterSignature {
    Element: HTMLElement;
    Args: {
        hasDivider?: boolean;
    };
    Blocks: {
        nav: [];
        'social-media': [];
        brand: [];
        legal: [];
    };
}
declare const MktgFooter: TOC<MktgFooterSignature>;
export default MktgFooter;

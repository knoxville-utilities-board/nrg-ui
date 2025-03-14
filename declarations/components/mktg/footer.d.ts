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
declare const MarketingFooterComponent: TOC<MktgFooterSignature>;
export default MarketingFooterComponent;
//# sourceMappingURL=footer.d.ts.map
import type { TOC } from '@ember/component/template-only';
export interface MktgPromoSignature {
    Element: HTMLDivElement;
    Args: {
        productName?: string;
        vertical?: boolean;
    };
    Blocks: {
        img: [];
        header: [];
        description: [];
    };
}
declare const Promo: TOC<MktgPromoSignature>;
export default Promo;
//# sourceMappingURL=promo.d.ts.map
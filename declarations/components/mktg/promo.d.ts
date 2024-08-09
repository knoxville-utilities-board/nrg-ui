import type { TOC } from '@ember/component/template-only';
interface PromoSignature {
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
declare const Promo: TOC<PromoSignature>;
export default Promo;
//# sourceMappingURL=promo.d.ts.map
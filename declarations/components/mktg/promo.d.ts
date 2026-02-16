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
declare const MktgPromo: TOC<MktgPromoSignature>;
export default MktgPromo;

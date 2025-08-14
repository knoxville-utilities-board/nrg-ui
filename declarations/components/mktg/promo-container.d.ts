import type { MktgPromoSignature } from './promo.gts';
import type { MktgSectionHeaderSignature } from './section-header.gts';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
export interface MktgPromoContainerSignature {
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                SectionHeader: ComponentLike<MktgSectionHeaderSignature>;
                Promo: ComponentLike<MktgPromoSignature>;
            }
        ];
    };
}
declare const PromoContainer: TOC<MktgPromoContainerSignature>;
export default PromoContainer;

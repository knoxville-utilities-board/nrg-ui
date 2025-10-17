import Promo from './promo.gts';
import SectionHeader from './section-header.gts';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
export interface MktgPromoContainerSignature {
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                SectionHeader: ComponentLike<typeof SectionHeader>;
                Promo: ComponentLike<typeof Promo>;
            }
        ];
    };
}
declare const PromoContainer: TOC<MktgPromoContainerSignature>;
export default PromoContainer;

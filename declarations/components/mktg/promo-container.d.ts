import MktgPromo from './promo.gts';
import MktgSectionHeader from './section-header.gts';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
export interface MktgPromoContainerSignature {
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                SectionHeader: ComponentLike<typeof MktgSectionHeader>;
                Promo: ComponentLike<typeof MktgPromo>;
            }
        ];
    };
}
declare const MktgPromoContainer: TOC<MktgPromoContainerSignature>;
export default MktgPromoContainer;

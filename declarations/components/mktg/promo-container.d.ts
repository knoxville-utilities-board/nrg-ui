import type { MktgPromoSignature } from './promo';
import type { MktgSectionHeaderSignature } from './section-header';
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
declare const MktgPromoContainer: TOC<MktgPromoContainerSignature>;
export default MktgPromoContainer;

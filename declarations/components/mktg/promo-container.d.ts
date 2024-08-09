import type { TOC } from '@ember/component/template-only';
import Promo from './promo.gts';
import type { ComponentLike } from '@glint/template';
import SectionHeader from './section-header.gts';
interface PromoContainerSignature {
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
declare const PromoContainer: TOC<PromoContainerSignature>;
export default PromoContainer;
//# sourceMappingURL=promo-container.d.ts.map
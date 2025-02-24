import type { MktgCardSignature } from './card.gts';
import type { CardSignature } from '../card.gts';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
export interface MktgCardContainerSignature {
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                Card: ComponentLike<CardSignature>;
                MktgCard: ComponentLike<MktgCardSignature>;
            }
        ];
    };
}
declare const CardContainer: TOC<MktgCardContainerSignature>;
export default CardContainer;
//# sourceMappingURL=card-container.d.ts.map
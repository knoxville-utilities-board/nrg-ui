import MktgCard from './card.gts';
import Card from '../card.gts';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
export interface MktgCardContainerSignature {
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                Card: ComponentLike<typeof Card>;
                MktgCard: ComponentLike<typeof MktgCard>;
            }
        ];
    };
}
declare const CardContainer: TOC<MktgCardContainerSignature>;
export default CardContainer;

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import MktgCard from './card.gts';
import Card from '../card.gts';
interface CardContainerSignature {
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                Card: ComponentLike<Card>;
                MktgCard: ComponentLike<typeof MktgCard>;
            }
        ];
    };
}
declare const CardContainer: TOC<CardContainerSignature>;
export default CardContainer;
//# sourceMappingURL=card-container.d.ts.map
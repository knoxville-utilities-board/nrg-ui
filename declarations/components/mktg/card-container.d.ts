import type { CardSignature } from '../card';
import type { MktgCardSignature } from './card';
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
declare const MktgCardContainer: TOC<MktgCardContainerSignature>;
export default MktgCardContainer;

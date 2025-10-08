import { hash } from '@ember/helper';

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
      },
    ];
  };
}
const CardContainer: TOC<MktgCardContainerSignature> = <template>
  <div class="grid" ...attributes>
    {{yield (hash Card=(component Card) MktgCard=(component MktgCard))}}
  </div>
</template>;

export default CardContainer;

import { hash } from '@ember/helper';

import MktgCard from './card.gts';
import Card from '../card.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface CardContainerSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Card: ComponentLike<Card>;
        MktgCard: ComponentLike<typeof MktgCard>;
      },
    ];
  };
}
const CardContainer: TOC<CardContainerSignature> = <template>
  <div class="grid p-2" ...attributes>
    {{yield (hash Card=(component Card) MktgCard=(component MktgCard))}}
  </div>
</template>;

export default CardContainer;

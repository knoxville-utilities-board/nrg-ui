import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import type { ComponentLike } from '@glint/template';
import VerticalCard from './vertical-card.gts';
import Card from '../card.gts';

interface CardContainerSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Card: ComponentLike<Card>;
        VerticalCard: ComponentLike<VerticalCard>;
      },
    ];
  };
}
const CardContainer: TOC<CardContainerSignature> = <template>
  <div class="grid p-2" ...attributes>
    {{yield (hash Card=(component Card) VerticalCard=(component VerticalCard))}}
  </div>
</template>;

export default CardContainer;

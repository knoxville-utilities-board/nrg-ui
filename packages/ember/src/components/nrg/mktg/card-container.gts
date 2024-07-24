import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import type { ComponentLike } from '@glint/template';
import Card from './card.js';

interface CardContainerSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Card: ComponentLike<Card>;
      },
    ];
  };
}
const CardContainer: TOC<CardContainerSignature> = <template>
  <div class="row justify-content-center p-2" ...attributes>
    {{yield (hash Card=(component Card))}}
  </div>
</template>;

export default CardContainer;

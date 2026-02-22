import { hash } from '@ember/helper';
import MktgCard from './card.js';
import Card from '../card.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const MktgCardContainer = setComponentTemplate(precompileTemplate("<div class=\"grid\" ...attributes>\n  {{yield (hash Card=(component Card) MktgCard=(component MktgCard))}}\n</div>", {
  strictMode: true,
  scope: () => ({
    hash,
    Card,
    MktgCard
  })
}), templateOnly());

export { MktgCardContainer as default };
//# sourceMappingURL=card-container.js.map

import { hash } from '@ember/helper';
import MktgPromo from './promo.js';
import MktgSectionHeader from './section-header.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const MktgPromoContainer = setComponentTemplate(precompileTemplate("<div class=\"container\">\n  <div class=\"row p-4 d-flex justify-content-center\" ...attributes>\n    {{yield (hash SectionHeader=(component MktgSectionHeader) Promo=(component MktgPromo))}}\n\n  </div>\n</div>", {
  strictMode: true,
  scope: () => ({
    hash,
    MktgSectionHeader,
    MktgPromo
  })
}), templateOnly());

export { MktgPromoContainer as default };
//# sourceMappingURL=promo-container.js.map

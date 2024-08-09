import Promo from './promo.js';
import { hash } from '@ember/helper';
import SectionHeader from './section-header.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const PromoContainer = setComponentTemplate(precompileTemplate("\n  <div class=\"container\">\n    <div class=\"row p-4 d-flex justify-content-center\" ...attributes>\n      {{yield (hash SectionHeader=(component SectionHeader) Promo=(component Promo))}}\n\n    </div>\n  </div>\n", {
  strictMode: true,
  scope: () => ({
    hash,
    SectionHeader,
    Promo
  })
}), templateOnly());

export { PromoContainer as default };
//# sourceMappingURL=promo-container.js.map

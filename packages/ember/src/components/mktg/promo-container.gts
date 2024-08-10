import { hash } from '@ember/helper';

import Promo from './promo.gts';
import SectionHeader from './section-header.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface PromoContainerSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        SectionHeader: ComponentLike<typeof SectionHeader>;
        Promo: ComponentLike<typeof Promo>;
      },
    ];
  };
}
const PromoContainer: TOC<PromoContainerSignature> = <template>
  <div class="container">
    <div class="row p-4 d-flex justify-content-center" ...attributes>
      {{yield
        (hash SectionHeader=(component SectionHeader) Promo=(component Promo))
      }}

    </div>
  </div>
</template>;

export default PromoContainer;

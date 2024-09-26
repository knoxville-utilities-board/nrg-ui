import { hash } from '@ember/helper';

import Promo from './promo.gts';
import SectionHeader from './section-header.gts';

import type { MktgPromoSignature } from './promo.gts';
import type { MktgSectionHeaderSignature } from './section-header.gts';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

export interface MktgPromoContainerSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        SectionHeader: ComponentLike<MktgSectionHeaderSignature>;
        Promo: ComponentLike<MktgPromoSignature>;
      },
    ];
  };
}

const PromoContainer: TOC<MktgPromoContainerSignature> = <template>
  <div class="container">
    <div class="row p-4 d-flex justify-content-center" ...attributes>
      {{yield
        (hash SectionHeader=(component SectionHeader) Promo=(component Promo))
      }}

    </div>
  </div>
</template>;

export default PromoContainer;

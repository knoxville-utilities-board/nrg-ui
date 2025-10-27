import { hash } from '@ember/helper';

import MktgPromo from './promo.gts';
import MktgSectionHeader from './section-header.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

export interface MktgPromoContainerSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        SectionHeader: ComponentLike<typeof MktgSectionHeader>;
        Promo: ComponentLike<typeof MktgPromo>;
      },
    ];
  };
}

const MktgPromoContainer: TOC<MktgPromoContainerSignature> = <template>
  <div class="container">
    <div class="row p-4 d-flex justify-content-center" ...attributes>
      {{yield
        (hash
          SectionHeader=(component MktgSectionHeader)
          Promo=(component MktgPromo)
        )
      }}

    </div>
  </div>
</template>;

export default MktgPromoContainer;

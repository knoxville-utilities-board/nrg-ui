import { hash } from '@ember/helper';

import Promo from './promo.gts';
import SectionHeader from './section-header.gts';

import type { PromoSignature } from './promo.gts';
import type { SectionHeaderSignature } from './section-header.gts';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

export interface PromoContainerSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        SectionHeader: ComponentLike<SectionHeaderSignature>;
        Promo: ComponentLike<PromoSignature>;
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

import type { TOC } from '@ember/component/template-only';
import Promo from './promo.gts';
import { hash } from '@ember/helper';
import type { ComponentLike } from '@glint/template';

interface HeaderDescriptionSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

const HeaderDescription: TOC<HeaderDescriptionSignature> = <template>
  <div class="text-center mb-5" ...attributes>
    {{yield}}
  </div>
</template>;

interface PromoContainerSignature {
  Element: HTMLDivElement;
  Args: {
    subject?: string;
    title?: string;
  };
  Blocks: {
    default: [
      {
        HeaderDescription: ComponentLike<typeof HeaderDescription>;
        Promo: ComponentLike<typeof Promo>;
      },
    ];
  };
}
const PromoContainer: TOC<PromoContainerSignature> = <template>
  <div class="container">
    <div
      class="row p-4 text-primary d-flex justify-content-center"
      ...attributes
    >
      <div class="col-12 text-center">
        <p class="text-uppercase p-0 m-0 fw-semibold">{{@subject}}</p>
        <p class="mx-0 my-2 fw-semibold fs-1">{{@title}}</p>
      </div>
      {{yield
        (hash
          HeaderDescription=(component HeaderDescription)
          Promo=(component Promo)
        )
      }}

    </div>
  </div>
</template>;

export default PromoContainer;

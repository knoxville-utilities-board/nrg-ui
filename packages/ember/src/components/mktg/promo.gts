import type { TOC } from '@ember/component/template-only';

interface PromoSignature {
  Element: HTMLDivElement;
  Args: {
    productName?: string;
    headerText?: string;
    // eslint-disable-next-line no-unused-vars
    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    img: [];
    header: [];
    description: [];
  };
}

const Promo: TOC<PromoSignature> = <template>
  <div class="row bg-primary text-white" ...attributes>
    <div class="col-12 col-md-6 d-flex flex-column justify-content-center">
      <div class="p-3 p-md-5">
        <p class="text-uppercase p-0 my-2 fw-semibold">{{@productName}}</p>
        <div class="mb-3 fs-1 fw-semibold lh-sm">{{yield to="header"}}</div>
        {{yield to="description"}}
      </div>
    </div>
    <div class="col-12 col-md-6 p-0">
      {{yield to="img"}}
    </div>
  </div>
</template>;

export default Promo;

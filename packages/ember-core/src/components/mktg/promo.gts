import type { TOC } from '@ember/component/template-only';

export interface MktgPromoSignature {
  Element: HTMLDivElement;
  Args: {
    productName?: string;
    vertical?: boolean;
  };
  Blocks: {
    img: [];
    header: [];
    description: [];
  };
}

const Promo: TOC<MktgPromoSignature> = <template>
  {{#if @vertical}}
    <div ...attributes>
      <div class="d-flex justify-content-center mb-5">
        <div class="col-12 col-md-10 justify-content-center">
          {{yield to="img"}}
          <div class="ms-md-4">
            <p class="fw-semibold fs-3 my-2">{{@productName}}</p>
            {{yield to="description"}}
          </div>
        </div>
      </div>
    </div>
  {{else}}
    <div class="row" ...attributes>
      <div class="col-12 col-md-6 d-flex flex-column justify-content-center">
        <div class="p-3 p-md-5">
          <p class="text-uppercase p-0 my-2 fw-semibold">{{@productName}}</p>
          <div class="mb-3 fs-1 fw-semibold lh-sm">{{yield to="header"}}</div>
          {{yield to="description"}}
        </div>
      </div>
      <div class="col-12 col-md-6 p-0 d-flex flex-column">
        {{yield to="img"}}
      </div>
    </div>
  {{/if}}
</template>;

export default Promo;

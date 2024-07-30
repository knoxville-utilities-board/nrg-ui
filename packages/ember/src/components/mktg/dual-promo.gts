import type { TOC } from '@ember/component/template-only';

interface DualPromoSignature {
  Element: HTMLDivElement;
  Args: {
    subject?: string;
    headerText?: string;
    leftPromoTitle?: string;
    rightPromoTitle?: string;
  };
  Blocks: {
    'left-img': [];
    'right-img': [];
    'left-description': [];
    'right-description': [];
    'header-description': [];
  };
}

const DualPromo: TOC<DualPromoSignature> = <template>
  <div class="row p-4 text-primary" ...attributes>
    <div class="col-12 mb-5 text-center">
      <p class="text-uppercase p-0 m-0 fw-semibold">{{@subject}}</p>
      <p class="mx-0 my-2 fw-semibold fs-1">{{@headerText}}</p>
      {{yield to="header-description"}}
    </div>
    <div class="col-12 col-md-6 d-flex justify-content-center mb-5">
      <div class="col-12 col-md-10 justify-content-center">
        {{yield to="left-img"}}
        <div class="mx-md-4">
          <p class="fw-semibold fs-3">{{@leftPromoTitle}}</p>
          {{yield to="left-description"}}
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 d-flex justify-content-center mb-5">
      <div class="col-12 col-md-10 justify-content-center">
        {{yield to="right-img"}}
        <div class="mx-md-4">
          <p class="fw-semibold fs-3">{{@rightPromoTitle}}</p>
          {{yield to="right-description"}}
        </div>
      </div>
    </div>
  </div>
</template>;

export default DualPromo;

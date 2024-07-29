import type { TOC } from '@ember/component/template-only';

interface DualPromoSignature {
  Element: HTMLDivElement;
  Args: {
    subject?: string;
    headerText?: string;
    callout?: string;
    leftProductTitle?: string;
    rightProductTitle?: string;
  };
  Blocks: {
    'left-img': [];
    'right-img': [];
    'left-description': [];
    'right-description': [];
  };
}

const DualPromo: TOC<DualPromoSignature> = <template>
  <div class="row p-4 text-primary" ...attributes>
    <div
      class="col-12 d-flex flex-column align-items-center justify-content-center mb-4"
    >
      <p class="text-uppercase p-0 m-0 fw-semibold">{{@subject}}</p>
      <p class="mx-0 my-2 fw-semibold fs-1">{{@headerText}}</p>
      <p class="m-0">{{@callout}}</p>
    </div>
    <div class="col-6 d-flex justify-content-center">
      <div class="col-10">
        <div class="mb-4">
          {{yield to="left-img"}}
        </div>
        <div class="mx-4">
          <p class="fw-semibold fs-3">{{@leftProductTitle}}</p>
          {{yield to="left-description"}}
        </div>
      </div>
    </div>
    <div class="col-6 d-flex justify-content-center">
      <div class="col-10">
        <div class="mb-4">
          {{yield to="right-img"}}
        </div>
        <div class="mx-4">
          <p class="fw-semibold fs-3">{{@rightProductTitle}}</p>
          {{yield to="right-description"}}
        </div>
      </div>
    </div>
  </div>
</template>;

export default DualPromo;

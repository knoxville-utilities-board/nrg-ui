import type { TOC } from '@ember/component/template-only';

interface HeaderSignature {
  Element: HTMLDivElement;
  Blocks: {
    left: [];
    right: [];
    center: [];
    'mobile-drop-section': [];
  };
}

const HeaderComponent: TOC<HeaderSignature> = <template>
  <div class="container-fluid">
    <div
      class="row row-cols-12 bg-primary text-light p-1 align-items-center justify-content-evenly"
      ...attributes
    >
      <div class="col d-flex justify-content-start">
        {{yield to="left"}}
      </div>
      <div class="col d-flex justify-content-center flex-row flex-no-wrap">
        {{yield to="center"}}
      </div>
      <div class="col d-flex justify-content-end">
        {{yield to="right"}}
      </div>
      <div class="d-flex col-12 d-md-none order-last justify-content-center">
        <div class="d-flex flex-row mt-2 mx-2 text-nowrap">
          {{yield to="mobile-drop-section"}}
        </div>
      </div>
    </div>
  </div>
</template>;

export default HeaderComponent;

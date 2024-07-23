import type { TOC } from '@ember/component/template-only';

interface HeaderSignature {
  Element: HTMLDivElement;
  Blocks: {
    left: [];
    right: [];
    center: [];
    mobileDropSection: [];
  };
}

const HeaderComponent: TOC<HeaderSignature> = <template>
  <div
    class="row row-cols-12 bg-primary text-light p-1 align-items-center justify-content-evenly"
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
    <div
      class="d-flex col-12 d-md-none order-last justify-content-center w-100"
    >
      <div class="d-flex flex-row mt-2 mx-2 text-nowrap">
        {{yield to="mobileDropSection"}}
      </div>
    </div>
  </div>
</template>;

export default HeaderComponent;

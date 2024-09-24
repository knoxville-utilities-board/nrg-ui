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
  <div
    class="row row-cols-12 p-1 align-items-center justify-content-evenly"
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
    {{#if (has-block "mobile-drop-section")}}
      <div class="d-flex col-12 d-md-none order-last justify-content-center">
        <div class="d-flex flex-row text-nowrap">
          {{yield to="mobile-drop-section"}}
        </div>
      </div>
    {{/if}}
  </div>
</template>;

export default HeaderComponent;

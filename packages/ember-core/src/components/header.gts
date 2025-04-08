import type { TOC } from '@ember/component/template-only';

export interface HeaderSignature {
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
    class="row row-cols-12 p-1 flex-nowrap align-items-center justify-content-between"
    ...attributes
  >
    <div
      class="col text-nowrap d-flex align-items-center flex-grow-0 app-bar-left"
    >
      {{yield to="left"}}
    </div>
    {{#if (has-block "center")}}
      <div
        class="col text-nowrap d-flex align-items-center flex-grow-0 app-bar-center"
      >
        {{yield to="center"}}
      </div>
    {{/if}}
    <div
      class="col text-nowrap d-flex align-items-center flex-grow-0 app-bar-right"
    >
      {{yield to="right"}}
    </div>
    {{#if (has-block "mobile-drop-section")}}
      <div class="d-flex col-12 d-md-none order-last justify-content-center">
        <div class="d-flex flex-row text-nowrap align-items-center">
          {{yield to="mobile-drop-section"}}
        </div>
      </div>
    {{/if}}
  </div>
</template>;

export default HeaderComponent;

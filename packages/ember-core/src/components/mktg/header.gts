import Header from '../header.gts';

import type { TOC } from '@ember/component/template-only';

export interface MktgHeaderSignature {
  Element: HTMLDivElement;
  Args: {
    dropSection?: boolean;
    flexCollapse?: boolean;
  };
  Blocks: {
    brand: [];
    title: [];
    options: [];
    nav: [];
  };
}

const MktgHeader: TOC<MktgHeaderSignature> = <template>
  <Header
    class="bg-body top-0 sticky-top w-100 gx-0 border border-bottom"
    @flexCollapse={{@flexCollapse}}
    ...attributes
  >
    <:left>
      {{yield to="brand"}}
    </:left>
    <:center>
      {{#if (has-block "title")}}
        <div
          class="justify-content-center align-items-center text-center text-nowrap fw-bold m-0 fs-4"
        >
          {{yield to="title"}}
        </div>
      {{/if}}
      <div class="d-none d-md-flex">
        <div class="d-flex flex-row mt-2 mx-2 text-nowrap">
          {{yield to="options"}}
        </div>
      </div>
    </:center>
    <:right>
      <div class="col d-flex justify-content-end">
        {{yield to="nav"}}
      </div>
    </:right>
    <:mobile-drop-section>
      {{#if @dropSection}}
        <div class="d-flex flex-row mt-2 mx-2 text-nowrap">
          {{yield to="options"}}
        </div>
      {{/if}}
    </:mobile-drop-section>
  </Header>
</template>;

export default MktgHeader;

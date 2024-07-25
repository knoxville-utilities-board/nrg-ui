import type { TOC } from '@ember/component/template-only';
import HeaderComponent from '../header.gts';

interface HeaderSignature {
  Element: HTMLDivElement;
  Args: {
    title: string;
  };
  Blocks: {
    brand: [];
    title: [];
    options: [];
    nav: [];
  };
}

const Header: TOC<HeaderSignature> = <template>
  <HeaderComponent>
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
      <div class="d-flex flex-row mt-2 mx-2 text-nowrap">
        {{yield to="options"}}
      </div>
    </:mobile-drop-section>
  </HeaderComponent>
</template>;

export default Header;

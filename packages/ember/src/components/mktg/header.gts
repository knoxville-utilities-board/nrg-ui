import type { TOC } from '@ember/component/template-only';
import { HeaderComponent } from '../nrg/header';

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

const MktgHeaderComponent: TOC<HeaderSignature> = <template>
  <HeaderComponent>
    <:left>
      {{yield to="brand"}}
    </:left>
    <:center>
      <div class="justify-content-center text-center text-nowrap">
        <p class="fw-bold m-0 fs-4">{{@title}}</p>
      </div>
      <div class="d-none d-md-flex">
        <div class="d-flex flex-row mt-2 mx-2 text-nowrap">
          {{yield to="options"}}
        </div>
      </div>
    </:center>
    <:right>
      <div class="col d-flex">
        {{yield to="nav"}}
      </div>
    </:right>
    <:mobileDropSection>
      <div class="d-flex flex-row mt-2 mx-2 text-nowrap">
        {{yield to="options"}}
      </div>
    </:mobileDropSection>
  </HeaderComponent>
</template>;

export default MktgHeaderComponent;

import Component from '@glimmer/component';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import { action } from '@ember/object';

interface BrandSignature {
  Element: HTMLDivElement;
  Args: {
    // eslint-disable-next-line no-unused-vars
    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    default: [];
  };
}

class BrandComponent extends Component<BrandSignature> {
  @action
  onClick(evt: MouseEvent) {
    this.args.onClick?.(evt);
  }

  <template>
    <div class="col d-flex" ...attributes>
      {{yield}}
    </div>
  </template>
}

interface TitleSignature {
  Element: HTMLDivElement;
  Args: {
    text?: string;
  };
  Blocks: {
    default: [];
  };
}

const TitleComponent: TOC<TitleSignature> = <template>
  <div class="justify-content-center text-center text-nowrap" ...attributes>
    <p class="fw-bold m-0 fs-4">{{@text}}</p>
  </div>
</template>;

interface NavSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

const NavComponent: TOC<NavSignature> = <template>
  <div class="col d-flex" ...attributes>
    {{yield}}
  </div>
</template>;

interface DropdownSectionSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

const DropdownSection: TOC<DropdownSectionSignature> = <template>
  <div class="d-flex flex-row mt-2 mx-2 text-nowrap" ...attributes>
    {{yield}}
  </div>
</template>;

interface HeaderSignature {
  Element: HTMLDivElement;
  Blocks: {
    brand: [ComponentLike<BrandComponent>];
    title: [ComponentLike<TitleSignature>];
    dropdown: [ComponentLike<DropdownSectionSignature>];
    nav: [ComponentLike<NavSignature>];
  };
}

const HeaderComponent: TOC<HeaderSignature> = <template>
  <div class="container-fluid">
    <div
      class="row row-cols-12 bg-primary text-light p-1 align-items-center justify-content-evenly"
    >
      {{yield (component BrandComponent) to="brand"}}
      <div class="col d-flex justify-content-center flex-row flex-no-wrap">
        {{yield (component TitleComponent) to="title"}}
        <div class="d-none d-md-flex">
          {{yield (component DropdownSection) to="dropdown"}}
        </div>
      </div>
      {{yield (component NavComponent) to="nav"}}
      {{#if (has-block "dropdown")}}
        <div
          class="d-flex col-12 d-md-none order-last justify-content-center w-100"
        >
          {{yield (component DropdownSection) to="dropdown"}}
        </div>
      {{/if}}
    </div>
  </div>
</template>;

export default HeaderComponent;

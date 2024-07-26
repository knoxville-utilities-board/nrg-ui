import Component from '@glimmer/component';
import type { NrgIconValue } from '../../icon-types';
import type { TOC } from '@ember/component/template-only';

interface AddonSignature {
  Args: {
    title?: string;
    description?: string;
    quantity?: number;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

interface MktgServicePricingSignature {
  Args: {
    icon?: NrgIconValue;
    title?: string;
    description?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const Addon: TOC<AddonSignature> = <template>
  <div class="row align-items-center mx-0 my-1" ...attributes>
    <div class="col-6 offset-2 text-truncate pe-0">
      {{@title}}
      {{#if @quantity}}
        | Qty:
        {{@quantity}}
      {{/if}}
    </div>
    <div class="col-auto ms-auto">{{@description}}</div>
  </div>
</template>;

export default class MktgServicePricing extends Component<MktgServicePricingSignature> {
  get classList() {
    return 'card p-4 border-2 rounded-4 my-4';
  }

  <template>
    <div class={{this.classList}} ...attributes>
      <div class="row fw-bold align-items-center mx-0 my-1">
        <i class="col-2 bi fs-2 {{@icon}} mx-atuo pe-0" />
        <div class="col-6 fs-5">{{@title}}</div>
        <div class="col-auto fs-5 ms-auto">{{@description}}</div>
      </div>
      {{yield (component Addon)}}
    </div>
  </template>
}

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
  <div class="row align-items-center mx-0 my-2" ...attributes>
    <div class="col text-truncate">
      {{@title}}
      {{#if @quantity}}
        | Qty:
        {{@quantity}}
      {{/if}}
    </div>
    <div class="col-5 text-end">{{@description}}</div>
  </div>
</template>;

export default class MktgServicePricing extends Component<MktgServicePricingSignature> {
  get classList() {
    return 'card p-4 border-2 rounded-4 my-4';
  }

  <template>
    <div class={{this.classList}} ...attributes>
      <div class="row">
        <i class="col-auto bi {{@icon}} fs-1" />
        <div class="col">
          <div class="row align-items-center mx-0 my-2 fw-bold">
            <div class="col text-truncate fs-5">{{@title}}</div>
            <div class="col-5 text-end fs-5">{{@description}}</div>
          </div>
          {{yield (component Addon)}}
        </div>
      </div>
    </div>
  </template>
}

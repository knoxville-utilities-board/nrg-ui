import type { NrgIconValue } from '../../icon-types';
import type { TOC } from '@ember/component/template-only';
import { concat } from '@ember/helper';
import type { ComponentLike } from '@glint/template';

interface AddonSignature {
  Args: {
    label?: string;
    price?: string;
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
    name: string;
    type?: string;
    description: string;
    active?: boolean;
    descriptionDisabled?: boolean;
  };
  Blocks: {
    default: [ComponentLike<typeof Addon>];
  };
  Element: HTMLElement;
}

const Addon: TOC<AddonSignature> = <template>
  <div class="row align-items-center my-2" ...attributes>
    <div class="col text-truncate">
      {{#if @quantity}}
        {{concat @label " | Qty: " @quantity}}
      {{else}}
        {{@label}}
      {{/if}}
    </div>
    <div class="col-auto text-end">
      {{@price}}
    </div>
  </div>
</template>;

const MktgServicePricing: TOC<MktgServicePricingSignature> = <template>
  <div
    class="card p-4 border-2 rounded-4 {{if @active 'border-primary'}} my-4"
    ...attributes
  >
    <div class="row align-items-center fw-bold">
      <div class="col-auto">
        <i class="bi {{@icon}} fs-1" />
      </div>
      <div class="col fs-5 text-truncate">
        {{#if @type}}
          {{concat @name ": " @type}}
        {{else}}
          {{@name}}
        {{/if}}
      </div>
      <div
        class="col-auto fs-5
          {{if
            @descriptionDisabled
            'fw-normal text-decoration-underline text-light-emphasis'
          }}"
      >
        {{@description}}
      </div>
    </div>
    {{yield (component Addon)}}
  </div>
</template>;

export default MktgServicePricing;

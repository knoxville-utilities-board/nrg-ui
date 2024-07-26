import type { NrgIconValue } from '../../icon-types';
import type { TOC } from '@ember/component/template-only';
import { concat } from '@ember/helper';

interface AddonSignature {
  Args: {
    addon?: string;
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
    serviceName?: string;
    serviceType?: string;
    price?: string;
    active?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const Addon: TOC<AddonSignature> = <template>
  <div class="row align-items-center mx-0 my-2" ...attributes>
    <div class="col text-truncate ps-0">
      {{#if @quantity}}
        {{concat @addon " | Qty:" @quantity}}
      {{else}}
        {{@addon}}
      {{/if}}
    </div>
    <div class="col-auto text-end">{{@price}}</div>
  </div>
</template>;

const MktgServicePricing: TOC<MktgServicePricingSignature> = <template>
  <div
    class="card p-4 border-2 rounded-4 my-4 {{if @active 'border-primary'}}"
    ...attributes
  >
    <div class="row">
      <div class="col-12 col-sm-auto align-items-center py-2">
        <i class="bi {{@icon}} fs-1" />
      </div>
      <div class="col">
        <div class="row align-items-center mx-0 my-2 fw-bold">
          <div class="col text-truncate ps-0 fs-5">
            {{#if @serviceType}}
              {{concat @serviceName ": " @serviceType}}
            {{else}}
              {{@serviceName}}
            {{/if}}
          </div>
          <div class="col-auto text-end fs-5">{{@price}}</div>
        </div>
        {{yield (component Addon)}}
      </div>
    </div>
  </div>
</template>;

export default MktgServicePricing;

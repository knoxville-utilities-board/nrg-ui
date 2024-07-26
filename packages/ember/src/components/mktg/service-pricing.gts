import type { NrgIconValue } from '../../icon-types';
import type { TOC } from '@ember/component/template-only';

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
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const Addon: TOC<AddonSignature> = <template>
  <div class="row align-items-center mx-0 my-2" ...attributes>
    <div class="col text-truncate">
      {{@addon}}
      {{#if @quantity}}
        | Qty:
        {{@quantity}}
      {{/if}}
    </div>
    <div class="col-5 text-end">{{@price}}</div>
  </div>
</template>;

const MktgServicePricing: TOC<MktgServicePricingSignature> = <template>
  <div class="card p-4 border-2 rounded-4 my-4" ...attributes>
    <div class="row">
      <i class="col-auto bi {{@icon}} fs-1" />
      <div class="col">
        <div class="row align-items-center mx-0 my-2 fw-bold">
          <div class="col text-truncate fs-5">
            {{@serviceName}}
            {{#if @serviceType}}
              :
              {{@serviceType}}
            {{/if}}
          </div>
          <div class="col-5 text-end fs-5">{{@price}}</div>
        </div>
        {{yield (component Addon)}}
      </div>
    </div>
  </div>
</template>;

export default MktgServicePricing;

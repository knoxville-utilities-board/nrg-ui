import Component from '@glimmer/component';

export interface MktgServicePricingSignature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class MktgServicePricing extends Component<MktgServicePricingSignature> {
  <template>
    {{yield}}
  </template>
}

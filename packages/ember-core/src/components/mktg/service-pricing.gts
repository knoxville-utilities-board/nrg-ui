import Component from '@glimmer/component';

import Icon from '../icon.gts';

import type { Icon as IconType } from '../../';
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
    icon: IconType;
    label: string;
    product?: string;
    description: string;
    active?: boolean;
    selected?: boolean;
  };
  Blocks: {
    default: [ComponentLike<AddonSignature>];
  };
  Element: HTMLElement;
}

class Addon extends Component<AddonSignature> {
  get label() {
    if (this.args.quantity) {
      return `${this.args.label} | Qty: ${this.args.quantity}`;
    }

    return this.args.label;
  }

  <template>
    <div class="row align-items-center my-2" ...attributes>
      <div class="col">
        {{this.label}}
      </div>
      <div class="col-auto text-end">
        {{@price}}
      </div>
    </div>
  </template>
}

export default class MktgServicePricing extends Component<MktgServicePricingSignature> {
  get status() {
    if (this.args.selected) {
      return 'fw-bold';
    }

    return this.args.active
      ? 'fw-normal'
      : 'fw-normal text-decoration-underline text-light-emphasis';
  }

  get label() {
    if (this.args.product) {
      return `${this.args.label}: ${this.args.product}`;
    }

    return this.args.label;
  }

  <template>
    <div
      class="card p-4 border-2 rounded-4 {{if @active 'border-primary'}} my-4"
      ...attributes
    >
      <div class="row align-items-center">
        <div class="col-12">
          <Icon @type={{@icon}} class="my-2" />
        </div>
        <div class="col fs-5 fw-bold">
          {{this.label}}
        </div>
        <div class="col-auto fs-5 {{this.status}}">
          {{@description}}
        </div>
      </div>
      {{yield (component Addon)}}
    </div>
  </template>
}

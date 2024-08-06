import type { Icon } from '../../icons';
import type { ComponentLike } from '@glint/template';
import Component from '@glimmer/component';

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
    icon?: Icon;
    label: string;
    package?: string;
    description: string;
    active?: boolean;
    selected?: boolean;
  };
  Blocks: {
    default: [ComponentLike<typeof Addon>];
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
      <div class="col text-truncate">
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
    if (this.args.package) {
      return `${this.args.label}: ${this.args.package}`;
    }

    return this.args.label;
  }

  <template>
    <div
      class="card p-4 border-2 rounded-4 {{if @active 'border-primary'}} my-4"
      ...attributes
    >
      <div class="row align-items-center">
        <div class="col-auto">
          <i class="fs-1 {{@icon}}" />
        </div>
        <div class="col fs-5 text-truncate fw-bold">
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

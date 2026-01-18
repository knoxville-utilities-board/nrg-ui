import Component from '@glimmer/component';
import Icon from '../icon.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class MktgAddon extends Component {
  get label() {
    if (this.args.quantity) {
      return `${this.args.label} | Qty: ${this.args.quantity}`;
    }
    return this.args.label;
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"row align-items-center my-2\" ...attributes>\n  <div class=\"col\">\n    {{this.label}}\n  </div>\n  <div class=\"col-auto text-end\">\n    {{@price}}\n  </div>\n</div>", {
      strictMode: true
    }), this);
  }
}
class MktgServicePricing extends Component {
  get status() {
    if (this.args.selected) {
      return 'fw-bold';
    }
    return this.args.active ? 'fw-normal' : 'fw-normal text-decoration-underline text-light-emphasis';
  }
  get label() {
    if (this.args.product) {
      return `${this.args.label}: ${this.args.product}`;
    }
    return this.args.label;
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"card p-4 border-2 rounded-4 {{if @active \"border-primary\"}} my-4\" ...attributes>\n  <div class=\"row align-items-center\">\n    <div class=\"col-12\">\n      {{#if @icon}}\n        <Icon @type={{@icon}} class=\"my-2\" />\n      {{/if}}\n    </div>\n    <div class=\"col fs-5 fw-bold\">\n      {{this.label}}\n    </div>\n    <div class=\"col-auto fs-5 {{this.status}}\">\n      {{@description}}\n    </div>\n  </div>\n  {{yield (component MktgAddon)}}\n</div>", {
      strictMode: true,
      scope: () => ({
        Icon,
        MktgAddon
      })
    }), this);
  }
}

export { MktgServicePricing as default };
//# sourceMappingURL=service-pricing.js.map

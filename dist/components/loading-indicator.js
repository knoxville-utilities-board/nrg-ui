import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const typeBorder = 'border';
const typeGrow = 'grow';
class LoadingIndicator extends Component {
  get typeClass() {
    const {
      type
    } = this.args;
    assert('type must be either `border` or `grow`', type === undefined || type === typeBorder || type === typeGrow);
    if (type === typeGrow) {
      return 'spinner-grow';
    }
    return 'spinner-border';
  }
  get label() {
    return this.args.label ?? 'Loading...';
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if @showLabel}}\n  <strong role=\"status\">{{this.label}}</strong>\n{{/if}}\n<div class={{this.typeClass}} role={{unless @showLabel \"status\"}} aria-hidden={{if @showLabel \"true\"}} ...attributes>\n  {{#unless @showLabel}}\n    <span class=\"visually-hidden\">{{this.label}}</span>\n  {{/unless}}\n</div>", {
      strictMode: true
    }), this);
  }
}

export { LoadingIndicator as default, typeBorder, typeGrow };
//# sourceMappingURL=loading-indicator.js.map

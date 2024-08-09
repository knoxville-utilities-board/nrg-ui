import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const typeBorder = 'border';
const typeGrow = 'grow';
class LoadingIndicatorComponent extends Component {
  get typeClass() {
    const {
      type: type1
    } = this.args;
    assert('type must be either `border` or `grow`', type1 === undefined || type1 === typeBorder || type1 === typeGrow);
    if (type1 === typeGrow) {
      return 'spinner-grow';
    }
    return 'spinner-border';
  }
  get label() {
    return this.args.label ?? 'Loading...';
  }
  static {
    setComponentTemplate(precompileTemplate("\n    {{#if @showLabel}}\n      <strong role=\"status\">{{this.label}}</strong>\n    {{/if}}\n    <div class={{this.typeClass}} role={{unless @showLabel \"status\"}} aria-hidden={{if @showLabel \"true\"}} ...attributes>\n      {{#unless @showLabel}}\n        <span class=\"visually-hidden\">{{this.label}}</span>\n      {{/unless}}\n    </div>\n  ", {
      strictMode: true
    }), this);
  }
}

export { LoadingIndicatorComponent as default, typeBorder, typeGrow };
//# sourceMappingURL=loading-indicator.js.map

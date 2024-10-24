import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { TrackedSet } from 'tracked-built-ins';
import Checkbox from './checkbox.js';
import { bind } from '../../helpers/bind.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class CheckboxGroup extends Component {
  boxes = new TrackedSet();
  constructor(owner1, args1) {
    super(owner1, args1);
    args1.onInitBinding?.(bind(this, 'value'));
  }
  get value() {
    return Array.from(this.boxes).filter(c1 => c1.value).map(c1 => c1.args.binding.valuePath);
  }
  get classList() {
    const classList1 = ['form-control', 'form-check-group'];
    if (this.args.basic) {
      classList1[0] += '-plaintext';
    }
    if (this.args.isInvalid) {
      classList1.push('is-invalid');
    } else if (this.args.isWarning) {
      classList1.push('is-warning');
    }
    return classList1.join(' ');
  }
  registerCheckbox(checkbox1) {
    this.boxes.add(checkbox1);
  }
  static {
    n(this.prototype, "registerCheckbox", [action]);
  }
  unregisterCheckbox(checkbox1) {
    this.boxes.delete(checkbox1);
  }
  static {
    n(this.prototype, "unregisterCheckbox", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div class={{this.classList}} style={{if @reverse (htmlSafe \"padding-right: 0.75em !important\")}} ...attributes>\n      {{yield (component Checkbox disabled=@disabled inline=@inline isInvalid=@isInvalid isWarning=@isWarning reverse=@reverse type=@type onDestroy=this.unregisterCheckbox onInit=this.registerCheckbox)}}\n    </div>\n  ", {
      strictMode: true,
      scope: () => ({
        htmlSafe,
        Checkbox
      })
    }), this);
  }
}

export { CheckboxGroup as default };
//# sourceMappingURL=checkbox-group.js.map

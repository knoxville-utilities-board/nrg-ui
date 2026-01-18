import { hash } from '@ember/helper';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { runTask } from 'ember-lifeline';
import { TrackedSet } from 'tracked-built-ins';
import Checkbox from './checkbox.js';
import { bind } from '../../helpers/bind.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class CheckboxGroup extends Component {
  boxes = new TrackedSet();
  constructor(owner, args) {
    super(owner, args);
    runTask(this, () => {
      args.onInitBinding?.(bind(this, 'value'));
    });
  }
  get value() {
    return Array.from(this.boxes).filter(c => c.value).map(c => c.args.binding.valuePath);
  }
  get classList() {
    const classList = ['form-control', 'form-check-group'];
    if (this.args.basic) {
      classList[0] += '-plaintext';
    }
    if (this.args.fieldOptions?.isInvalid) {
      classList.push('is-invalid');
    } else if (this.args.fieldOptions?.isWarning) {
      classList.push('is-warning');
    }
    return classList.join(' ');
  }
  registerCheckbox(checkbox) {
    this.boxes.add(checkbox);
  }
  static {
    n(this.prototype, "registerCheckbox", [action]);
  }
  unregisterCheckbox(checkbox) {
    this.boxes.delete(checkbox);
  }
  static {
    n(this.prototype, "unregisterCheckbox", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<div class={{this.classList}} style={{if @reverse (htmlSafe \"padding-right: 0.75em !important\")}} ...attributes>\n  {{yield (component Checkbox fieldOptions=(hash describedBy=@fieldOptions.describedBy disabled=@fieldOptions.disabled isInvalid=@fieldOptions.isInvalid isWarning=@fieldOptions.isWarning required=@fieldOptions.required) inline=@inline reverse=@reverse type=@type onDestroy=this.unregisterCheckbox onInit=this.registerCheckbox)}}\n</div>", {
      strictMode: true,
      scope: () => ({
        htmlSafe,
        Checkbox,
        hash
      })
    }), this);
  }
}

export { CheckboxGroup as default };
//# sourceMappingURL=checkbox-group.js.map

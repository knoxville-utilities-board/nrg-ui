import { registerDestructor } from '@ember/destroyable';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import BoundValue from './bound-value.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class Checkbox extends BoundValue {
  internalId = crypto.randomUUID();
  constructor(owner1, args1) {
    super(owner1, args1);
    args1.onInit?.(this);
    registerDestructor(this, () => {
      args1.onDestroy?.(this);
    });
  }
  get classList() {
    const classes1 = ['form-check-input'];
    if (this.args.isInvalid) {
      classes1.push('is-invalid');
    } else if (this.args.isWarning) {
      classes1.push('is-warning');
    }
    return classes1.join(' ');
  }
  get divClassList() {
    const classList1 = ['form-check'];
    if (this.isSwitch) {
      classList1.push('form-switch');
    }
    if (this.args.inline) {
      classList1.push('form-check-inline');
    }
    if (this.args.reverse) {
      classList1.push('form-check-reverse');
    }
    return classList1.join(' ');
  }
  get isSwitch() {
    return this.args.type === 'switch';
  }
  get id() {
    return this.args.id ?? this.internalId;
  }
  change(evt1) {
    const target1 = evt1.target;
    this.onChange(target1.checked);
  }
  static {
    n(this.prototype, "change", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div class={{this.divClassList}}>\n      <input aria-describedby={{@describedBy}} checked={{this.value}} class={{this.classList}} disabled={{@disabled}} id={{this.id}} role={{if this.isSwitch \"switch\" \"checkbox\"}} type=\"checkbox\" value={{this.value}} {{on \"change\" this.change}} ...attributes />\n      <label class=\"form-check-label\" for={{this.id}}>\n        {{#if (has-block)}}\n          {{yield}}\n        {{else}}\n          {{@label}}\n        {{/if}}\n        {{#if @required}}\n          <span class=\"text-danger\">*</span>\n        {{/if}}\n      </label>\n    </div>\n  ", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { Checkbox as default };
//# sourceMappingURL=checkbox.js.map

import { registerDestructor } from '@ember/destroyable';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import BoundValue from './bound-value.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class Checkbox extends BoundValue {
  internalId = crypto.randomUUID();
  constructor(owner, args) {
    super(owner, args);
    args.onInit?.(this);
    registerDestructor(this, () => {
      args.onDestroy?.(this);
    });
  }
  get classList() {
    const classes = ['form-check-input'];
    if (this.args.fieldOptions?.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.fieldOptions?.isWarning) {
      classes.push('is-warning');
    }
    return classes.join(' ');
  }
  get divClassList() {
    const classList = ['form-check'];
    if (this.isSwitch) {
      classList.push('form-switch');
    }
    if (this.args.inline) {
      classList.push('form-check-inline');
    }
    if (this.args.reverse) {
      classList.push('form-check-reverse');
    }
    return classList.join(' ');
  }
  get isSwitch() {
    return this.args.type === 'switch';
  }
  get id() {
    return this.args.fieldOptions?.id ?? this.internalId;
  }
  change(evt) {
    const target = evt.target;
    this.onChange(target.checked);
  }
  static {
    n(this.prototype, "change", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<div class={{this.divClassList}}>\n  <input aria-describedby={{@fieldOptions.describedBy}} checked={{this.value}} class={{this.classList}} disabled={{@fieldOptions.disabled}} id={{this.id}} role={{if this.isSwitch \"switch\" \"checkbox\"}} type=\"checkbox\" value={{this.value}} {{on \"change\" this.change}} ...attributes />\n  <label class=\"form-check-label\" for={{this.id}}>\n    {{#if (has-block)}}\n      {{yield}}\n    {{else}}\n      {{@label}}\n    {{/if}}\n    {{#if @fieldOptions.required}}\n      <span class=\"text-danger\">*</span>\n    {{/if}}\n  </label>\n</div>", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { Checkbox as default };
//# sourceMappingURL=checkbox.js.map

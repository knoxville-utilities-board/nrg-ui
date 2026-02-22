import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import BoundValue from './bound-value.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class RadioGroup extends BoundValue {
  get classList() {
    const classes = ['form-control', 'form-check-group'];
    if (this.args.basic) {
      classes[0] += '-plaintext';
    }
    if (this.args.fieldOptions?.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.fieldOptions?.isWarning) {
      classes.push('is-warning');
    }
    return classes.join(' ');
  }
  get name() {
    return this.args.name ?? crypto.randomUUID();
  }
  change(updatedValue) {
    if (updatedValue) {
      this.value = updatedValue;
      this.onChange(updatedValue);
    }
  }
  static {
    n(this.prototype, "change", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<div aria-describedby={{@fieldOptions.describedBy}} class={{this.classList}} id={{@fieldOptions.id}} ...attributes>\n  {{yield (hash Radio=(component Radio currentValue=this.value disabled=@fieldOptions.disabled isInvalid=@fieldOptions.isInvalid isWarning=@fieldOptions.isWarning name=this.name onChange=this.change))}}\n</div>", {
      strictMode: true,
      scope: () => ({
        hash,
        Radio
      })
    }), this);
  }
}
class Radio extends Component {
  change(evt) {
    const target = evt.target;
    this.args.onChange?.(target?.value);
  }
  static {
    n(this.prototype, "change", [action]);
  }
  get classList() {
    const classes = ['form-check-input'];
    if (this.args.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.isWarning) {
      classes.push('is-warning');
    }
    return classes.join(' ');
  }
  get checked() {
    if (this.args.option == null) {
      return false;
    }
    return this.args.option === this.args.currentValue;
  }
  get id() {
    return `${this.args.name}-${this.args.option}`;
  }
  get label() {
    return this.args.label ?? this.args.option;
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"form-check\">\n  <input checked={{this.checked}} class={{this.classList}} disabled={{@disabled}} id={{this.id}} name={{@name}} type=\"radio\" value={{@option}} {{on \"change\" this.change}} ...attributes />\n  <label class=\"form-check-label\" for={{this.id}}>\n    {{this.label}}\n  </label>\n</div>", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { RadioGroup as default };
//# sourceMappingURL=radio-group.js.map

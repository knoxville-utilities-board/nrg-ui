import { on } from '@ember/modifier';
import { action } from '@ember/object';

import BoundValue from './bound-value.ts';

export interface CheckboxSignature {
  Element: HTMLInputElement;
  Args: {
    describedBy?: string;
    disabled?: boolean;
    id?: string;
    inline?: boolean;
    isInvalid?: boolean;
    isWarning?: boolean;
    label?: string;
    type?: 'checkbox' | 'switch';
  };
  Blocks: {
    default: [];
  };
}

export default class FormCheckbox extends BoundValue<
  CheckboxSignature,
  boolean
> {
  get classList() {
    const classes = ['form-check-input'];

    if (this.args.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.isWarning) {
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

    return classList.join(' ');
  }

  get isSwitch() {
    return this.args.type === 'switch';
  }

  @action
  change(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this.onChange(target.checked);
  }

  <template>
    <div class={{this.divClassList}}>
      <input
        aria-describedby={{@describedBy}}
        checked={{this.value}}
        class={{this.classList}}
        disabled={{@disabled}}
        id={{@id}}
        role={{if this.isSwitch "switch" "checkbox"}}
        type="checkbox"
        value={{this.value}}
        {{on "change" this.change}}
        ...attributes
      />
      <label class="form-check-label" for={{@id}}>
        {{@label}}
      </label>
    </div>
  </template>
}

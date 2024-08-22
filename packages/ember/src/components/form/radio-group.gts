import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';

import BoundValue from './bound-value.ts';

import type { Optional } from '../../';
import type { ComponentLike } from '@glint/template';

export interface RadioGroupFieldSignature {
  Element: HTMLDivElement;
  Args: {
    basic?: boolean;
    describedBy?: string;
    disabled?: boolean;
    id?: string;
    isInvalid?: boolean;
    isWarning?: boolean;
    name: string;
  };
  Blocks: {
    default: [{ Radio: ComponentLike<RadioFieldSignature> }];
  };
}

export default class RadioGroupField extends BoundValue<
  RadioGroupFieldSignature,
  string
> {
  get classList() {
    const classes = ['form-control'];

    if (this.args.basic) {
      classes[0] += '-plaintext';
    }

    if (this.args.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.isWarning) {
      classes.push('is-warning');
    }

    return classes.join(' ');
  }

  get name() {
    return this.args.name ?? crypto.randomUUID();
  }

  @action
  change(updatedValue: Optional<string>) {
    if (updatedValue) {
      this.value = updatedValue;
      this.onChange(updatedValue);
    }
  }

  <template>
    <div
      aria-describedby={{@describedBy}}
      class={{this.classList}}
      id={{@id}}
      ...attributes
    >
      {{yield
        (hash
          Radio=(component
            RadioField
            currentValue=this.value
            disabled=@disabled
            isInvalid=@isInvalid
            isWarning=@isWarning
            name=this.name
            onChange=this.change
          )
        )
      }}
    </div>
  </template>
}

export interface RadioFieldSignature {
  Element: HTMLInputElement;
  Args: {
    currentValue?: string | null;
    disabled?: boolean;
    isInvalid?: boolean;
    isWarning?: boolean;
    label?: string;
    name: string;
    option?: string;
    onChange?: (value: string, ...args: unknown[]) => void;
  };
}

class RadioField extends Component<RadioFieldSignature> {
  @action
  change(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this.args.onChange?.(target?.value);
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

  <template>
    <div class="form-check">
      <input
        checked={{this.checked}}
        class={{this.classList}}
        disabled={{@disabled}}
        id={{this.id}}
        name={{@name}}
        type="radio"
        value={{@option}}
        {{on "change" this.change}}
        ...attributes
      />
      <label class="form-check-label" for={{this.id}}>
        {{this.label}}
      </label>
    </div>
  </template>
}

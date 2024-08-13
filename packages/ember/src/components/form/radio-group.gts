import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';

import BoundValue from './bound-value.ts';

import type { Optional } from '../../types';
import type { ComponentLike } from '@glint/template';

export interface RadioGroupFieldSignature {
  Element: HTMLDivElement;
  Args: {
    name: string;
    basic?: boolean;
    disabled?: boolean;
  };
  Blocks: {
    default: [{ Radio: ComponentLike<RadioField> }];
  };
}

export default class RadioGroupField extends BoundValue<
  RadioGroupFieldSignature,
  string
> {
  @action
  change(updatedValue: Optional<string>) {
    if (updatedValue) {
      this.value = updatedValue;
      this.onChange?.(updatedValue);
    }
  }

  get classList() {
    const classes = ['form-control'];

    if (this.args.basic) {
      classes[0] += '-plaintext';
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classList}} ...attributes>
      {{yield
        (hash
          Radio=(component
            RadioField
            name=@name
            disabled=@disabled
            onChange=this.change
            currentValue=this.value
          )
        )
      }}
    </div>
  </template>
}

export interface RadioFieldSignature {
  Element: HTMLInputElement;
  Args: {
    name: string;
    option?: string;
    currentValue?: string | null;
    label?: string;
    disabled?: boolean;
    onChange?: (value: string, ...args: unknown[]) => void;
  };
}

class RadioField extends Component<RadioFieldSignature> {
  @action
  change(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this.args.onChange?.(target?.value);
  }

  get checked() {
    // do I need a null check here since TS makes option required?
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
        class="form-check-input"
        disabled={{@disabled}}
        id={{this.id}}
        type="radio"
        name={{@name}}
        checked={{this.checked}}
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

import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';

import BoundValue from './bound-value.ts';

import type { FieldOptions } from './field.gts';
import type { BoundValueSignature, Optional } from '../../index.ts';
import type { ComponentLike, WithBoundArgs } from '@glint/template';

export type RadioGroupSignature = BoundValueSignature<
  {
    Element: HTMLDivElement;
    Args: {
      basic?: boolean;
      name?: string;

      fieldOptions?: FieldOptions;
    };
    Blocks: {
      default: [{ Radio: WithBoundArgs<ComponentLike<RadioSignature>, 'name'> }];
    };
  },
  string
>;

export default class RadioGroup extends BoundValue<RadioGroupSignature, string> {
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

  @action
  change(updatedValue: Optional<string>) {
    if (updatedValue) {
      this.value = updatedValue;
      this.onChange(updatedValue);
    }
  }

  <template>
    <div
      aria-describedby={{@fieldOptions.describedBy}}
      class={{this.classList}}
      id={{@fieldOptions.id}}
      ...attributes
    >
      {{yield
        (hash
          Radio=(component
            Radio
            currentValue=this.value
            disabled=@fieldOptions.disabled
            isInvalid=@fieldOptions.isInvalid
            isWarning=@fieldOptions.isWarning
            name=this.name
            onChange=this.change
          )
        )
      }}
    </div>
  </template>
}

export interface RadioSignature {
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

class Radio extends Component<RadioSignature> {
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

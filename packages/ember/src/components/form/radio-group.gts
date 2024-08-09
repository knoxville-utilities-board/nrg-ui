import BoundValue from './bound-value.ts';
import { action } from '@ember/object';
import Radio from './radio.gts';
import bind from '../../helpers/bind.ts';
import type { Optional } from '../../types';

export interface RadioGroupFieldSignature {
  Element: HTMLDivElement;
  Args: {
    options: Array<Record<'option' | 'label', string>>;
    name: string;
    basic?: boolean;
    disabled?: boolean;
    onChange?: (value: string, ...args: unknown[]) => void;
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
      this.args.onChange?.(updatedValue);
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
      {{#each @options as |radio|}}
        <Radio
          @name={{@name}}
          @disabled={{@disabled}}
          @option={{radio.option}}
          @label={{radio.label}}
          @onChange={{this.change}}
          @binding={{bind this.model this.valuePath}}
        />
      {{/each}}
    </div>
  </template>
}

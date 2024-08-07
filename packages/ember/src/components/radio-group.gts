import BoundValue from './bound-value.ts';
import { action } from '@ember/object';
import Radio from './radio.ts';
import bind from '../helpers/bind.ts';

export interface RadioGroupFieldSignature {
  Element: HTMLInputElement;
  Args: {
    options: Array<Record<string, string>>;
    name: string;
    disabled?: boolean;
    readonly?: boolean;
  };
}

export default class RadioGroupField extends BoundValue<
  RadioGroupFieldSignature,
  string
> {
  @action
  change(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this.value = target?.value;
    this.args.onChange?.(target?.value);
  }

  <template>
    <div>Label Here</div>
    {{#each this.args.options as |radio|}}
      <Radio
        @name={{@name}}
        @option={{radio.option}}
        @binding={{bind this.model "value"}}
      />

    {{/each}}
  </template>
}

import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export interface RadioFieldSignature {
  Element: HTMLInputElement;
  Args: {
    name: string;
    option?: string;
    currentValue?: string;
    label?: string;
    disabled?: boolean;
    onChange?: (value: string, ...args: unknown[]) => void;
  };
}

export default class RadioField extends Component<
  RadioFieldSignature
> {
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
        {{on "input" this.change}}
        ...attributes
      />
      <label class="form-check-label" for={{this.id}}>
        {{this.label}}
      </label>
    </div>
  </template>
}

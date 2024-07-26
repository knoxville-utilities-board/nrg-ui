import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

declare interface BaseInputFieldSignature {
  Element: HTMLDivElement;
  Args: {
    focusId?: string;
    class?: string;
    type?: string;
    min?: number;
    max?: number;
    step?: string | number;
    value?: string | number;
    name?: string;
    autocapitalize?: boolean;
    disabled?: boolean;
    maxLength?: number;
    autocomplete?: boolean;
    placeholder?: string;
    readonly?: boolean;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: any) => unknown;
    onBlur?: () => unknown;
    onFocus?: () => unknown;

  };
}


export default class BaseInputField extends Component<BaseInputFieldSignature> {
  constructor() {

    // @ts-ignore
    super(...arguments);

    this.innerValue = this.trimmedOuterValue;
  }

  @tracked
  innerValue;

  get trimmedOuterValue() {
    const value = this.args.value;

    if (value === undefined || value === null) {
      return '';
    }
    if (typeof value == 'string') {
      return value.trim() ?? '';
    } else if (typeof value == 'number') {
      return value.toString() ?? '';
    }
    return '';
  }

  get trimmedInnerValue() {
    return this.innerValue?.trim?.() ?? '';
  }

  get displayValue() {
    if (this.trimmedInnerValue != this.trimmedOuterValue) {
      return this.trimmedOuterValue;
    }
    return this.innerValue;
  }

  @action
  blur() {
    this.args.onBlur?.();
  }

  @action
  focus() {
    this.args.onFocus?.();
  }

  //Event type doesnt have a target with a value, target is the wrong type.
  @action
  valueChange(event: any) {
    this.innerValue = event.target.value;
    const value = event.target.value.trim();
    this.args.onChange?.(value);
  }

  <template>
    <div class="input-group">
      <input
        id={{@focusId}}
        class="form-control {{@class}}"
        type={{@type}}
        min={{@min}}
        max={{@max}}
        step={{@step}}
        value={{this.displayValue}}
        name={{@name}}
        autocapitalize={{@autocapitalize}}
        disabled={{@disabled}}
        maxlength={{@maxLength}}
        autocomplete={{if @autocomplete "on" "off"}}
        placeholder={{@placeholder}}
        readonly={{@readonly}}
        {{on "blur" this.blur}}
        {{on "focus" this.focus}}
        {{on "input" this.valueChange}}
        ...attributes
      />
    </div>
  </template>
}

import ValidationComponent from './validation-component.ts';
import BaseInputField from './internal/base-input-field.gts';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { hash } from '@ember/helper';

import type { ComponentLike } from '@glint/template';


const defaultType = 'text';


declare interface TextFieldSignature {
  Element: HTMLDivElement;
  Args: {
    focusId?: string;
    class?: string;
    type?: string;
    min?: number;
    max?: number;
    step?: string | number;
    value?: string | number;

    defaultValue?: string | number;
    model?: object;
    valuePath?: string;
    useNestedValuePath?: boolean;
    useDefaultValue?: boolean;

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

    allowDecimals?: boolean;
    allowNull?: boolean;
    allowNegatives?: boolean;

    validateInput?: (value: string) => string | undefined;
  };
  Blocks: {
    default: [
      {
        BaseInputField: ComponentLike<BaseInputField>;
      },
    ];
  };

}



export default class NrgTextFieldComponent extends ValidationComponent<TextFieldSignature> {
  get type() {
    return this.args.type ?? defaultType;
  }

  get step() {
    if (this.type != 'number') {
      return undefined;
    }
    const { allowDecimals, step } = this.args;
    if (allowDecimals) {
      return step ?? 'any';
    }

    return step ?? 1;
  }

  validateInput(input: string) {
    if (this.args.validateInput) {
      return this.args.validateInput(input);
    }

    let isValid = true;
    if (this.type === 'number') {
      const min = this.args.min ?? 0;
      if (isEmpty(input)) {
        if (!this.args.allowNull) {
          return min.toString();
        }
        return undefined;
      }
      let numericValue = parseFloat(input);
      if (!this.args.allowDecimals) {
        numericValue = Math.trunc(numericValue);
        input = numericValue.toString();
      }
      isValid = !isNaN(numericValue);

      if (this.args.allowNegatives !== true && numericValue < 0) {
        isValid = true;
        input = min.toString();
      }
    }
    return isValid ? input: undefined;
  }

  @action
  onChange(value: string) {
    const validatedValue = this.validateInput(value);
    if (Boolean(validatedValue) === false) {
      return;
    }
    super.onChange(validatedValue);
  }

  <template>
    {{#if (has-block)}}
      {{yield
        (hash
          BaseInputField=(component
            BaseInputField
            focusId=@focusId
            type=this.type
            min=@min
            max=@max
            step=this.step
            value=this.value
            name=@name
            placeholder=@placeholder
            autocomplete=@autocomplete
            autocapitalize=@autocapitalize
            disabled=@disabled
            maxLength=@maxLength
            readonly=@readonly
            onFocus=@onFocus
            onBlur=@onBlur
            onChange=this.onChange
          )
        )
      }}
    {{else}}
      <BaseInputField
        @focusId={{@focusId}}
        @type={{this.type}}
        @min={{@min}}
        @max={{@max}}
        @step={{this.step}}
        @value={{this.value}}
        @name={{@name}}
        @placeholder={{@placeholder}}
        @autocomplete={{@autocomplete}}
        @autocapitalize={{@autocapitalize}}
        @disabled={{@disabled}}
        @maxLength={{@maxLength}}
        @readonly={{@readonly}}
        @onFocus={{@onFocus}}
        @onBlur={{@onBlur}}
        @onChange={{this.onChange}}
      />
    {{/if}}
  </template>
}

import BoundValue from './bound-value.ts';
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

import type { ComponentLike } from '@glint/template';

interface InnerTextAreaSignature {
  Element: HTMLTextAreaElement;
  Args: {
    basic?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    value?: string;

    onBlur?: (evt: FocusEvent) => unknown;
    onFocus?: (evt: FocusEvent) => unknown;
    onChange?: (value: string) => unknown;
  };
}

class InnerTextArea extends Component<InnerTextAreaSignature> {
  get classList() {
    const classes = ['form-control'];

    if (this.args.basic) {
      classes[0] += '-plaintext';
    }

    return classes.join(' ');
  }

  @action
  onBlur(evt: FocusEvent) {
    this.args.onBlur?.(evt);
  }

  @action
  onFocus(evt: FocusEvent) {
    this.args.onFocus?.(evt);
  }

  @action
  onChange(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this.args.onChange?.(target?.value);
  }

  <template>
    <textarea
      class={{this.classList}}
      disabled={{@disabled}}
      readonly={{@readonly}}
      type="text"
      value={{@value}}
      {{on "blur" this.onBlur}}
      {{on "focus" this.onFocus}}
      {{on "input" this.onChange}}
      ...attributes
    />
  </template>
}

export interface TextAreaSignature {
  Element: HTMLTextAreaElement;
  Args: {
    basic?: boolean;
    disabled?: boolean;
    readonly?: boolean;

    onBlur?: (evt: FocusEvent) => unknown;
    onFocus?: (evt: FocusEvent) => unknown;
  };
  Blocks: {
    default?: [ComponentLike<InnerTextAreaSignature>];
  };
}

export default class TextArea extends BoundValue<TextAreaSignature, string> {
  <template>
    {{#if (has-block)}}
      {{yield
        (component
          InnerTextArea
          basic=@basic
          disabled=@disabled
          readonly=@readonly
          value=this.value
          onBlur=@onBlur
          onChange=this.onChange
          onFocus=@onFocus
        )
      }}
    {{else}}
      <InnerTextArea
        @basic={{@basic}}
        @disabled={{@disabled}}
        @readonly={{@readonly}}
        @value={{this.value}}
        @onBlur={{@onBlur}}
        @onChange={{this.onChange}}
        @onFocus={{@onFocus}}
        ...attributes
      />
    {{/if}}
  </template>
}

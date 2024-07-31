import BoundValue from './bound-value.ts';
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { or } from 'ember-truth-helpers';

import type { ComponentLike } from '@glint/template';

interface InnerTextFieldSignature {
  Element: HTMLInputElement;
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

class InnerTextField extends Component<InnerTextFieldSignature> {
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
  onChange(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this.args.onChange?.(target?.value);
  }

  @action
  onFocus(evt: FocusEvent) {
    this.args.onFocus?.(evt);
  }

  <template>
    <input
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

export interface TextFieldSignature {
  Element: HTMLInputElement;
  Args: {
    basic?: boolean;
    disabled?: boolean;
    readonly?: boolean;

    onBlur?: (evt: FocusEvent) => unknown;
    onFocus?: (evt: FocusEvent) => unknown;
  };
  Blocks: {
    default?: [ComponentLike<InnerTextFieldSignature>];
    'left-label'?: [];
    'right-label'?: [];
  };
}

export default class TextField extends BoundValue<TextFieldSignature, string> {
  <template>
    {{#if (has-block)}}
      {{yield
        (component
          InnerTextField
          basic=@basic
          disabled=@disabled
          readonly=@readonly
          value=this.value
          onBlur=@onBlur
          onChange=this.onChange
          onFocus=@onFocus
        )
      }}
    {{else if (or (has-block "left-label") (has-block "right-label"))}}
      <div class="input-group">
        {{#if (has-block "left-label")}}
          <span class="input-group-text">
            {{yield to="left-label"}}
          </span>
        {{/if}}
        <InnerTextField
          @basic={{@basic}}
          @disabled={{@disabled}}
          @readonly={{@readonly}}
          @value={{this.value}}
          @onBlur={{@onBlur}}
          @onChange={{this.onChange}}
          @onFocus={{@onFocus}}
          ...attributes
        />
        {{#if (has-block "right-label")}}
          <span class="input-group-text">
            {{yield to="right-label"}}
          </span>
        {{/if}}
      </div>
    {{else}}
      <InnerTextField
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

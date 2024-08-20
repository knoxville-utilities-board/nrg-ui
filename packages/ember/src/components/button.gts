import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { and, not, or } from 'ember-truth-helpers';

import type { ButtonGroupType } from './button-group';
import type { Icon } from '../';

export interface ButtonSignature {
  Element: HTMLButtonElement;
  Args: {
    _class?: string;
    disabled?: boolean;
    group?: ButtonGroupType;
    icon?: Icon;
    iconPosition?: 'right' | 'left';
    iconLabel?: string;
    loading?: boolean;
    text?: string;
    type?: 'button' | 'submit';
    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    default?: [];
  };
}

export default class ButtonComponent extends Component<ButtonSignature> {
  get classList() {
    let classes = ['btn'];

    if (this.args._class) {
      classes.push(this.args._class);
    }

    if (this.args.disabled) {
      classes.push('disabled');
    }

    return classes.join(' ');
  }

  get disabled() {
    return this.args.disabled || this.args.loading;
  }

  get hasIcon() {
    return Boolean(this.args.icon);
  }

  get alignIconRight() {
    return this.hasIcon && this.args.iconPosition === 'right';
  }

  get hasIconLabel() {
    return Boolean(this.args.iconLabel);
  }

  @action
  onClick(evt: MouseEvent) {
    this.args.onClick?.(evt);

    this.args.group?.onClick(evt);
  }

  <template>
    <button
      class={{this.classList}}
      disabled={{this.disabled}}
      type={{or @type "button"}}
      aria-disabled={{if this.disabled "true"}}
      {{on "click" this.onClick}}
      ...attributes
    >
      {{#if @loading}}
        <span
          class="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden" role="status">
          Loading...
        </span>
      {{else}}
        {{#if (and this.hasIcon (not this.alignIconRight))}}
          <i class="me-1 {{@icon}}" aria-label={{@iconLabel}}></i>
        {{/if}}
        {{#if (has-block)}}
          {{yield}}
        {{else}}
          {{@text}}
        {{/if}}
        {{#if (and this.hasIcon this.alignIconRight)}}
          <i class="ms-1 {{@icon}}" aria-label={{@iconLabel}}></i>
        {{/if}}
      {{/if}}
    </button>
  </template>
}

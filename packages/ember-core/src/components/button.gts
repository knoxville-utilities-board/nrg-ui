import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import { or } from 'ember-truth-helpers';

import type { ButtonGroupType } from './button-group.gts';
import type { IconType } from '../';

export interface ButtonSignature {
  Element: HTMLButtonElement;
  Args: {
    _class?: string;
    disabled?: boolean;
    group?: ButtonGroupType;
    icon?: IconType;
    iconPosition?: 'right' | 'left' | 'center';
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

export default class Button extends Component<ButtonSignature> {
  get classList() {
    const classes = [
      'btn',
      'position-relative',
      'd-inline-flex',
      'justify-content-center',
      'align-items-center',
    ];

    if (this.args._class) {
      classes.push(this.args._class);
    }

    if (this.args.loading) {
      classes.push('loading');
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

  get isLeftAlignedIcon() {
    return (
      this.hasIcon &&
      (this.args.iconPosition === 'left' || !this.args.iconPosition)
    );
  }

  get isRightAlignedIcon() {
    return this.hasIcon && this.args.iconPosition === 'right';
  }

  get isCenterAlignedIcon() {
    return this.hasIcon && this.args.iconPosition === 'center';
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
          class="spinner-border spinner-border-sm position-absolute"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden" role="status">
          {{t "nrg.base.loading"}}
        </span>
      {{/if}}

      {{#if this.isLeftAlignedIcon}}
        <i class="me-1 {{@icon}}" aria-label={{@iconLabel}}></i>
      {{/if}}

      <span class="content">
        {{#if this.isCenterAlignedIcon}}
          <i class="{{@icon}}" aria-label={{@iconLabel}}></i>
        {{else if (has-block)}}
          {{yield}}
        {{else}}
          {{@text}}
        {{/if}}
      </span>

      {{#if this.isRightAlignedIcon}}
        <i class="ms-1 {{@icon}}" aria-label={{@iconLabel}}></i>
      {{/if}}

    </button>
  </template>
}

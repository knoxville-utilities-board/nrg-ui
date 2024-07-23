import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import type { NrgIconValue } from '../icon-types';
import { action } from '@ember/object';

declare type AlertType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

interface AlertSignature {
  Element: HTMLDivElement;
  Args: {
    dismissible?: boolean;
    icon?: NrgIconValue;
    text?: string;
    type?: AlertType;
    onDismiss?: () => unknown;
  };
  Blocks: {
    default?: [];
  };
}

export default class AlertComponent extends Component<AlertSignature> {
  get type() {
    return this.args.type ?? 'primary';
  }

  get classList() {
    const classes = ['alert', `alert-${this.type}`];

    if (this.args.dismissible) {
      classes.push('alert-dismissible');
    }

    return classes.join(' ');
  }

  @action
  onDismiss() {
    if (!this.args.dismissible) {
      return;
    }
    this.args.onDismiss?.();
  }

  <template>
    <div class={{this.classList}} role="alert">
      {{#if @icon}}
        <i class={{@icon}} />
      {{/if}}
      {{#if @text}}
        {{@text}}
      {{else if (has-block)}}
        {{yield}}
      {{/if}}
      {{#if @dismissible}}
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          {{on "click" this.onDismiss}}
        ></button>
      {{/if}}
    </div>
  </template>
}

import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { cssTransition } from 'ember-css-transitions';
import { t } from 'ember-intl';

import type { IconType } from '../';

declare type AlertType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

export interface AlertSignature {
  Element: HTMLDivElement | null;
  Args: {
    dismissible?: boolean;
    icon?: IconType;
    text?: string;
    type?: AlertType;
    onDismiss?: () => unknown;
  };
  Blocks: {
    default?: [];
  };
}

export default class AlertComponent extends Component<AlertSignature> {
  @tracked
  visible = true;

  get type() {
    return this.args.type ?? 'primary';
  }

  get classList() {
    const classes = ['alert', `alert-${this.type}`];

    if (this.args.dismissible) {
      classes.push('alert-dismissible');
    }

    classes.push('show');
    classes.push('fade');

    return classes.join(' ');
  }

  @action
  onDismiss() {
    if (!this.args.dismissible) {
      return;
    }
    this.visible = false;
  }

  @action
  onDismissed() {
    this.args.onDismiss?.();
  }

  <template>
    {{#if this.visible}}
      <div
        class={{this.classList}}
        role="alert"
        {{cssTransition
          leaveClass="show"
          leaveActiveClass="show"
          leaveToClass="hide"
          didTransitionOut=this.onDismissed
        }}
      >
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
            aria-label={{t "nrg.base.close"}}
            {{on "click" this.onDismiss}}
          ></button>
        {{/if}}
      </div>
    {{/if}}
  </template>
}

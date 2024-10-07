import { fn } from '@ember/helper';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { not } from 'ember-truth-helpers';

import Alert from './alert.gts';

import type ToastService from '../services/toast.ts';

export interface ToasterSignature {
  Element: HTMLDivElement;
  Args: {
    fixed?: boolean;
  };
}

export default class ToasterComponent extends Component<ToasterSignature> {
  @service
  toast!: ToastService;

  get fixed() {
    return this.args.fixed ?? true;
  }

  get classList() {
    const classes = ['toaster'];

    if (this.fixed) {
      classes.push('fixed');
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classList}} ...attributes>
      {{#each this.toast.queue as |toast|}}
        <Alert
          @type={{toast.type}}
          @dismissible={{not toast.sticky}}
          @onDismiss={{fn this.toast.remove toast}}
        >
          {{toast.message}}
        </Alert>
      {{/each}}
    </div>
  </template>
}

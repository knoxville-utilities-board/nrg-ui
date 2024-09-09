import { fn } from '@ember/helper';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Alert from '@nrg-ui/core/components/alert';
import FlashMessageService from '@nrg-ui/core/services/flash-messages';
import { not } from 'ember-truth-helpers';

export interface ToasterSignature {
  Element: HTMLDivElement;
  Args: {
    fixed?: boolean;
  };
}

export default class ToasterComponent extends Component<ToasterSignature> {
  @service
  flashMessages!: FlashMessageService;

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
    <div class={{this.classList}}>
      {{#each this.flashMessages.queue as |toast|}}
        <Alert
          @type={{toast.type}}
          @dismissible={{not toast.sticky}}
          @onDismiss={{fn this.flashMessages.remove toast}}
        >
          {{toast.message}}
        </Alert>
      {{/each}}
    </div>
  </template>
}

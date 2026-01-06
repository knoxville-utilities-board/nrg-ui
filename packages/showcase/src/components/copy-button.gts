import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import perform from 'ember-concurrency/helpers/perform';

import '../assets/copy-button.css';

export interface CopyButtonSignature {
  Element: HTMLButtonElement;
  Args: {
    text: string;
  };
}

export default class CopyButton extends Component<CopyButtonSignature> {
  get icon() {
    return this.copyToClipboard.isRunning ? 'bi-clipboard-check' : 'bi-clipboard';
  }

  copyToClipboard = task(async () => {
    await navigator.clipboard.writeText(this.args.text);
    await timeout(2000);
  });

  <template>
    <button
      class="btn btn-outline-secondary copy-button"
      type="button"
      {{on "click" (perform this.copyToClipboard)}}
      ...attributes
    >
      <i class="bi {{this.icon}}" aria-hidden="true"></i>
      <span class="visually-hidden">
        Copy
      </span>
    </button>
  </template>
}

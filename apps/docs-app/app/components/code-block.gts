import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { didInsert } from '@nrg-ui/core';

export default class CodeBlock extends Component {
  @service('ember-freestyle')
  freestyle;

  get lang() {
    return this.args.lang ?? 'handlebars';
  }

  @action
  highlight(el: HTMLPreElement) {
    el.querySelector('code').textContent = this.args.code;
    this.freestyle.highlight(el);
  }

  <template>
    <pre
      class="mb-0 d-flex align-items-center bg-white {{this.lang}}"
      {{! template-lint-disable no-inline-styles }}
      style="--bs-bg-opacity: 0; font-size: 0.8rem;"
      tabindex="0"
      {{didInsert this.highlight}}
      ...attributes
    >
      <code></code>
    </pre>
  </template>
}

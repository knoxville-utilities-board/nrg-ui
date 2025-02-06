// @ts-nocheck - TODO

import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { onInsert } from '@nrg-ui/core';

import type ThemeService from '../services/theme';

export default class CodeBlock extends Component {
  @service('ember-freestyle')
  freestyle;

  @service
  declare theme: ThemeService;

  constructor(owner: unknown, args: object) {
    super(owner, args);

    registerDestructor(this, () => {
      this.theme.codeBlocks.delete(this);
    });
  }

  get lang() {
    return this.args.lang ?? 'handlebars';
  }

  @action
  highlight(el: HTMLPreElement) {
    if (!this.theme.codeBlocks.has(this)) {
      this.theme.codeBlocks.set(this, el);
    }

    el.querySelector('code').textContent = this.args.code;
    this.freestyle.highlight(el);
  }

  <template>
    <pre
      class="mb-0 d-flex align-items-center bg-body {{this.lang}}"
      {{! template-lint-disable no-inline-styles }}
      style="--bs-bg-opacity: 0; font-size: 0.8rem;"
      tabindex="0"
      {{onInsert this.highlight}}
      ...attributes
    >
      <code></code>
    </pre>
  </template>
}

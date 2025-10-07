import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { onInsert } from '@nrg-ui/core';

import type Owner from '@ember/owner';

export interface CodeBlockSignature {
  Element: HTMLPreElement;
  Args: {
    code: string;
    lang?: string;
  };
}

interface FreestyleService {
  highlight(element: HTMLElement): void;
}

interface ThemeService {
  codeBlocks: Map<CodeBlock, HTMLElement>;
}

export default class CodeBlock extends Component<CodeBlockSignature> {
  @service('ember-freestyle')
  declare freestyle: FreestyleService;

  @service
  declare theme: ThemeService;

  constructor(owner: Owner, args: CodeBlockSignature['Args']) {
    super(owner, args);

    registerDestructor(this, () => {
      this.theme.codeBlocks.delete(this);
    });
  }

  get lang() {
    return this.args.lang ?? 'handlebars';
  }

  @action
  highlight(el: HTMLElement) {
    if (!this.theme.codeBlocks.has(this)) {
      this.theme.codeBlocks.set(this, el);
    }

    el.querySelector('code')!.textContent = this.args.code;
    this.freestyle.highlight(el);
  }

  <template>
    <pre
      class="mb-0 p-2 d-flex align-items-center bg-body {{this.lang}}"
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

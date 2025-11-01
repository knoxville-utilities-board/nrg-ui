import { service } from '@ember/service';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { htmlSafe } from '@ember/template';
import { cached } from '@glimmer/tracking';

import type ThemeService from '@nrg-ui/core/services/theme';
import type ShikiService from '../services/shiki.ts';
import type { BundledLanguage } from 'shiki';

import '../assets/code-block.css';

export interface CodeBlockSignature {
  Element: HTMLElement;
  Args: {
    code: string;
    lang: BundledLanguage;

    inline?: boolean;
  };
}

function unescapeSource(source: string): string {
  return source
    .replace(/&#125;/g, '}')
    .replace(/&#123;/g, '{')
    .replace(/&#10;/g, '\n')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

export default class CodeBlock extends Component<CodeBlockSignature> {
  @service
  declare theme: ThemeService;

  @service
  declare shiki: ShikiService;

  @cached
  get code() {
    let { code, lang } = this.args;

    assert('Code is required', code);
    assert('Language is required', lang);

    code = unescapeSource(code);

    return this.shiki.highlight(code, lang);
  }

  get style() {
    const { code } = this;
    const theme = this.theme.resolvedTheme;

    const backgroundColor = code.background[theme];

    return htmlSafe(`background-color: ${backgroundColor};`);
  }

  <template>
    {{#if @inline}}
      <span class="code-block inline" style={{this.style}} ...attributes>
        {{htmlSafe this.code.html}}
      </span>
    {{else}}
      <div
        class="border border-secondary rounded p-3 my-2"
        style={{this.style}}
        ...attributes
      >
        {{htmlSafe this.code.html}}
      </div>
    {{/if}}
  </template>
}

import { assert } from '@ember/debug';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';

import type ShikiService from '../services/shiki.ts';
import type ThemeService from '@nrg-ui/core/services/theme';
import type { BundledLanguage, CodeToHastOptions } from 'shiki';

import '../assets/code-block.css';

export interface CodeBlockSignature {
  Element: HTMLElement;
  Args: {
    code: string;
    lang: BundledLanguage | 'plaintext';
    options?: Partial<CodeToHastOptions>;

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
    const { code, lang } = this.args;

    assert('Code is required', code);
    assert('Language is required', lang);

    const rawSource = unescapeSource(code);

    return this.shiki.highlight(rawSource, lang);
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

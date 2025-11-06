import { assert } from '@ember/debug';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';

import CopyButton from './copy-button.gts';

import type ShikiService from '../services/shiki.ts';
import type ThemeService from '@nrg-ui/core/services/theme';
import type { BundledLanguage, CodeToHastOptions } from 'shiki';

import '../assets/code-block.css';

export interface CodeBlockSignature {
  Element: HTMLElement;
  Args: {
    code: string;
    label?: string;
    lang: BundledLanguage | 'plaintext';
    showCopyButton?: boolean;
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

  get showCopyButton() {
    assert(
      'showCopyButton cannot be used when @inline={{true}}',
      !this.args.inline || this.args.showCopyButton === undefined,
    );

    return this.args.showCopyButton ?? true;
  }

  <template>
    {{#if @inline}}
      <span class="d-inline-flex inline" style={{this.style}} ...attributes>
        {{htmlSafe this.code.html}}
      </span>
    {{else}}
      <div
        class="border border-secondary rounded p-3 my-2 position-relative code-block-wrapper"
        style={{this.style}}
        data-label={{@label}}
        ...attributes
      >
        {{htmlSafe this.code.html}}
        {{#if this.showCopyButton}}
          <CopyButton @text={{@code}} />
        {{/if}}
      </div>
    {{/if}}
  </template>
}

export interface TypeCodeBlockSignature {
  Element: HTMLElement;
  Args: {
    code: string;
    label?: string;
    inline?: boolean;
    showCopyButton?: boolean;

    options?: Partial<CodeToHastOptions>;
  };
}

export class TypeCodeBlock extends Component<TypeCodeBlockSignature> {
  get options(): Partial<CodeToHastOptions> {
    return {
      grammarContextCode: 'let a:',
      ...this.args.options,
    };
  }

  <template>
    <CodeBlock
      @code={{@code}}
      @label={{@label}}
      @lang="typescript"
      @inline={{@inline}}
      @showCopyButton={{@showCopyButton}}
      @options={{this.options}}
      ...attributes
    />
  </template>
}

import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';

import CopyButton from './copy-button.gts';

import type ShikiService from '../services/shiki.ts';
import type ThemeService from '@nrg-ui/core/services/theme';
import type { BundledLanguage, CodeToHastOptions } from 'shiki';

import '../assets/code-block.css';

const MARKER_PATTERN = '{{__SHOWCASE_ARG_([^}]+)-([^}]+)__}}';

export interface CodeBlockSignature {
  Element: HTMLElement;
  Args: {
    code: string;
    label?: string;
    lang: BundledLanguage | 'plaintext';
    showCopyButton?: boolean;
    model?: object;
    options?: Partial<CodeToHastOptions>;

    inline?: boolean;
  };
}

function coerceValue(
  value: unknown,
  path: string,
  wrap: boolean = true,
): string {
  const type = typeof value;
  const stringVal = String(value);

  if (type === 'string') {
    return `"${stringVal}"`;
  }

  if (type === 'boolean' || type === 'number') {
    if (wrap) {
      return `{{${stringVal}}}`;
    }

    return stringVal;
  }

  if (Array.isArray(value)) {
    const args = value.map((item, index) =>
      coerceValue(item, `${path}.${index}`, false),
    );

    return `{{array ${args}}}`;
  }

  return path;
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
  get resolvedCode() {
    const { code, model } = this.args;

    assert('Code is required', code);

    const rawSource = unescapeSource(code);

    if (!model) {
      return rawSource;
    }

    const pattern = new RegExp(MARKER_PATTERN, 'g');

    return rawSource.replace(pattern, (_, blockName: string, key: string) => {
      const value = get(model, key);

      assert(`Model is missing key: ${key}`, value !== undefined);

      return coerceValue(value, `${blockName}.${key}`);
    });
  }

  @cached
  get code() {
    const { lang } = this.args;

    assert('Language is required', lang);

    return this.shiki.highlight(this.resolvedCode, lang);
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
      <span
        class="d-inline-flex inline mb-0"
        style={{this.style}}
        ...attributes
      >
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
          <CopyButton @text={{this.resolvedCode}} />
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

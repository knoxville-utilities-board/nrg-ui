import { assert, warn } from '@ember/debug';
import { concat } from '@ember/helper';
import { get } from '@ember/object';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { classes } from '@nrg-ui/core/helpers/classes';

import CopyButton from './copy-button.gts';

import type ShikiService from '../services/shiki.ts';
import type { AllowedLanguage } from '../services/shiki.ts';
import type ThemeService from '@nrg-ui/core/services/theme';
import type { CodeToHastOptions } from 'shiki';

import '../assets/code-block.css';

const MARKER_PATTERN = '{{__SHOWCASE_ARG_([^}]+)-([^}]+)__}}';

export interface CodeBlockSignature {
  Element: HTMLElement;
  Args: {
    code: string;
    label?: string;
    lang: AllowedLanguage;
    name?: string;
    showCopyButton?: boolean;
    model?: object;
    options?: Partial<CodeToHastOptions>;
    showLineNumbers?: boolean;
    startingLineNumber?: number;

    inline?: boolean;
  };
  Blocks: {
    name?: [];
  };
}

function or(...args: unknown[]) {
  return args.some((a) => Boolean(a));
}

function coerceValue(value: unknown, path: string, wrap: boolean = true): string {
  const type = typeof value;

  if (value === undefined) {
    return `{{undefined}}`;
  }

  if (type === 'string') {
    return `"${value}"`;
  }

  const stringVal = String(value);

  if (type === 'boolean' || type === 'number') {
    return wrap ? `{{${stringVal}}}` : stringVal;
  }

  if (Array.isArray(value)) {
    const args = value.map((item, index) => coerceValue(item, `${path}.${index}`, false));

    return `{{array ${args.join(' ')}}}`;
  }

  return wrap ? `{{${path}}}` : path;
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

      warn(`Model is missing key: ${key}`, key in model || value !== undefined, {
        id: 'showcase.code-block.missing-model-key',
      });

      return coerceValue(value, `${blockName}.${key}`);
    });
  }

  @cached
  get code() {
    const { lang } = this.args;

    assert('Language is required', lang);

    const { resolvedCode } = this;

    return this.shiki.highlight(resolvedCode, lang, {
      ...this.args.options,
    });
  }

  get hasName() {
    return Boolean(this.args.name);
  }

  get name() {
    assert('Inline code blocks cannot have a name', !(this.args.inline && this.hasName));

    return this.args.name;
  }

  get style() {
    const { startingLineNumber } = this.args;
    const { code } = this;
    const theme = this.theme.resolvedTheme;

    const backgroundColor = code.background[theme];
    const rules: string[] = [`background-color: ${backgroundColor}`];

    if (startingLineNumber !== undefined) {
      rules.push(`--showcase-starting-line: ${startingLineNumber}`);
    }

    const numLines = code.html.split('\n').length;
    const maxLineNumber = (startingLineNumber ?? 1) + numLines - 1;
    const maxLineNumberWidth = Math.trunc(Math.log10(maxLineNumber) + 1);

    rules.push(`--showcase-line-number-width: ${maxLineNumberWidth - 1}em`);

    return htmlSafe(rules.join('; '));
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
      <span class="d-inline-flex inline mb-0" style={{this.style}} ...attributes>
        {{#let this.code.html as |html|}}
          {{#if this.code.isRendered}}
            {{htmlSafe html}}
          {{else}}
            <pre><code>{{html}}</code></pre>
          {{/if}}
        {{/let}}
      </span>
    {{else}}
      {{#let (or this.hasName (has-block "name")) as |hasName|}}
        {{#if hasName}}
          <div class="border border-secondary border-bottom-0 rounded-top p-3 mt-2">
            {{#if (has-block "name")}}
              {{yield to="name"}}
            {{else if this.hasName}}
              {{this.name}}
            {{/if}}
          </div>
        {{/if}}
        <div
          class={{classes
            "border border-secondary"
            (concat "rounded" (if hasName "-bottom"))
            (if hasName "mb-2" "my-2")
            "p-3 position-relative code-block-wrapper"
            (if @showLineNumbers "line-numbers")
          }}
          style={{this.style}}
          data-label={{@label}}
          ...attributes
        >
          {{#let this.code.html as |html|}}
            {{#if this.code.isRendered}}
              {{htmlSafe html}}
            {{else}}
              <pre><code>{{html}}</code></pre>
            {{/if}}
          {{/let}}
          {{#if this.showCopyButton}}
            <CopyButton @text={{this.resolvedCode}} />
          {{/if}}
        </div>
      {{/let}}
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

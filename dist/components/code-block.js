import "./../assets/code-block.css"
import { assert, warn } from '@ember/debug';
import { concat } from '@ember/helper';
import { get } from '@ember/object';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { classes } from '@nrg-ui/core/helpers/classes';
import CopyButton from './copy-button.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

;

const MARKER_PATTERN = '{{__SHOWCASE_ARG_([^}]+)-([^}]+)__}}';
function or(...args) {
  return args.some(a => Boolean(a));
}
function coerceValue(value, path, wrap = true) {
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
function unescapeSource(source) {
  return source.replace(/&#125;/g, '}').replace(/&#123;/g, '{').replace(/&#10;/g, '\n').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
}
class CodeBlock extends Component {
  static {
    g(this.prototype, "theme", [service]);
  }
  #theme = (i(this, "theme"), void 0);
  static {
    g(this.prototype, "shiki", [service]);
  }
  #shiki = (i(this, "shiki"), void 0);
  get resolvedCode() {
    const {
      code,
      model
    } = this.args;
    assert('Code is required', code);
    const rawSource = unescapeSource(code);
    if (!model) {
      return rawSource;
    }
    const pattern = new RegExp(MARKER_PATTERN, 'g');
    return rawSource.replace(pattern, (_, blockName, key) => {
      const value = get(model, key);
      warn(`Model is missing key: ${key}`, key in model || value !== undefined, {
        id: 'showcase.code-block.missing-model-key'
      });
      return coerceValue(value, `${blockName}.${key}`);
    });
  }
  static {
    n(this.prototype, "resolvedCode", [cached]);
  }
  get code() {
    const {
      lang
    } = this.args;
    assert('Language is required', lang);
    return this.shiki.highlight(this.resolvedCode, lang);
  }
  static {
    n(this.prototype, "code", [cached]);
  }
  get hasName() {
    return Boolean(this.args.name);
  }
  get name() {
    assert('Inline code blocks cannot have a name', !(this.args.inline && this.hasName));
    return this.args.name;
  }
  get style() {
    const {
      startingLineNumber
    } = this.args;
    const {
      code
    } = this;
    const theme = this.theme.resolvedTheme;
    const backgroundColor = code.background[theme];
    const rules = [`background-color: ${backgroundColor}`];
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
    assert('showCopyButton cannot be used when @inline={{true}}', !this.args.inline || this.args.showCopyButton === undefined);
    return this.args.showCopyButton ?? true;
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if @inline}}\n  <span class=\"d-inline-flex inline mb-0\" style={{this.style}} ...attributes>\n    {{#let this.code.html as |html|}}\n      {{#if this.code.isRendered}}\n        {{htmlSafe html}}\n      {{else}}\n        <pre><code>{{html}}</code></pre>\n      {{/if}}\n    {{/let}}\n  </span>\n{{else}}\n  {{#let (or this.hasName (has-block \"name\")) as |hasName|}}\n    {{#if hasName}}\n      <div class=\"border border-secondary border-bottom-0 rounded-top p-3 mt-2\">\n        {{#if (has-block \"name\")}}\n          {{yield to=\"name\"}}\n        {{else if this.hasName}}\n          {{this.name}}\n        {{/if}}\n      </div>\n    {{/if}}\n    <div class={{classes \"border border-secondary\" (concat \"rounded\" (if hasName \"-bottom\")) (if hasName \"mb-2\" \"my-2\") \"p-3 position-relative code-block-wrapper\" (if @showLineNumbers \"line-numbers\")}} style={{this.style}} data-label={{@label}} ...attributes>\n      {{#let this.code.html as |html|}}\n        {{#if this.code.isRendered}}\n          {{htmlSafe html}}\n        {{else}}\n          <pre><code>{{html}}</code></pre>\n        {{/if}}\n      {{/let}}\n      {{#if this.showCopyButton}}\n        <CopyButton @text={{this.resolvedCode}} />\n      {{/if}}\n    </div>\n  {{/let}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        htmlSafe,
        or,
        classes,
        concat,
        CopyButton
      })
    }), this);
  }
}
class TypeCodeBlock extends Component {
  get options() {
    return {
      grammarContextCode: 'let a:',
      ...this.args.options
    };
  }
  static {
    setComponentTemplate(precompileTemplate("<CodeBlock @code={{@code}} @label={{@label}} @lang=\"typescript\" @inline={{@inline}} @showCopyButton={{@showCopyButton}} @options={{this.options}} ...attributes />", {
      strictMode: true,
      scope: () => ({
        CodeBlock
      })
    }), this);
  }
}

export { TypeCodeBlock, CodeBlock as default };
//# sourceMappingURL=code-block.js.map

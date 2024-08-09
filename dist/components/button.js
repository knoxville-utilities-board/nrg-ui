import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { or, and, not } from 'ember-truth-helpers';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class ButtonComponent extends Component {
  get classList() {
    let classes1 = ['btn'];
    if (this.args.disabled) {
      classes1.push('disabled');
    }
    return classes1.join(' ');
  }
  get disabled() {
    return this.args.disabled || this.args.loading;
  }
  get hasIcon() {
    return Boolean(this.args.icon);
  }
  get alignIconRight() {
    return this.hasIcon && this.args.iconPosition === 'right';
  }
  get hasIconLabel() {
    return Boolean(this.args.iconLabel);
  }
  onClick(evt1) {
    evt1?.preventDefault();
    evt1?.stopPropagation();
    this.args.onClick?.(evt1);
    this.args.group?.onClick(evt1);
  }
  static {
    n(this.prototype, "onClick", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <button class={{this.classList}} disabled={{this.disabled}} type={{or @type \"button\"}} aria-disabled={{if this.disabled \"true\"}} {{on \"click\" this.onClick}} ...attributes>\n      {{#if @loading}}\n        <span class=\"spinner-border spinner-border-sm\" aria-hidden=\"true\"></span>\n        <span class=\"visually-hidden\" role=\"status\">\n          Loading...\n        </span>\n      {{else}}\n        {{#if (and this.hasIcon (not this.alignIconRight))}}\n          <i class=\"me-1 {{@icon}}\" aria-label={{@iconLabel}}></i>\n        {{/if}}\n        {{#if (has-block)}}\n          {{yield}}\n        {{else}}\n          {{@text}}\n        {{/if}}\n        {{#if (and this.hasIcon this.alignIconRight)}}\n          <i class=\"ms-1 {{@icon}}\" aria-label={{@iconLabel}}></i>\n        {{/if}}\n      {{/if}}\n    </button>\n  ", {
      strictMode: true,
      scope: () => ({
        or,
        on,
        and,
        not
      })
    }), this);
  }
}

export { ButtonComponent as default };
//# sourceMappingURL=button.js.map

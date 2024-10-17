import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import { or, and, not } from 'ember-truth-helpers';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class ButtonComponent extends Component {
  get classList() {
    let classes1 = ['btn'];
    if (this.args._class) {
      classes1.push(this.args._class);
    }
    if (this.args.loading) {
      classes1.push('loading');
    }
    if (this.args.disabled) {
      classes1.push('disabled');
    }
    classes1.push('position-relative d-inline-flex justify-content-center align-items-center');
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
    this.args.onClick?.(evt1);
    this.args.group?.onClick(evt1);
  }
  static {
    n(this.prototype, "onClick", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <button class={{this.classList}} disabled={{this.disabled}} type={{or @type \"button\"}} aria-disabled={{if this.disabled \"true\"}} {{on \"click\" this.onClick}} ...attributes>\n      {{#if @loading}}\n        <span class=\"spinner-border spinner-border-sm position-absolute\" aria-hidden=\"true\"></span>\n        <span class=\"visually-hidden\" role=\"status\">\n          {{t \"nrg.base.loading\"}}\n        </span>\n      {{/if}}\n      {{#if (and this.hasIcon (not this.alignIconRight))}}\n        <i class=\"me-1 {{@icon}}\" aria-label={{@iconLabel}}></i>\n      {{/if}}\n      <span class=\"content\">\n        {{#if (has-block)}}\n          {{yield}}\n        {{else}}\n          {{@text}}\n        {{/if}}\n      </span>\n      {{#if (and this.hasIcon this.alignIconRight)}}\n        <i class=\"ms-1 {{@icon}}\" aria-label={{@iconLabel}}></i>\n      {{/if}}\n    </button>\n  ", {
      strictMode: true,
      scope: () => ({
        or,
        on,
        t,
        and,
        not
      })
    }), this);
  }
}

export { ButtonComponent as default };
//# sourceMappingURL=button.js.map

import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import { or } from 'ember-truth-helpers';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class Button extends Component {
  get classList() {
    const classes = ['btn', 'position-relative', 'd-inline-flex', 'justify-content-center', 'align-items-center'];
    if (this.args._class) {
      classes.push(this.args._class);
    }
    if (this.args.loading) {
      classes.push('loading');
    }
    if (this.args.disabled) {
      classes.push('disabled');
    }
    return classes.join(' ');
  }
  get disabled() {
    return this.args.disabled || this.args.loading;
  }
  get hasIcon() {
    return Boolean(this.args.icon);
  }
  get isLeftAlignedIcon() {
    return this.hasIcon && (this.args.iconPosition === 'left' || !this.args.iconPosition);
  }
  get isRightAlignedIcon() {
    return this.hasIcon && this.args.iconPosition === 'right';
  }
  get isCenterAlignedIcon() {
    return this.hasIcon && this.args.iconPosition === 'center';
  }
  onClick(evt) {
    this.args.onClick?.(evt);
    this.args.group?.onClick(evt);
  }
  static {
    n(this.prototype, "onClick", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<button class={{this.classList}} disabled={{this.disabled}} type={{or @type \"button\"}} aria-disabled={{if this.disabled \"true\"}} {{on \"click\" this.onClick}} ...attributes>\n  {{#if @loading}}\n    <span class=\"spinner-border spinner-border-sm position-absolute\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\" role=\"status\">\n      {{t \"nrg.base.loading\"}}\n    </span>\n  {{/if}}\n\n  {{#if this.isLeftAlignedIcon}}\n    <i class=\"me-1 {{@icon}}\" aria-label={{@iconLabel}}></i>\n  {{/if}}\n\n  <span class=\"content\">\n    {{#if this.isCenterAlignedIcon}}\n      <i class=\"{{@icon}}\" aria-label={{@iconLabel}}></i>\n    {{else if (has-block)}}\n      {{yield}}\n    {{else}}\n      {{@text}}\n    {{/if}}\n  </span>\n\n  {{#if this.isRightAlignedIcon}}\n    <i class=\"ms-1 {{@icon}}\" aria-label={{@iconLabel}}></i>\n  {{/if}}\n\n</button>", {
      strictMode: true,
      scope: () => ({
        or,
        on,
        t
      })
    }), this);
  }
}

export { Button as default };
//# sourceMappingURL=button.js.map

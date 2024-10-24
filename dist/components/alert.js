import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { cssTransition } from 'ember-css-transitions';
import { t } from 'ember-intl';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

class AlertComponent extends Component {
  static {
    g(this.prototype, "visible", [tracked], function () {
      return true;
    });
  }
  #visible = (i(this, "visible"), void 0);
  get type() {
    return this.args.type ?? 'primary';
  }
  get classList() {
    const classes1 = ['alert', `alert-${this.type}`];
    if (this.args.dismissible) {
      classes1.push('alert-dismissible');
    }
    classes1.push('show');
    classes1.push('fade');
    return classes1.join(' ');
  }
  onDismiss() {
    if (!this.args.dismissible) {
      return;
    }
    this.visible = false;
  }
  static {
    n(this.prototype, "onDismiss", [action]);
  }
  onDismissed() {
    this.args.onDismiss?.();
  }
  static {
    n(this.prototype, "onDismissed", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    {{#if this.visible}}\n      <div class={{this.classList}} role=\"alert\" {{cssTransition leaveClass=\"show\" leaveActiveClass=\"show\" leaveToClass=\"hide\" didTransitionOut=this.onDismissed}}>\n        {{#if @icon}}\n          <i class={{@icon}} />\n        {{/if}}\n        {{#if @text}}\n          {{@text}}\n        {{else if (has-block)}}\n          {{yield}}\n        {{/if}}\n        {{#if @dismissible}}\n          <button type=\"button\" class=\"btn-close\" aria-label={{t \"nrg.base.close\"}} {{on \"click\" this.onDismiss}}></button>\n        {{/if}}\n      </div>\n    {{/if}}\n  ", {
      strictMode: true,
      scope: () => ({
        cssTransition,
        t,
        on
      })
    }), this);
  }
}

export { AlertComponent as default };
//# sourceMappingURL=alert.js.map

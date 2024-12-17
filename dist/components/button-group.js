import { hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import ButtonComponent from './button.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class ButtonGroupComponent extends Component {
  get classList() {
    const classes1 = ['btn-group'];
    if (this.args.disabled) {
      classes1.push('disabled');
    }
    if (this.args.vertical) {
      classes1.push('btn-group-vertical');
    }
    return classes1.join(' ');
  }
  get disabled() {
    return this.args.disabled || undefined;
  }
  get role() {
    if (this.args.toolbar) {
      return 'toolbar';
    }
    return 'group';
  }
  get parent() {
    return this.args.parent;
  }
  onClick(evt1) {
    this.args.onClick?.(evt1);
    this.parent?.onClick?.(evt1);
  }
  static {
    n(this.prototype, "onClick", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div class={{this.classList}} role={{this.role}} aria-disabled={{if this.disabled \"true\"}} aria-label={{@label}} ...attributes>\n      {{yield (hash Button=(component Button group=this disabled=this.disabled) SubGroup=(component ButtonGroupComponent parent=this disabled=this.disabled))}}\n    </div>\n  ", {
      strictMode: true,
      scope: () => ({
        hash,
        Button: ButtonComponent,
        ButtonGroupComponent
      })
    }), this);
  }
}

export { ButtonGroupComponent as default };
//# sourceMappingURL=button-group.js.map

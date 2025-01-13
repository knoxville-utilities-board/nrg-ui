import { fn } from '@ember/helper';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import AlertComponent from './alert.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime';

class ToasterComponent extends Component {
  static {
    g(this.prototype, "toast", [service]);
  }
  #toast = (i(this, "toast"), undefined);
  get fixed() {
    return this.args.fixed ?? true;
  }
  get classList() {
    const classes1 = ['toaster'];
    if (this.fixed) {
      classes1.push('fixed');
    }
    return classes1.join(' ');
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div class={{this.classList}} ...attributes>\n      {{#each this.toast.queue as |toast|}}\n        <Alert @type={{toast.type}} @dismissible={{true}} @onDismiss={{fn this.toast.remove toast}}>\n          {{toast.message}}\n        </Alert>\n      {{/each}}\n    </div>\n  ", {
      strictMode: true,
      scope: () => ({
        Alert: AlertComponent,
        fn
      })
    }), this);
  }
}

export { ToasterComponent as default };
//# sourceMappingURL=toaster.js.map

import { fn } from '@ember/helper';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Alert from './alert.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime';

class Toaster extends Component {
  static {
    g(this.prototype, "toast", [service]);
  }
  #toast = (i(this, "toast"), void 0);
  get fixed() {
    return this.args.fixed ?? true;
  }
  get classList() {
    const classes = ['toaster'];
    if (this.fixed) {
      classes.push('fixed');
    }
    return classes.join(' ');
  }
  static {
    setComponentTemplate(precompileTemplate("<div class={{this.classList}} ...attributes>\n  {{#each this.toast.queue as |toast|}}\n    <Alert @type={{toast.type}} @dismissible={{true}} @onDismiss={{fn this.toast.remove toast}}>\n      {{toast.message}}\n    </Alert>\n  {{/each}}\n</div>", {
      strictMode: true,
      scope: () => ({
        Alert,
        fn
      })
    }), this);
  }
}

export { Toaster as default };
//# sourceMappingURL=toaster.js.map

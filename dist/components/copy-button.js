import "./../assets/copy-button.css"
import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { timeout } from 'ember-concurrency';
import perform from 'ember-concurrency/helpers/perform';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

;

class CopyButton extends Component {
  get icon() {
    return this.copyToClipboard.isRunning ? 'bi-clipboard-check' : 'bi-clipboard';
  }
  copyToClipboard = buildTask(() => ({
    context: this,
    generator: function* () {
      yield navigator.clipboard.writeText(this.args.text);
      yield timeout(2000);
    }
  }), null, "copyToClipboard", null);
  static {
    setComponentTemplate(precompileTemplate("<button class=\"btn btn-outline-secondary copy-button\" type=\"button\" {{on \"click\" (perform this.copyToClipboard)}} ...attributes>\n  <i class=\"bi {{this.icon}}\" aria-hidden=\"true\"></i>\n  <span class=\"visually-hidden\">\n    Copy\n  </span>\n</button>", {
      strictMode: true,
      scope: () => ({
        on,
        perform
      })
    }), this);
  }
}

export { CopyButton as default };
//# sourceMappingURL=copy-button.js.map

import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<input\n  class=\"form-control\"\n  type=\"text\"\n  placeholder=\"Standard input\"\n  aria-label=\"Repository description\"\n  {{on \"input\" this.onChange}}\n  ...attributes\n/>");

class TextFieldComponent extends Component {
  onChange() {
    this.args.onChange?.();
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
}
setComponentTemplate(TEMPLATE, TextFieldComponent);

export { TextFieldComponent as default };
//# sourceMappingURL=text-field.js.map

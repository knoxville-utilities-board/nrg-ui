import { on } from '@ember/modifier';
import InputField from './-private/input-field.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TextInput extends InputField {
  static {
    setComponentTemplate(precompileTemplate("\n    <input aria-describedby={{@describedBy}} class={{this.classList}} disabled={{@disabled}} id={{@id}} readonly={{@readonly}} type=\"text\" value={{this.value}} {{on \"input\" this.change}} ...attributes />\n  ", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { TextInput as default };
//# sourceMappingURL=text-input.js.map

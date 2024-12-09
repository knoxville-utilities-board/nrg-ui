import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { warn, runInDebug } from '@ember/debug';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked, cached } from '@glimmer/tracking';
import 'ember-concurrency';
import perform from 'ember-concurrency/helpers/perform';
import { runTask } from 'ember-lifeline';
import { TrackedMap, TrackedArray } from 'tracked-built-ins';
import Field from './field.js';
import OnInsertModifier from '../../modifiers/on-insert.js';
import { scrollTo } from '../../utils/dom.js';
import { uid, diff } from '../../utils/index.js';
import ButtonComponent from '../button.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

class Form extends Component {
  static {
    g(this.prototype, "_didValidate", [tracked], function () {
      return false;
    });
  }
  #_didValidate = (i(this, "_didValidate"), void 0);
  static {
    g(this.prototype, "element", [tracked]);
  }
  #element = (i(this, "element"), void 0);
  staticValidations;
  bindings;
  constructor(owner1, args1) {
    super(owner1, args1);
    this.staticValidations = new TrackedMap();
    this.bindings = new Map();
  }
  get didValidate() {
    return this.args.didValidate ?? this._didValidate;
  }
  get loading() {
    return this.args.loading ?? this.submit.isRunning;
  }
  get validations() {
    const {
      validators: validators1
    } = this.args;
    if (!validators1) {
      return this.staticValidations;
    }
    const {
      bindings: bindings1
    } = this;
    const builtValidations1 = new Map();
    for (const [key1, value1] of this.staticValidations) {
      builtValidations1.set(key1, value1);
    }
    for (const entry1 of Object.entries(validators1)) {
      const [key1] = entry1;
      let value1 = entry1[1];
      const binding1 = bindings1.get(key1);
      if (!binding1) {
        warn(`No binding found for validator '${key1}'`, false, {
          id: 'nrg.form.missing-binding'
        });
        continue;
      }
      if (!builtValidations1.has(key1)) {
        builtValidations1.set(key1, []);
      }
      if (!Array.isArray(value1)) {
        value1 = [value1];
      }
      for (const validator1 of value1) {
        const v1 = validator1(binding1, binding1.model);
        const id1 = uid();
        builtValidations1.get(key1).push({
          id: id1,
          v: v1
        });
      }
    }
    return builtValidations1;
  }
  static {
    n(this.prototype, "validations", [cached]);
  }
  get isValid() {
    runInDebug(() => {
      this.checkValidations();
    });
    const validations1 = Array.from(this.validations.values()).flat();
    return validations1.filter(validator1 => !validator1.v.result.isWarning).every(validator1 => validator1.v.result.isValid);
  }
  submit = buildTask(() => ({
    context: this,
    generator: function* (event1) {
      event1.preventDefault();
      event1.stopPropagation();
      this.args.willValidate?.(event1);
      if (!this.isValid) {
        this._didValidate = true;
        if (!this.args.preventScroll) {
          runTask(this, () => {
            const invalidField1 = this.element.querySelector('.is-invalid');
            const label1 = this.element.querySelector(`[for="${invalidField1?.id}"]`);
            const fieldY1 = invalidField1?.getBoundingClientRect().top ?? 0;
            const labelY1 = label1?.getBoundingClientRect().top ?? Infinity;
            scrollTo(fieldY1 < labelY1 ? invalidField1 : label1);
          });
        }
        return;
      }
      yield this.args.onSubmit?.(event1);
      // TODO: Anything that needs to be done after the form is submitted
    }
  }), null, "submit", "drop");
  registerBinding(binding1, name1) {
    this.bindings.set(name1 ?? binding1.valuePath, binding1);
  }
  static {
    n(this.prototype, "registerBinding", [action]);
  }
  unregisterBinding(name1) {
    this.bindings.delete(name1);
  }
  static {
    n(this.prototype, "unregisterBinding", [action]);
  }
  registerValidator(validator1, name1) {
    const id1 = uid();
    name1 ??= validator1.binding.valuePath;
    if (!this.staticValidations.has(name1)) {
      this.staticValidations.set(name1, new TrackedArray());
    }
    this.staticValidations.get(name1).push({
      id: id1,
      v: validator1
    });
    return id1;
  }
  static {
    n(this.prototype, "registerValidator", [action]);
  }
  unregisterValidator(name1, id1) {
    if (!this.staticValidations.has(name1)) {
      return;
    }
    const validations1 = this.staticValidations.get(name1);
    const index1 = validations1.findIndex(v1 => v1.id === id1);
    if (index1 === -1) {
      return;
    }
    validations1.splice(index1, 1);
  }
  static {
    n(this.prototype, "unregisterValidator", [action]);
  }
  setElement(element1) {
    this.element = element1;
  }
  static {
    n(this.prototype, "setElement", [action]);
  }
  checkValidations() {
    const validationKeys1 = new Set(this.validations.keys());
    const bindingKeys1 = new Set(this.bindings.keys());
    const [noBindings1, noValidations1] = diff(Array.from(validationKeys1), Array.from(bindingKeys1));
    warn('The following validations have no binding defined: ' + noBindings1.join(', '), noBindings1.length === 0, {
      id: 'nrg.form.missing-validations'
    });
    warn('The following bindings have no validations defined: ' + noValidations1.join(', '), noValidations1.length === 0, {
      id: 'nrg.form.missing-bindings'
    });
  }
  isValidFor(name1) {
    const validators1 = this.validations.get(name1);
    if (!validators1) {
      return true;
    }
    return validators1.every(validator1 => validator1.v.result.isValid);
  }
  errorFor(name1) {
    const validators1 = this.validations.get(name1);
    if (!validators1) {
      return undefined;
    }
    const error1 = validators1.find(validator1 => !validator1.v.result.isValid && !validator1.v.result.isWarning);
    if (!error1) {
      return undefined;
    }
    return error1.v.result.message;
  }
  warningFor(name1) {
    const validators1 = this.validations.get(name1);
    if (!validators1) {
      return undefined;
    }
    const warning1 = validators1.find(validator1 => !validator1.v.result.isValid && validator1.v.result.isWarning);
    if (!warning1) {
      return undefined;
    }
    return warning1.v.result.message;
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <form {{on \"submit\" (perform this.submit)}} {{onInsert this.setElement}} ...attributes>\n      {{yield (hash Field=(component Field disabled=@disabled form=this) SubmitButton=(component Button _class=\"btn-primary\" disabled=@disabled loading=this.loading text=\"Submit\" type=\"submit\"))}}\n    </form>\n  ", {
      strictMode: true,
      scope: () => ({
        on,
        perform,
        onInsert: OnInsertModifier,
        hash,
        Field,
        Button: ButtonComponent
      })
    }), this);
  }
}

export { Form as default };
//# sourceMappingURL=index.js.map

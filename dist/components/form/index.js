import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { warn, runInDebug } from '@ember/debug';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked, cached } from '@glimmer/tracking';
import perform from 'ember-concurrency/helpers/perform';
import { runTask } from 'ember-lifeline';
import { TrackedMap, TrackedArray } from 'tracked-built-ins';
import Field from './field.js';
import OnInsertModifier from '../../modifiers/on-insert.js';
import { scrollTo } from '../../utils/dom.js';
import { uid, diff } from '../../utils/index.js';
import Button from '../button.js';
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
  constructor(owner, args) {
    super(owner, args);
    this.staticValidations = new TrackedMap();
    this.bindings = new TrackedMap();
  }
  get didValidate() {
    return this.args.didValidate ?? this._didValidate;
  }
  get loading() {
    return this.args.loading ?? this.submit.isRunning;
  }
  get validations() {
    const {
      validators
    } = this.args;
    if (!validators) {
      return this.staticValidations;
    }
    const {
      bindings
    } = this;
    const builtValidations = new Map();
    for (const [key, value] of this.staticValidations) {
      builtValidations.set(key, value);
    }
    for (const entry of Object.entries(validators)) {
      const [key] = entry;
      let value = entry[1];
      const binding = bindings.get(key);
      if (!binding) {
        warn(`No binding found for validator '${key}'`, false, {
          id: 'nrg.form.missing-binding'
        });
        continue;
      }
      if (!builtValidations.has(key)) {
        builtValidations.set(key, []);
      }
      if (!Array.isArray(value)) {
        value = [value];
      }
      for (const validator of value) {
        const v = validator(binding, binding.model);
        const id = uid();
        builtValidations.get(key).push({
          id,
          v
        });
      }
    }
    return builtValidations;
  }
  static {
    n(this.prototype, "validations", [cached]);
  }
  get isValid() {
    runInDebug(() => {
      this.checkValidations();
    });
    const validations = Array.from(this.validations.values()).flat();
    return validations.filter(validator => !validator.v.result.isWarning).every(validator => validator.v.result.isValid);
  }
  get submitButtonClass() {
    return this.args.submitClass ?? 'btn-primary';
  }
  submit = buildTask(() => ({
    context: this,
    generator: function* (event) {
      event.preventDefault();
      event.stopPropagation();
      this.args.willValidate?.(event);
      if (!this.isValid) {
        this._didValidate = true;
        if (!this.args.preventScroll) {
          runTask(this, () => {
            const invalidField = this.element.querySelector('.is-invalid');
            const label = this.element.querySelector(`[for="${invalidField?.id}"]`);
            const fieldY = invalidField?.getBoundingClientRect().top ?? 0;
            const labelY = label?.getBoundingClientRect().top ?? Infinity;
            scrollTo(fieldY < labelY ? invalidField : label);
          });
        }
        return;
      }
      yield this.args.onSubmit?.(event);
      // TODO: Anything that needs to be done after the form is submitted
    }
  }), null, "submit", "drop");
  registerBinding(binding, name) {
    this.bindings.set(name ?? binding.valuePath, binding);
  }
  static {
    n(this.prototype, "registerBinding", [action]);
  }
  unregisterBinding(name) {
    this.bindings.delete(name);
  }
  static {
    n(this.prototype, "unregisterBinding", [action]);
  }
  registerValidator(validator, name) {
    const id = uid();
    name ??= validator.binding.valuePath;
    runTask(this, () => {
      if (!this.staticValidations.has(name)) {
        this.staticValidations.set(name, new TrackedArray());
      }
      this.staticValidations.get(name).push({
        id,
        v: validator
      });
    });
    return id;
  }
  static {
    n(this.prototype, "registerValidator", [action]);
  }
  unregisterValidator(name, id) {
    if (!this.staticValidations.has(name)) {
      return;
    }
    const validations = this.staticValidations.get(name);
    const index = validations.findIndex(v => v.id === id);
    if (index === -1) {
      return;
    }
    validations.splice(index, 1);
  }
  static {
    n(this.prototype, "unregisterValidator", [action]);
  }
  setElement(element) {
    this.element = element;
  }
  static {
    n(this.prototype, "setElement", [action]);
  }
  checkValidations() {
    const validationKeys = new Set(this.validations.keys());
    const bindingKeys = new Set(this.bindings.keys());
    const [noBindings, noValidations] = diff(Array.from(validationKeys), Array.from(bindingKeys));
    warn('The following validations have no binding defined: ' + noBindings.join(', '), noBindings.length === 0, {
      id: 'nrg.form.missing-validations'
    });
    warn('The following bindings have no validations defined: ' + noValidations.join(', '), noValidations.length === 0, {
      id: 'nrg.form.missing-bindings'
    });
  }
  isValidFor(name) {
    const validators = this.validations.get(name);
    if (!validators) {
      return true;
    }
    return validators.every(validator => validator.v.result.isValid);
  }
  errorFor(name) {
    const validators = this.validations.get(name);
    if (!validators) {
      return undefined;
    }
    const error = validators.find(validator => !validator.v.result.isValid && !validator.v.result.isWarning);
    if (!error) {
      return undefined;
    }
    return error.v.result.message;
  }
  warningFor(name) {
    const validators = this.validations.get(name);
    if (!validators) {
      return undefined;
    }
    const warning = validators.find(validator => !validator.v.result.isValid && validator.v.result.isWarning);
    if (!warning) {
      return undefined;
    }
    return warning.v.result.message;
  }
  static {
    setComponentTemplate(precompileTemplate("<form {{on \"submit\" (perform this.submit)}} {{onInsert this.setElement}} ...attributes>\n  {{yield (hash Field=(component Field disabled=@disabled form=this) SubmitButton=(component Button _class=this.submitButtonClass disabled=@disabled loading=this.loading text=\"Submit\" type=\"submit\")) (hash isValid=this.isValid)}}\n</form>", {
      strictMode: true,
      scope: () => ({
        on,
        perform,
        onInsert: OnInsertModifier,
        hash,
        Field,
        Button
      })
    }), this);
  }
}

export { Form as default };
//# sourceMappingURL=index.js.map

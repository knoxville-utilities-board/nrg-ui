import { assert } from '@ember/debug';
import { get, set, action } from '@ember/object';
import Component from '@glimmer/component';
import { scheduleTask, runTask } from 'ember-lifeline';
import { ensurePathExists } from '../../utils/ensure-path-exists.js';
import { n } from 'decorator-transforms/runtime';

class BoundValue extends Component {
  constructor(owner, args) {
    super(owner, args);
    const {
      binding
    } = args;
    assert(`You must provide a binding argument to ${this.constructor.name}`, binding);
    const defaultValue = this.defaultValue;
    const initialValue = this.value;
    if (initialValue === undefined && defaultValue !== undefined && this.useDefaultValue) {
      scheduleTask(this, 'actions', () => {
        this.onChange(defaultValue);
      });
    }
    runTask(this, () => {
      const initFn = args.fieldOptions?.initBinding ?? args.initBinding;
      initFn?.(binding);
    });
  }
  get model() {
    return this.args.binding.model;
  }
  get valuePath() {
    return this.args.binding.valuePath;
  }
  get value() {
    return get(this.model, this.valuePath);
  }
  set value(newValue) {
    ensurePathExists(this.model, this.valuePath);
    set(this.model, this.valuePath, newValue);
  }
  get useDefaultValue() {
    return this.args.useDefaultValue ?? false;
  }
  get defaultValue() {
    if (this.args.defaultValue !== undefined) {
      return this.args.defaultValue;
    }
    return this.getDefaultValue?.() ?? null;
  }
  get allowChange() {
    if (this.args.allowChange) {
      return this.args.allowChange;
    }
    return () => true;
  }
  getDefaultValue() {
    return null;
  }
  onChange(newValue, ...args) {
    const currentValue = this.value;
    if (!this.allowChange(newValue, currentValue)) {
      return;
    }
    this.value = newValue;
    this.args.onChange?.(newValue, ...args);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
}

export { BoundValue as default };
//# sourceMappingURL=bound-value.js.map

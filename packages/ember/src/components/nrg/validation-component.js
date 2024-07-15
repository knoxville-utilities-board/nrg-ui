import { action, get, set } from '@ember/object';
import Component from '@glimmer/component';
import ensurePathExists from '../../utils/ensure-path-exists.js';
import { schedule } from '@ember/runloop';

export default class ValidationComponent extends Component {
  constructor() {
    super(...arguments);
    const defaultValue = this.defaultValue;
    const initialValue = this.hasModelPath ? this.value : this.args.value;
    if (
      initialValue === undefined &&
      defaultValue !== undefined &&
      this.useDefaultValue
    ) {
      schedule('actions', () => {
        this.onChange(defaultValue);
      });
    }
  }

  get model() {
    return this.args.model;
  }

  get valuePath() {
    return this.args.valuePath;
  }

  get value() {
    if (!this.hasModelPath) {
      return undefined;
    }

    return get(this.model, this.valuePath);
  }

  set value(newValue) {
    if (!this.hasModelPath) {
      return;
    }

    ensurePathExists(this.model, this.valuePath);

    if (newValue === null) {
      set(this.model, this.valuePath, null);
    } else if (Array.isArray(newValue)) {
      set(this.model, this.valuePath, [...newValue]);
    } else if (typeof newValue === 'object') {
      set(this.model, this.valuePath, { ...newValue });
    } else {
      set(this.model, this.valuePath, newValue);
    }
  }

  get useDefaultValue() {
    return this.args.useDefaultValue ?? false;
  }

  get defaultValue() {
    if (this.args.defaultValue !== undefined) {
      return this.args.defaultValue;
    }
    return this.getDefaultValue();
  }

  get hasModelPath() {
    return Boolean(this.model && this.valuePath);
  }

  getDefaultValue() {
    return undefined;
  }

  @action
  onChange(newValue) {
    this.value = newValue;
    this.args.onChange?.(...arguments);
  }
}

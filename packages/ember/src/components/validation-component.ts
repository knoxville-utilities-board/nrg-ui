import { action, get, set } from '@ember/object';
import Component from '@glimmer/component';
import ensurePathExists from '../utils/ensure-path-exists.js';
import { schedule } from '@ember/runloop';
import type ValidationComponentSignature from './validation-interface.ts';

export default class ValidationComponent<
  Type extends ValidationComponentSignature,
> extends Component<Type> {
  constructor() {
    // @ts-ignore
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

    if (this.valuePath === undefined) {
      return undefined;
    }

    if (!this.useNestedValuePath) {
      return this.model?.[this.valuePath];
    }

    return get(this.model, this.valuePath);
  }

  set value(newValue) {
    if (!this.hasModelPath) {
      return;
    }

    if (this.valuePath === undefined) {
      return;
    }

    if (this.model === undefined) {
      return;
    }

    if (!this.useNestedValuePath) {
      this.model[this.valuePath] = newValue;

      if (newValue === null) {
        this.model[this.valuePath] = null;
      } else if (Array.isArray(newValue)) {
        this.model[this.valuePath] = [...newValue];
      } else if (typeof newValue === 'object') {
        this.model[this.valuePath] = { ...newValue };
      } else {
        this.model[this.valuePath] = newValue;
      }

      return;
    }

    ensurePathExists(this.model, this.valuePath);

    if (newValue === null) {
      set(this.model, this.valuePath, null as any);
    } else if (Array.isArray(newValue)) {
      set(this.model, this.valuePath, [...newValue] as any);
    } else if (typeof newValue === 'object') {
      set(this.model, this.valuePath, { ...newValue });
    } else {
      set(this.model, this.valuePath, newValue);
    }
  }

  get useNestedValuePath() {
    return this.args.useNestedValuePath ?? true;
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
    return Boolean(this.model && this.valuePath != null);
  }

  getDefaultValue() {
    return undefined;
  }

  @action
  onChange(newValue: any) {
    this.value = newValue;
    this.args.onChange?.(newValue);
  }
}

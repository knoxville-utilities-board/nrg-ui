import { runInDebug, warn } from '@ember/debug';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
// @ts-expect-error Glimmer doesn't currently ship a type for the `cached` decorator
// https://github.com/glimmerjs/glimmer.js/issues/408
import { cached, tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';
import perform from 'ember-concurrency/helpers/perform';
import { TrackedMap } from 'tracked-built-ins';

import Field from './field.gts';
import { diff, uid } from '../../utils/index.ts';
import Button from '../button.gts';

import type { FieldSignature } from './field.gts';
import type { Binding } from '../../index.ts';
import type { ValidatorBuilder, Validator } from '../../validation/types';
import type { ButtonSignature } from '../button.gts';
import type { ComponentLike } from '@glint/template';

type Wrapper = {
  id: string;
  v: Validator<unknown, unknown, unknown, unknown>;
};
type ValidatorArray = ValidatorBuilder<unknown, unknown, unknown, unknown>[];
type ValidatorsObject = Record<
  string,
  ValidatorBuilder<unknown, unknown, unknown, unknown> | ValidatorArray
>;

export interface FormType {
  didValidate: boolean;

  isValidFor(name: string): boolean;
  errorFor(name: string): string | undefined;
  warningFor(name: string): string | undefined;
  registerBinding(binding: Binding, name?: string): void;
  registerValidator(
    validator: Validator<unknown, unknown, unknown, unknown>,
    name?: string,
  ): string;
  unregisterValidator(name: string, id: string): void;
}

declare interface FormSignature {
  Element: HTMLFormElement;
  Args: {
    didValidate?: boolean;
    disabled?: boolean;
    loading?: boolean;
    validators?: ValidatorsObject;

    willValidate?: (event: SubmitEvent) => unknown;
    onSubmit?: (event: SubmitEvent) => unknown;
  };
  Blocks: {
    default: [
      {
        Field: ComponentLike<FieldSignature>;
        SubmitButton: ComponentLike<ButtonSignature>;
      },
    ];
  };
}

export default class Form extends Component<FormSignature> implements FormType {
  @tracked
  _didValidate = false;

  staticValidations: Map<string, Wrapper[]>;
  bindings: Map<string, Binding>;

  constructor(owner: unknown, args: FormSignature['Args']) {
    super(owner, args);

    this.staticValidations = new TrackedMap();
    this.bindings = new Map();
  }

  get didValidate() {
    return this.args.didValidate ?? this._didValidate;
  }

  get loading() {
    return this.args.loading ?? this.submit.isRunning;
  }

  @cached
  get validations(): Map<string, Wrapper[]> {
    const { validators } = this.args;
    if (!validators) {
      return this.staticValidations;
    }

    const { bindings } = this;
    const builtValidations = new Map<string, Wrapper[]>();

    for (let [key, value] of this.staticValidations) {
      builtValidations.set(key, value);
    }

    for (let [key, value] of Object.entries(validators)) {
      const binding = bindings.get(key);
      if (!binding) {
        warn(`No binding found for validator '${key}'`, false, {
          id: 'nrg.form.missing-binding',
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
        builtValidations.get(key)!.push({ id, v });
      }
    }

    return builtValidations;
  }

  get isValid() {
    runInDebug(() => {
      this.checkValidations();
    });

    const validations = Array.from(this.validations.values()).flat();
    return validations.every((validator) => validator.v.result.isValid);
  }

  submit = dropTask(async (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    this.args.willValidate?.(event);

    if (!this.isValid) {
      this._didValidate = true;
      return;
    }

    await this.args.onSubmit?.(event);

    // TODO: Anything that needs to be done after the form is submitted
  });

  @action
  registerBinding(binding: Binding, name?: string) {
    this.bindings.set(name ?? binding.valuePath, binding);
  }

  @action
  unregisterBinding(name: string) {
    this.bindings.delete(name);
  }

  @action
  registerValidator(
    validator: Validator<unknown, unknown, unknown, unknown>,
    name?: string,
  ): string {
    const id = uid();
    name ??= validator.binding.valuePath;
    if (!this.staticValidations.has(name)) {
      this.staticValidations.set(name, []);
    }
    this.staticValidations.get(name)!.push({ id, v: validator });

    return id;
  }

  @action
  unregisterValidator(name: string, id: string) {
    if (!this.staticValidations.has(name)) {
      return;
    }

    const validations = this.staticValidations.get(name)!;
    const index = validations.findIndex((v) => v.id === id);
    if (index === -1) {
      return;
    }

    validations.splice(index, 1);
  }

  checkValidations() {
    const validationKeys = new Set(this.validations.keys());
    const bindingKeys = new Set(this.bindings.keys());

    const [noBindings, noValidations] = diff(
      Array.from(validationKeys),
      Array.from(bindingKeys),
    );

    warn(
      'The following validations have no binding defined: ' +
        noBindings.join(', '),
      noBindings.length === 0,
      { id: 'nrg.form.missing-validations' },
    );

    warn(
      'The following bindings have no validations defined: ' +
        noValidations.join(', '),
      noValidations.length === 0,
      { id: 'nrg.form.missing-bindings' },
    );
  }

  isValidFor(name: string) {
    const validators = this.validations.get(name);
    if (!validators) {
      return true;
    }

    return validators.every((validator) => validator.v.result.isValid);
  }

  errorFor(name: string) {
    const validators = this.validations.get(name);
    if (!validators) {
      return undefined;
    }

    const error = validators.find(
      (validator) =>
        !validator.v.result.isValid && !validator.v.result.isWarning,
    );

    if (!error) {
      return undefined;
    }

    return error.v.result.message;
  }

  warningFor(name: string) {
    const validators = this.validations.get(name);
    if (!validators) {
      return undefined;
    }

    const warning = validators.find(
      (validator) => validator.v.result.isWarning,
    );

    if (!warning) {
      return undefined;
    }

    return warning.v.result.message;
  }

  <template>
    <form {{on "submit" (perform this.submit)}} ...attributes>
      {{yield
        (hash
          Field=(component Field disabled=@disabled form=this)
          SubmitButton=(component
            Button
            disabled=@disabled
            loading=this.loading
            text="Submit"
            type="submit"
          )
        )
      }}
    </form>
  </template>
}

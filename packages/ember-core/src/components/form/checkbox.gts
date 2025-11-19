import { registerDestructor } from '@ember/destroyable';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

import BoundValue from './bound-value.ts';

import type { BoundValueSignature } from './bound-value';
import type { FieldOptions } from './field.gts';
import type { Optional } from '../../index.ts';
import type Owner from '@ember/owner';

export type CheckboxSignature = BoundValueSignature<
  {
    Element: HTMLInputElement;
    Args: {
      inline?: boolean;
      label?: string;
      reverse?: boolean;
      type?: 'checkbox' | 'switch';

      fieldOptions?: FieldOptions;

      onDestroy?: (checkbox: Checkbox) => void;
      onInit?: (checkbox: Checkbox) => void;
    };
    Blocks: {
      default: [];
    };
  },
  boolean
>;

export default class Checkbox extends BoundValue<CheckboxSignature, boolean> {
  internalId = crypto.randomUUID();

  constructor(
    owner: Owner,
    args: BoundValueSignature<CheckboxSignature, Optional<boolean>>['Args'],
  ) {
    super(owner, args);

    args.onInit?.(this);

    registerDestructor(this, () => {
      args.onDestroy?.(this);
    });
  }

  get classList() {
    const classes = ['form-check-input'];

    if (this.args.fieldOptions?.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.fieldOptions?.isWarning) {
      classes.push('is-warning');
    }

    return classes.join(' ');
  }

  get divClassList() {
    const classList = ['form-check'];

    if (this.isSwitch) {
      classList.push('form-switch');
    }

    if (this.args.inline) {
      classList.push('form-check-inline');
    }

    if (this.args.reverse) {
      classList.push('form-check-reverse');
    }

    return classList.join(' ');
  }

  get isSwitch() {
    return this.args.type === 'switch';
  }

  get id() {
    return this.args.fieldOptions?.id ?? this.internalId;
  }

  @action
  change(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this.onChange(target.checked);
  }

  <template>
    <div class={{this.divClassList}}>
      <input
        aria-describedby={{@fieldOptions.describedBy}}
        checked={{this.value}}
        class={{this.classList}}
        disabled={{@fieldOptions.disabled}}
        id={{this.id}}
        role={{if this.isSwitch "switch" "checkbox"}}
        type="checkbox"
        value={{this.value}}
        {{on "change" this.change}}
        ...attributes
      />
      <label class="form-check-label" for={{this.id}}>
        {{#if (has-block)}}
          {{yield}}
        {{else}}
          {{@label}}
        {{/if}}
        {{#if @fieldOptions.required}}
          <span class="text-danger">*</span>
        {{/if}}
      </label>
    </div>
  </template>
}

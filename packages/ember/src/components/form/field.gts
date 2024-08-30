import { registerDestructor } from '@ember/destroyable';
import { hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';

import CheckboxGroup from './checkbox-group.gts';
import Checkbox from './checkbox.gts';
import PhoneField from './phone-field.gts';
import RadioGroup from './radio-group.gts';
import Select from './select.gts';
import TextArea from './text-area.gts';
import TextField from './text-field.gts';
import onUpdate from '../../modifiers/on-update.ts';
import { PresenceValidator } from '../../validation/index.ts';

import type { CheckboxGroupSignature } from './checkbox-group.gts';
import type { CheckboxSignature } from './checkbox.gts';
import type { FormType } from './index.gts';
import type { RadioGroupFieldSignature } from './radio-group.gts';
import type { SelectSignature } from './select.gts';
import type { TextAreaSignature } from './text-area.gts';
import type { TextFieldSignature } from './text-field.gts';
import type { Binding } from '../../';
import type { ComponentLike } from '@glint/template';

declare interface TextSignature {
  Element: HTMLDivElement;
  Args: {
    id?: string;
    field: Field;
  };
  Blocks: {
    default: [];
  };
}

export interface FieldSignature {
  Element: HTMLLabelElement;
  Args: {
    disabled?: boolean;
    form?: FormType;
    label?: string;
    required?: boolean;
    validatorKey?: string;
  };
  Blocks: {
    default: [
      {
        Checkbox: ComponentLike<CheckboxSignature>;
        CheckboxGroup: ComponentLike<CheckboxGroupSignature>;
        Phone: ComponentLike<TextFieldSignature>;
        RadioGroup: ComponentLike<RadioGroupFieldSignature>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Select: ComponentLike<SelectSignature<any>>;
        Text: ComponentLike<TextSignature>;
        TextArea: ComponentLike<TextAreaSignature>;
        TextField: ComponentLike<TextFieldSignature>;
      },
    ];
  };
}

class Text extends Component<TextSignature> {
  constructor(owner: unknown, args: TextSignature['Args']) {
    super(owner, args);

    runTask(this, () => {
      args.field.hasText = true;
    });

    registerDestructor(this, () => {
      args.field.hasText = false;
    });
  }

  <template>
    <div class="form-text" id={{@id}} ...attributes>
      {{yield}}
    </div>
  </template>
}

export default class Field extends Component<FieldSignature> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TypedSelect = Select<any>;

  @tracked
  hasText = false;

  @tracked
  fieldId = crypto.randomUUID();

  @tracked
  messageId = crypto.randomUUID();

  @tracked
  textId = crypto.randomUUID();

  requiredId?: string;

  @tracked
  binding!: Binding<object>;

  get isValid() {
    const { form } = this.args;

    if (!form || !form.didValidate) {
      return undefined;
    }

    return form.isValidFor(this.validatorKey);
  }

  get hasError() {
    return typeof this.errorMessage === 'string';
  }

  get hasWarning() {
    return typeof this.warningMessage === 'string';
  }

  get errorMessage() {
    const { form } = this.args;

    if (!form || !form.didValidate) {
      return undefined;
    }

    return form.errorFor(this.validatorKey);
  }

  get warningMessage() {
    const { form } = this.args;

    if (!form) {
      return undefined;
    }

    return form.warningFor(this.validatorKey);
  }

  get validatorKey() {
    return this.args.validatorKey ?? this.binding.valuePath;
  }

  get describedBy() {
    const describedBy = [];

    if (this.hasError || this.hasWarning) {
      describedBy.push(this.messageId);
    }

    if (this.hasText) {
      describedBy.push(this.textId);
    }

    return describedBy.join(' ');
  }

  @action
  initBinding(binding: Binding<object>) {
    this.binding = binding;

    const { form } = this.args;
    if (!form) {
      return;
    }
    form.registerBinding(binding, this.validatorKey);
  }

  @action
  setupValidator(element: Element, [required]: [boolean]) {
    const { binding, requiredId } = this;
    const { form } = this.args;

    if (!form) {
      return;
    }

    if (required) {
      if (requiredId) {
        return;
      }

      let key;

      if (binding.model instanceof CheckboxGroup) {
        key = 'nrg.validation.presence.listBlank';
      }

      const presenceValidator = new PresenceValidator(
        binding,
        { presence: true, key },
        binding.model,
      );
      this.requiredId = form.registerValidator(
        presenceValidator,
        this.validatorKey,
      );
    } else {
      if (!requiredId) {
        return;
      }

      form.unregisterValidator(this.validatorKey, requiredId);
      this.requiredId = undefined;
    }
  }

  <template>
    {{#if @label}}
      <label
        class="form-label"
        for={{this.fieldId}}
        {{onUpdate this.setupValidator @required}}
        ...attributes
      >
        {{@label}}
        {{#if @required}}
          <span class="text-danger">*</span>
        {{/if}}
      </label>
    {{else}}
      <div
        class="d-none invisible"
        {{onUpdate this.setupValidator @required}}
      />
    {{/if}}
    {{yield
      (hash
        Checkbox=(component
          Checkbox
          describedBy=this.describedBy
          disabled=@disabled
          id=this.fieldId
          initBinding=this.initBinding
          isInvalid=this.hasError
          isWarning=this.hasWarning
          required=@required
        )
        CheckboxGroup=(component
          CheckboxGroup
          describedBy=this.describedBy
          disabled=@disabled
          id=this.fieldId
          onInitBinding=this.initBinding
          isInvalid=this.hasError
          isWarning=this.hasWarning
        )
        Phone=(component
          PhoneField
          describedBy=this.describedBy
          disabled=@disabled
          id=this.fieldId
          initBinding=this.initBinding
          isInvalid=this.hasError
          isWarning=this.hasWarning
        )
        RadioGroup=(component
          RadioGroup
          describedBy=this.describedBy
          disabled=@disabled
          id=this.fieldId
          initBinding=this.initBinding
          isInvalid=this.hasError
          isWarning=this.hasWarning
        )
        Select=(component
          this.TypedSelect
          describedBy=this.describedBy
          disabled=@disabled
          id=this.fieldId
          initBinding=this.initBinding
          isInvalid=this.hasError
          isWarning=this.hasWarning
        )
        Text=(component Text field=this id=this.textId)
        TextArea=(component
          TextArea
          describedBy=this.describedBy
          disabled=@disabled
          id=this.fieldId
          initBinding=this.initBinding
          isInvalid=this.hasError
          isWarning=this.hasWarning
        )
        TextField=(component
          TextField
          describedBy=this.describedBy
          disabled=@disabled
          id=this.fieldId
          initBinding=this.initBinding
          isInvalid=this.hasError
          isWarning=this.hasWarning
        )
      )
    }}
    {{#if this.hasError}}
      <div class="invalid-feedback" id={{this.describedBy}}>
        {{this.errorMessage}}
      </div>
    {{else if this.hasWarning}}
      <div class="warning-feedback" id={{this.describedBy}}>
        {{this.warningMessage}}
      </div>
    {{/if}}
  </template>
}

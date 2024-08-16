import { hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import RadioGroup from './radio-group.gts';
import Select from './select.gts';
import TextArea from './text-area.gts';
import TextField from './text-field.gts';
import onUpdate from '../../modifiers/on-update.ts';
import { PresenceValidator } from '../../validation/index.ts';

import type { FormType } from './index.gts';
import type { RadioGroupFieldSignature } from './radio-group.gts';
import type { SelectSignature } from './select.gts';
import type { TextAreaSignature } from './text-area.gts';
import type { TextFieldSignature } from './text-field.gts';
import type { Binding } from '../../';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

declare interface TextSignature {
  Element: HTMLDivElement;
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
    // TODO - Can we change "name"?
    name?: string;
    required?: boolean;
  };
  Blocks: {
    default: [
      {
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

const Text: TOC<TextSignature> = <template>
  <div class="form-text" ...attributes>
    {{yield}}
  </div>
</template>;

export default class Field extends Component<FieldSignature> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TypedSelect = Select<any>;

  @tracked
  fieldId = crypto.randomUUID();

  @tracked
  messageId = crypto.randomUUID();

  requiredId?: string;

  @tracked
  binding!: Binding;

  get isValid() {
    const { form } = this.args;

    if (!form || !form.didValidate) {
      return undefined;
    }

    return form.isValidFor(this.name);
  }

  get hasError() {
    return typeof this.errorMessage === 'string';
  }

  get errorMessage() {
    const { form } = this.args;

    if (!form || !form.didValidate) {
      return undefined;
    }

    return form.errorFor(this.name);
  }

  get name() {
    return this.args.name ?? this.binding.valuePath;
  }

  @action
  initBinding(binding: Binding) {
    this.binding = binding;

    const { form } = this.args;
    if (!form) {
      return;
    }
    form.registerBinding(binding, this.name);
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

      const presenceValidator = new PresenceValidator(
        binding,
        { presence: true },
        binding.model,
      );
      this.requiredId = form.registerValidator(presenceValidator, this.name);
    } else {
      if (!requiredId) {
        return;
      }

      form.unregisterValidator(this.name, requiredId);
      this.requiredId = undefined;
    }
  }

  <template>
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
    {{yield
      (hash
        RadioGroup=(component
          RadioGroup
          describedBy=this.messageId
          disabled=@disabled
          id=this.fieldId
          initBinding=this.initBinding
          isInvalid=this.hasError
        )
        Select=(component
          this.TypedSelect
          describedBy=this.messageId
          disabled=@disabled
          id=this.fieldId
          initBinding=this.initBinding
          isInvalid=this.hasError
        )
        Text=(component Text id=this.fieldId)
        TextArea=(component
          TextArea
          describedBy=this.messageId
          disabled=@disabled
          id=this.fieldId
          initBinding=this.initBinding
          isInvalid=this.hasError
        )
        TextField=(component
          TextField
          describedBy=this.messageId
          disabled=@disabled
          id=this.fieldId
          initBinding=this.initBinding
          isInvalid=this.hasError
        )
      )
    }}
    {{#if this.hasError}}
      <div class="invalid-feedback" id={{this.messageId}}>
        {{this.errorMessage}}
      </div>
    {{/if}}
  </template>
}

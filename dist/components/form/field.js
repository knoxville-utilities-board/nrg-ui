import { registerDestructor } from '@ember/destroyable';
import { hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';
import CheckboxGroup from './checkbox-group.js';
import Checkbox from './checkbox.js';
import Datetime from './datetime.js';
import NumberInput from './number-input.js';
import PhoneField from './phone-input.js';
import RadioGroup from './radio-group.js';
import Select from './select.js';
import TextArea from './text-area.js';
import TextInput from './text-input.js';
import OnUpdate from '../../modifiers/on-update.js';
import '../../validation/validators/base.js';
import '@ember/debug';
import '@ember/utils';
import '../../validation/validators/custom.js';
import PresenceValidator from '../../validation/validators/presence.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

let Text = class Text extends Component {
  constructor(owner1, args1) {
    super(owner1, args1);
    runTask(this, () => {
      args1.field.hasText = true;
    });
    registerDestructor(this, () => {
      args1.field.hasText = false;
    });
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div class=\"form-text\" id={{@id}} ...attributes>\n      {{yield}}\n    </div>\n  ", {
      strictMode: true
    }), this);
  }
};
class Field extends Component {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TypedSelect = Select;
  static {
    g(this.prototype, "hasText", [tracked], function () {
      return false;
    });
  }
  #hasText = (i(this, "hasText"), void 0);
  static {
    g(this.prototype, "fieldId", [tracked], function () {
      return crypto.randomUUID();
    });
  }
  #fieldId = (i(this, "fieldId"), void 0);
  static {
    g(this.prototype, "messageId", [tracked], function () {
      return crypto.randomUUID();
    });
  }
  #messageId = (i(this, "messageId"), void 0);
  static {
    g(this.prototype, "textId", [tracked], function () {
      return crypto.randomUUID();
    });
  }
  #textId = (i(this, "textId"), void 0);
  requiredId;
  static {
    g(this.prototype, "binding", [tracked]);
  }
  #binding = (i(this, "binding"), void 0);
  constructor(owner1, args1) {
    super(owner1, args1);
    registerDestructor(this, () => {
      this.setupValidator(undefined, [false]);
    });
  }
  get isValid() {
    const {
      form: form1
    } = this.args;
    if (!form1 || !form1.didValidate) {
      return undefined;
    }
    return form1.isValidFor(this.validatorKey);
  }
  get hasError() {
    return typeof this.errorMessage === 'string';
  }
  get hasWarning() {
    return typeof this.warningMessage === 'string';
  }
  get errorMessage() {
    const {
      form: form1
    } = this.args;
    if (!form1 || !form1.didValidate) {
      return undefined;
    }
    return form1.errorFor(this.validatorKey);
  }
  get warningMessage() {
    const {
      form: form1
    } = this.args;
    if (!form1) {
      return undefined;
    }
    return form1.warningFor(this.validatorKey);
  }
  get validatorKey() {
    return this.args.validatorKey ?? this.binding.valuePath;
  }
  get describedBy() {
    const describedBy1 = [];
    if (this.hasError || this.hasWarning) {
      describedBy1.push(this.messageId);
    }
    if (this.hasText) {
      describedBy1.push(this.textId);
    }
    return describedBy1.join(' ');
  }
  initBinding(binding1) {
    this.binding = binding1;
    const {
      form: form1
    } = this.args;
    if (!form1) {
      return;
    }
    form1.registerBinding(binding1, this.validatorKey);
  }
  static {
    n(this.prototype, "initBinding", [action]);
  }
  setupValidator(element1, [required1]) {
    const {
      binding: binding1,
      requiredId: requiredId1
    } = this;
    const {
      form: form1
    } = this.args;
    if (!form1) {
      return;
    }
    if (required1) {
      if (requiredId1) {
        return;
      }
      let key1;
      if (binding1.model instanceof CheckboxGroup) {
        key1 = 'nrg.validation.presence.listBlank';
      }
      const presenceValidator1 = new PresenceValidator(binding1, {
        presence: true,
        key: key1
      }, binding1.model);
      this.requiredId = form1.registerValidator(presenceValidator1, this.validatorKey);
    } else {
      if (!requiredId1) {
        return;
      }
      form1.unregisterValidator(this.validatorKey, requiredId1);
      this.requiredId = undefined;
    }
  }
  static {
    n(this.prototype, "setupValidator", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    {{#if @label}}\n      <label class=\"form-label\" for={{this.fieldId}} {{onUpdate this.setupValidator @required}} ...attributes>\n        {{@label}}\n        {{#if @required}}\n          <span class=\"text-danger\">*</span>\n        {{/if}}\n      </label>\n    {{else}}\n      <div class=\"d-none invisible\" {{onUpdate this.setupValidator @required}} />\n    {{/if}}\n    {{yield (hash Checkbox=(component Checkbox describedBy=this.describedBy disabled=@disabled id=this.fieldId initBinding=this.initBinding isInvalid=this.hasError isWarning=this.hasWarning required=@required) CheckboxGroup=(component CheckboxGroup describedBy=this.describedBy disabled=@disabled id=this.fieldId onInitBinding=this.initBinding isInvalid=this.hasError isWarning=this.hasWarning) Datetime=(component Datetime describedBy=this.describedBy disabled=@disabled id=this.fieldId initBinding=this.initBinding isInvalid=this.hasError isWarning=this.hasWarning) NumberInput=(component NumberInput describedBy=this.describedBy disabled=@disabled id=this.fieldId initBinding=this.initBinding isInvalid=this.hasError isWarning=this.hasWarning) PhoneInput=(component PhoneInput describedBy=this.describedBy disabled=@disabled id=this.fieldId initBinding=this.initBinding isInvalid=this.hasError isWarning=this.hasWarning) RadioGroup=(component RadioGroup describedBy=this.describedBy disabled=@disabled id=this.fieldId initBinding=this.initBinding isInvalid=this.hasError isWarning=this.hasWarning) Select=(component this.TypedSelect describedBy=this.describedBy disabled=@disabled id=this.fieldId initBinding=this.initBinding isInvalid=this.hasError isWarning=this.hasWarning) Text=(component Text field=this id=this.textId) TextArea=(component TextArea describedBy=this.describedBy disabled=@disabled id=this.fieldId initBinding=this.initBinding isInvalid=this.hasError isWarning=this.hasWarning) TextInput=(component TextInput describedBy=this.describedBy disabled=@disabled id=this.fieldId initBinding=this.initBinding isInvalid=this.hasError isWarning=this.hasWarning))}}\n    {{#if this.hasError}}\n      <div class=\"invalid-feedback\" id={{this.describedBy}}>\n        {{this.errorMessage}}\n      </div>\n    {{else if this.hasWarning}}\n      <div class=\"warning-feedback\" id={{this.describedBy}}>\n        {{this.warningMessage}}\n      </div>\n    {{/if}}\n  ", {
      strictMode: true,
      scope: () => ({
        onUpdate: OnUpdate,
        hash,
        Checkbox,
        CheckboxGroup,
        Datetime,
        NumberInput,
        PhoneInput: PhoneField,
        RadioGroup,
        Text,
        TextArea,
        TextInput
      })
    }), this);
  }
}

export { Field as default };
//# sourceMappingURL=field.js.map

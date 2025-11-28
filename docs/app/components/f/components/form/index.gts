import { array } from '@ember/helper';
import { action } from '@ember/object';
import { getOwner, setOwner } from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { getSnippet } from '@nrg-ui/code-snippets/helper';
import Button from '@nrg-ui/core/components/button';
import Form from '@nrg-ui/core/components/form';
import { bind } from '@nrg-ui/core/helpers/bind';
import {
  confirmation,
  custom,
  exclusion,
  inclusion,
  length,
  number,
} from '@nrg-ui/core/validation';
import CodeBlock from '@nrg-ui/showcase/components/code-block';
import dayjs from 'dayjs';
import { tracked as autoTrack } from 'tracked-built-ins';

import type Owner from '@ember/owner';
import type { ValidatorsObject } from '@nrg-ui/core/components/form/index';

const Validators = {
  select: inclusion({ in: ['A', 'C'] }),
  someOtherKey: custom({
    validate(value) {
      if (value !== 'foo') {
        return 'Value must be "foo"';
      }
      return true;
    },
  }),
  textArea: [
    custom({
      validate(value) {
        console.log(`Validating: '${value}'`);
        return value !== 'foo';
      },
      isWarning: true,
    }),
  ],
  radio: [exclusion({ in: ['A', 'B'], isWarning: true })],
  phone: [
    length<Model>({
      min: 10,
      message: 'Phone number must contain a 3-digit area code',
      disabled() {
        return !this.requirePhoneLength;
      },
    }),
    length<Model>({
      max: 10,
      isWarning: true,
      message: 'Phone number cannot contain a country code',
      disabled() {
        return !this.requirePhoneLength;
      },
    }),
  ],
  phoneConfirm: [
    confirmation({
      on: 'phone',
      message: 'Phone numbers do not match',
    }),
    length<Model>({
      min: 10,
      message: 'Phone number must contain a 3-digit area code',
      disabled() {
        return !this.requirePhoneLength;
      },
    }),
    length<Model>({
      max: 10,
      isWarning: true,
      message: 'Phone number cannot contain a country code',
      disabled() {
        return !this.requirePhoneLength;
      },
    }),
  ],
  checkboxGroup: [
    custom<Model, unknown[]>({
      validate(value) {
        return !value.includes('checkboxGroup.0');
      },
      message: 'The first checkbox is not allowed',
      isWarning: true,
    }),
  ],
  number: [
    number({
      allowBlank: true,
      maxPrecision: 2,
    }),
  ],
  fileUpload: [
    length({
      between: [1, 4],
      message: 'No more than 4 files can be uploaded',
    }),
  ],
  checkbox2: [
    custom({
      validate(value) {
        if (value != 'because') {
          return 'You must provide a reason';
        }
        return true;
      },
    }),
  ],
} as ValidatorsObject;

class Model {
  @tracked
  requirePhoneLength = true;

  @tracked
  number = 0;

  @tracked
  text = '';

  @tracked
  textArea = '';

  @tracked
  select = '';

  @tracked
  multiSelect = autoTrack([]);

  @tracked
  phone = '';

  @tracked
  phoneConfirm = '';

  @tracked
  radio = '';

  @tracked
  checkbox = false;

  @tracked
  checkbox2 = false;

  @tracked
  checkboxGroup = autoTrack(new Array(3));

  @tracked
  datetime: Date | null = null;

  @tracked
  date: Date | null = null;

  @tracked
  fileUpload: File[] = [];

  toJSON() {
    const obj = {} as Record<string, unknown>;

    const prototype = Object.getPrototypeOf(this);
    for (const key of Object.getOwnPropertyNames(prototype)) {
      const desc = Object.getOwnPropertyDescriptor(prototype, key);
      const hasGetter = typeof desc?.get === 'function';
      const isValue = 'value' in desc!;
      if (hasGetter || isValue) {
        obj[key] = this[key as keyof this];
      }
    }

    for (const [key, value] of Object.entries(this)) {
      obj[key] = value;
    }

    return obj;
  }
}

export default class FormDemo extends Component {
  model: Model;

  @tracked
  required = true;

  constructor(owner: Owner, args: object) {
    super(owner, args);
    this.model = new Model();

    setOwner(this.model, getOwner(this)!);
  }

  get modelAsJson() {
    return JSON.stringify(this.model, (key, value) => value ?? null, 2);
  }

  @action
  toggleRequired() {
    this.required = !this.required;
  }

  @action
  toggleRequirePhoneLength() {
    this.model.requirePhoneLength = !this.model.requirePhoneLength;
  }

  @action
  onSubmit() {
    alert('Form submitted');
  }

  <template>
    <div class="card p-3">
      {{! BEGIN-SNIPPET form-demo-component }}
      <Form
        class="mb-0"
        @validators={{Validators}}
        @onSubmit={{this.onSubmit}}
        as |Form|
      >
        <Form.Field @label="File Upload" @required={{this.required}} as |Field|>
          <Field.FileUpload
            @binding={{bind this.model "fileUpload"}}
            @accept={{array "image/*" ".pdf"}}
          />
        </Form.Field>
        <Form.Field
          @label="Text Input"
          @required={{this.required}}
          @validatorKey="someOtherKey"
          as |Field|
        >
          <Field.TextInput @binding={{bind this.model "text"}} />
          <Field.Text>
            Some additional context can be added underneath an input.
          </Field.Text>
        </Form.Field>
        <Form.Field @label="Text Area" as |Field|>
          <Field.TextArea @binding={{bind this.model "textArea"}} />
        </Form.Field>
        <Form.Field @label="Select" @required={{this.required}} as |Field|>
          <Field.Select
            @binding={{bind this.model "select"}}
            @options={{array "A" "B" "C"}}
          />
        </Form.Field>
        <Form.Field
          @label="Multi Select"
          @required={{this.required}}
          as |Field|
        >
          <Field.MultiSelect
            @binding={{bind this.model "multiSelect"}}
            @options={{array "Alpha" "Beta" "Charlie" "Delta" "Echo"}}
          />
        </Form.Field>
        <Form.Field @label="Radio Group" @required={{this.required}} as |Field|>
          <Field.RadioGroup @binding={{bind this.model "radio"}} as |Group|>
            <Group.Radio @option="A" />
            <Group.Radio @option="B" />
            <Group.Radio @option="C" />
          </Field.RadioGroup>
        </Form.Field>
        <Form.Field @label="Datetime" @required={{this.required}} as |Field|>
          <Field.Datetime
            @binding={{bind this.model "datetime"}}
            @minDate={{(dayjs)}}
          />
        </Form.Field>
        <Form.Field @label="Date" @required={{this.required}} as |Field|>
          <Field.Datetime
            @binding={{bind this.model "date"}}
            @maxDate={{(dayjs)}}
            @type="date"
          />
        </Form.Field>
        <Form.Field
          @label="Phone Number"
          @required={{this.required}}
          as |Field|
        >
          <Field.PhoneInput @binding={{bind this.model "phone"}} />
        </Form.Field>
        <Form.Field
          @label="Phone Number Confirm"
          @required={{this.required}}
          as |Field|
        >
          <Field.PhoneInput @binding={{bind this.model "phoneConfirm"}} />
        </Form.Field>
        <Form.Field
          @label="Checkbox Group"
          @required={{this.required}}
          @validatorKey="checkboxGroup"
          as |Field|
        >
          <Field.CheckboxGroup as |Item|>
            <Item
              @binding={{bind this.model "checkboxGroup.0"}}
              @label="Option A"
            />
            <Item
              @binding={{bind this.model "checkboxGroup.1"}}
              @label="Option B"
            />
            <Item
              @binding={{bind this.model "checkboxGroup.2"}}
              @label="Option C"
            />
          </Field.CheckboxGroup>
        </Form.Field>
        <Form.Field @label="Number" @required={{this.required}} as |Field|>
          <Field.NumberInput
            @binding={{bind this.model "number"}}
            @format="currency"
            @formatPrecision={{3}}
          />
        </Form.Field>
        <Form.Field @required={{this.required}} as |Field|>
          <Field.Checkbox @binding={{bind this.model "checkbox"}}>
            I agree to the
            <a
              class="link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
              href="#"
            >Privacy Policy</a>.
          </Field.Checkbox>
        </Form.Field>
        {{#if this.model.checkbox}}
          <Form.Field @label="Why not?" @required={{this.required}} as |Field|>
            <Field.TextInput @binding={{bind this.model "checkbox2"}} />
          </Form.Field>
        {{/if}}
        <Form.SubmitButton class="btn-primary" />
        <Button
          class="btn{{unless this.required '-outline'}}-secondary mt-3"
          @text="Toggle Required"
          @onClick={{this.toggleRequired}}
        />
        <Button
          class="btn{{unless
              this.model.requirePhoneLength
              '-outline'
            }}-secondary mt-3"
          @text="Toggle Phone Length"
          @onClick={{this.toggleRequirePhoneLength}}
        />
      </Form>
      {{! END-SNIPPET }}
      <hr />
      <div class="grid">
        <div class="g-col-12">
          <h3>Model</h3>
          <CodeBlock
            @lang="json"
            @code={{this.modelAsJson}}
            @showCopyButton={{false}}
          />
        </div>

        <div class="g-col-12">
          {{#let (getSnippet "form-demo-component.gts") as |snippet|}}
            <h3>Source</h3>
            <CodeBlock @lang="glimmer-template" @code={{snippet.code}} />
          {{/let}}
        </div>
      </div>
    </div>
  </template>
}

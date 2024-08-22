import { getOwner, setOwner } from '@ember/application';
import { array } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/ember/components/button';
import Form from '@nrg-ui/ember/components/form';
import bind from '@nrg-ui/ember/helpers/bind';
import { validator } from '@nrg-ui/ember/validation';

import CodeBlock from '../code-block';

const Validators = {
  select: validator('inclusion', { in: ['A', 'C'] }),
  someOtherKey: validator('custom', {
    validate(value) {
      if (value !== 'foo') {
        return 'Value must be "foo"';
      }
      return true;
    },
  }),
  textArea: [
    validator('custom', {
      validate(value) {
        console.log('Validating: ' + value);
        return value !== 'foo';
      },
      isWarning: true,
    }),
  ],
  radio: [validator('exclusion', { in: ['A', 'B'], isWarning: true })],
  phone: [
    validator('length', {
      min: 10,
      message: 'Phone number must contain a 3-digit area code',
      disabled() {
        return !this.requirePhoneLength;
      },
    }),
    validator('length', {
      max: 10,
      isWarning: true,
      message: 'Phone number cannot contain a country code',
      disabled() {
        return !this.requirePhoneLength;
      },
    }),
  ],
};

class Model {
  @tracked
  requirePhoneLength = true;

  @tracked
  textField = '';

  @tracked
  textArea = '';

  @tracked
  select = '';

  @tracked
  phone = '';

  @tracked
  radio = '';

  toJSON() {
    const obj = {};

    const prototype = Object.getPrototypeOf(this);
    for (const key of Object.getOwnPropertyNames(prototype)) {
      const desc = Object.getOwnPropertyDescriptor(prototype, key);
      const hasGetter = typeof desc?.get === 'function';
      const isValue = 'value' in desc;
      if (hasGetter || isValue) {
        obj[key] = this[key];
      }
    }

    for (const [key, value] of Object.entries(this)) {
      obj[key] = value;
    }

    return obj;
  }
}

export default class extends Component {
  model: Model;

  @tracked
  required = true;

  constructor() {
    super(...arguments);
    this.model = new Model();

    setOwner(this.model, getOwner(this));
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
      <Form
        class="mb-0"
        @validators={{Validators}}
        @onSubmit={{this.onSubmit}}
        as |Form|
      >
        <div class="mb-3">
          <Form.Field
            @label="Text Field"
            @required={{this.required}}
            @validatorKey="someOtherKey"
            as |Field|
          >
            <Field.TextField @binding={{bind this.model "textField"}} />
            <Field.Text>
              Some additional context can be added underneath an input.
            </Field.Text>
          </Form.Field>
        </div>
        <div class="mb-3">
          <Form.Field @label="Text Area" as |Field|>
            <Field.TextArea @binding={{bind this.model "textArea"}} />
          </Form.Field>
        </div>
        <div class="mb-3">
          <Form.Field @label="Select" @required={{this.required}} as |Field|>
            <Field.Select
              @binding={{bind this.model "select"}}
              @options={{array "A" "B" "C"}}
            />
          </Form.Field>
        </div>
        <div class="mb-3">
          <Form.Field
            @label="Radio Group"
            @required={{this.required}}
            as |Field|
          >
            <Field.RadioGroup @binding={{bind this.model "radio"}} as |Group|>
              <Group.Radio @option="A" />
              <Group.Radio @option="B" />
              <Group.Radio @option="C" />
            </Field.RadioGroup>
          </Form.Field>
        </div>
        <div class="mb-3">
          <Form.Field
            @label="Phone Number"
            @required={{this.required}}
            as |Field|
          >
            <Field.Phone @binding={{bind this.model "phone"}} />
          </Form.Field>
        </div>
        <Form.SubmitButton class="btn-primary mt-3" />
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
      <hr />
      <div class="grid">
        <div class="g-col-12">
          <h3>Model</h3>
          <CodeBlock
            class="border rounded p-3"
            @lang="json"
            @code={{this.modelAsJson}}
          />
        </div>
      </div>
    </div>
  </template>
}

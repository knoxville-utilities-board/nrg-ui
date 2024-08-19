import { getOwner, setOwner } from '@ember/application';
import { array } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Form from '@nrg-ui/ember/components/form';
import bind from '@nrg-ui/ember/helpers/bind';
import { validator } from '@nrg-ui/ember/validation';

import CodeBlock from '../code-block';

const Validators = {
  select: validator('inclusion', { in: ['A', 'C'] }),
  textArea: [
    validator('custom', {
      validate(value) {
        console.log('Validating: ' + value);
        return value !== 'foo';
      },
    }),
  ],
};

class Model {
  @tracked
  textField = '';

  @tracked
  textArea = '';

  @tracked
  select = '';

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
            {{! TODO Can we change "name"? }}
            @name="textField"
            @label="Text Field"
            @required={{this.required}}
            as |Field|
          >
            <Field.TextField @binding={{bind this.model "textField"}} />
            <Field.Text>
              Some additional context can be added underneath an input.
            </Field.Text>
          </Form.Field>
        </div>
        <div class="mb-3">
          <Form.Field @label="Text Area" @name="textArea" as |Field|>
            <Field.TextArea @binding={{bind this.model "textArea"}} />
          </Form.Field>
        </div>
        <div class="mb-3">
          <Form.Field
            @label="Select"
            @name="select"
            @required={{this.required}}
            as |Field|
          >
            <Field.Select
              @binding={{bind this.model "select"}}
              @options={{array "A" "B" "C"}}
            />
          </Form.Field>
        </div>
        <div class="mb-3">
          <Form.Field
            @label="Radio Group"
            @name="radio"
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
        <Form.SubmitButton class="btn-primary mt-3" />
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

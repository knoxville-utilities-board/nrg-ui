// @ts-nocheck - TODO

import { fn } from '@ember/helper';
import { action } from '@ember/object';
import { getOwner, setOwner } from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Button, Dropdown, Form, TextInput, bind } from '@nrg-ui/core';
import { validator } from '@nrg-ui/core/validation';
import { eq } from 'ember-truth-helpers';

import CodeBlock from '../../../code-block';

// const Validators = {
//   'model.foo': validator('custom', {
//     validate(value) {
//       if (value !== 'foo') {
//         return 'Value must be "foo"';
//       }
//       return true;
//     },
//     disabled() {
//       return this.model.type != 'foo';
//     },
//   }),
//   'model.bar': validator('custom', {
//     validate(value) {
//       if (value !== 'bar') {
//         return 'Value must be "bar"';
//       }
//       return true;
//     },
//     disabled() {
//       return this.model.type != 'bar';
//     },
//   }),
// };

class Model {
  @tracked
  type = 'Form 1';

  @tracked
  form1Value;

  @tracked
  form2Value;

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

export default class DynamicFieldDemo extends Component {
  model: Model;

  @tracked
  required = true;

  constructor(...args: unknown[]) {
    super(...args);
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
  onSubmit() {
    alert('Form submitted');
  }

  get formOptions() {
    return ['Form 1', 'Form 2'];
  }

  <template>
    <div class="card p-3">
      <Form class="mb-0" @onSubmit={{this.onSubmit}} as |Form|>
        <Form.Field @label="Select" @required={{this.required}} as |Field|>
          <Field.Select
            @binding={{bind this.model "type"}}
            @options={{this.formOptions}}
          />
        </Form.Field>
        {{#if (eq this.model.type "Form 1")}}
          <Form.Field @required={{this.required}} as |Field|>
            <Field.Checkbox @binding={{bind this.model "form1Value"}}>
              Form 1
            </Field.Checkbox>
          </Form.Field>
        {{else}}
          <Form.Field @required={{this.required}} as |Field|>
            <Field.Checkbox @binding={{bind this.model "form2Value"}}>
              Form 2
            </Field.Checkbox>
          </Form.Field>
        {{/if}}

        <Form.SubmitButton class="btn-primary" />
        <Button
          class="btn{{unless this.required '-outline'}}-secondary mt-3"
          @text="Toggle Required"
          @onClick={{this.toggleRequired}}
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Form::DynamicField': typeof DynamicFieldDemo;
  }
}

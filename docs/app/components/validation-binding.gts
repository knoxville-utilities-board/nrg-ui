/** eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck - TODO
import { action } from '@ember/object';
import { getOwner, setOwner } from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Button, Form, bind } from '@nrg-ui/core';
import { validator } from '@nrg-ui/core/validation';

const Validators = {
  foo: [
    validator('custom', {
      validate(value) {
        return 'Always error';
      },
    }),
  ],
  bar: [
    validator('custom', {
      validate(value) {
        return 'Always error';
      },
    }),
  ],
};

class Model {
  @tracked
  foo;

  @tracked
  bar;
}

export default class ValidationBinding extends Component {
  model: Model;

  @tracked
  flip;

  constructor(...args: unknown[]) {
    super(...args);
    this.model = new Model();

    setOwner(this.model, getOwner(this));
  }

  @action
  showBar() {
    this.flip = !this.flip;
  }

  @action
  onSubmit() {
    // Handle form submission
    console.log('Form submitted with model:', this.model);
  }

  <template>
    <Form
      class="mb-0"
      @validators={{Validators}}
      @onSubmit={{this.onSubmit}}
      as |Form|
    >
      <Form.Field as |Field|>
        <Field.Checkbox @binding={{bind this.model "foo"}} @label="Foo" />
      </Form.Field>
      {{#if this.flip}}
        <Form.Field as |Field|>
          <Field.Checkbox @binding={{bind this.model "bar"}} @label="Bar" />
        </Form.Field>
      {{/if}}
      <Form.SubmitButton class="btn-primary" />
      <Button
        class="btn-secondary mt-3"
        @text="Flip"
        @onClick={{this.showBar}}
      />
    </Form>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ValidationBinding: typeof ValidationBinding;
  }
}

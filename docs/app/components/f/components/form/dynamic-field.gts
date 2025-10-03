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

const Validators = {
  'model.foo': validator('custom', {
    validate(value) {
      if (value !== 'foo') {
        return 'Value must be "foo"';
      }
      return true;
    },
    disabled() {
      return this.model.type != 'foo';
    },
  }),
  'model.bar': validator('custom', {
    validate(value) {
      if (value !== 'bar') {
        return 'Value must be "bar"';
      }
      return true;
    },
    disabled() {
      return this.model.type != 'bar';
    },
  }),
};

class Model {
  @tracked
  type = 'foo';

  @tracked
  foo;

  @tracked
  bar;

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

  <template>
    <div class="card p-3">
      <Form
        class="mb-0"
        @validators={{Validators}}
        @onSubmit={{this.onSubmit}}
        as |Form|
      >
        <Form.Field
          @label="Dynamic Input"
          @required={{this.required}}
          as |Field options|
        >
          <DynamicParent
            @fieldOptions={{options}}
            @model={{this.model}}
            data-test-observed-selector
          />
        </Form.Field>
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

export class DynamicParent extends Component {
  @tracked
  model;

  constructor(...args: unknown[]) {
    super(...args);
    this.model = this.args.model;

    setOwner(this.model, getOwner(this));
  }

  get typeOptions() {
    return ['foo', 'bar'];
  }

  @action
  typeSelect(type) {
    this.model.type = type;
  }

  <template>
    <Dropdown class="text-capitalize">
      <:control>
        {{this.model.type}}
      </:control>
      <:menu as |Menu|>
        {{#each this.typeOptions as |type|}}
          <Menu.Item @onSelect={{fn this.typeSelect type}}>
            {{type}}
          </Menu.Item>
        {{/each}}
      </:menu>
    </Dropdown>
    {{#if (eq this.model.type "bar")}}
      <TextInput
        @binding={{bind this "model.bar"}}
        @fieldOptions={{@fieldOptions}}
      />
    {{else}}
      <TextInput
        @binding={{bind this "model.foo"}}
        @fieldOptions={{@fieldOptions}}
      />
    {{/if}}
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Form::DynamicField': typeof DynamicFieldDemo;
  }
}

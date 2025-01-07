import { setOwner } from '@ember/application';
import { array } from '@ember/helper';
import { click, fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { Form, bind } from '@nrg-ui/core';
import { validator } from '@nrg-ui/core/validation';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

import type { TestContext as BaseContext } from '@ember/test-helpers';

class Model {
  @tracked
  textInput: string = '';

  @tracked
  textArea: string = '';
}

interface TestContext extends BaseContext {
  element: HTMLElement;
  model: Model;

  actionHandler: () => void;
}

const Validators = {
  selectByAnotherProperty: validator('presence', {
    presence: false,
    isWarning: true,
  }),
};

module('Integration | Component | form', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    setOwner(this.model, this.owner);
  });

  test('it renders', async function (this: TestContext, assert) {
    const model = this.model;

    await render(<template>
      <Form as |Form|>
        <Form.Field @label="Text Input" @required={{true}} as |Field|>
          <Field.TextInput @binding={{bind model "textInput"}} />
        </Form.Field>
        <Form.Field
          @label="Text Area (with additional text)"
          @required={{true}}
          as |Field|
        >
          <Field.TextArea @binding={{bind model "textArea"}} />
          <Field.Text>
            Here's some extra context for this field
          </Field.Text>
        </Form.Field>
        <Form.SubmitButton />
      </Form>
    </template>);

    assert.dom('form').exists();

    // Text input
    let label = this.element.querySelector('label:has(+ input)')!;
    const input = this.element.querySelector('label + input');

    assert.dom(label).hasClass('form-label').containsText('Text Input');
    assert.dom('span', label).exists().hasClass('text-danger').hasText('*');

    let labelId = label.getAttribute('for');

    assert
      .dom(input)
      .exists()
      .hasAttribute('type', 'text')
      .hasAttribute('id', labelId!)
      .hasClass('form-control');

    // Text area
    label = this.element.querySelector('label:has(+ textarea)')!;
    const textarea = this.element.querySelector('label + textarea')!;
    const text = this.element.querySelector('label + textarea + div');

    assert
      .dom(label)
      .hasClass('form-label')
      .containsText('Text Area (with additional text)');
    assert.dom('span', label).exists().hasClass('text-danger').hasText('*');

    labelId = label.getAttribute('for')!;
    const ariaId = textarea.getAttribute('aria-describedby')!;

    assert
      .dom(textarea)
      .exists()
      .hasAttribute('id', labelId)
      .hasClass('form-control');
    assert
      .dom(text)
      .containsText("Here's some extra context for this field")
      .hasAttribute('id', ariaId)
      .hasClass('form-text');

    // Submit button
    const button = this.element.querySelector('button');

    assert
      .dom(button)
      .exists()
      .hasClass('btn-primary')
      .hasAttribute('type', 'submit')
      .hasText('Submit');
  });

  test('validations work', async function (this: TestContext, assert) {
    assert.expect(20);

    const model = this.model;

    let didSubmit = false;
    const actionHandler = () => {
      didSubmit = true;
    };

    await render(<template>
      <Form @validators={{Validators}} @onSubmit={{actionHandler}} as |Form|>
        <Form.Field @label="Text Input" @required={{true}} as |Field|>
          <Field.TextInput @binding={{bind model "textInput"}} />
        </Form.Field>
        <Form.Field
          @label="Text Area (with additional text)"
          @required={{true}}
          as |Field|
        >
          <Field.TextArea @binding={{bind model "textArea"}} />
          <Field.Text>
            Here's some extra context for this field
          </Field.Text>
        </Form.Field>
        <Form.Field
          @label="Select"
          @validatorKey="selectByAnotherProperty"
          as |Field|
        >
          <Field.Select
            @binding={{bind model "select"}}
            @options={{array "A" "B" "C"}}
          />
        </Form.Field>
        <Form.SubmitButton />
      </Form>
    </template>);

    // Select
    const select = this.element.querySelector('label + .dropdown > button')!;

    assert
      .dom(select)
      .exists()
      .hasAttribute('role', 'combobox')
      .hasClass('form-control');

    await click(select);
    await click('button + .popover .dropdown-menu > li:first-child');

    const ariaId = select.getAttribute('aria-describedby')!;

    assert.dom('button.dropdown').doesNotHaveClass('is-invalid');
    assert
      .dom('div.dropdown:has(> button.dropdown) + div')
      .exists()
      .hasAttribute('id', ariaId)
      .hasClass('warning-feedback')
      .containsText('This field must be blank');

    await click('button[type="submit"]');

    assert.false(didSubmit, 'Form should not submit when validations fail');

    assert.dom('input').hasClass('is-invalid');
    assert
      .dom('input + div')
      .hasClass('invalid-feedback')
      .hasText('This field cannot be blank');

    assert.dom('textarea').hasClass('is-invalid');
    assert
      .dom('textarea + div + div')
      .hasClass('invalid-feedback')
      .hasText('This field cannot be blank');

    await fillIn('input', 'foo');

    assert.dom('input').doesNotHaveClass('is-invalid');
    assert.dom('input + div').doesNotExist();

    await fillIn('textarea', 'bar');

    assert.dom('textarea').doesNotHaveClass('is-invalid');
    assert.dom('textarea + div + div').doesNotExist();

    this.actionHandler = () => {
      assert.ok(true, 'Form should submit');
    };

    await click('button[type="submit"]');

    assert.true(didSubmit, 'Form should submit when validations pass');
  });
});

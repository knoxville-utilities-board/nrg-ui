import { setOwner } from '@ember/application';
import { click, fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import Form from '@nrg-ui/ember/components/form';
import bind from '@nrg-ui/ember/helpers/bind';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

class Model {
  @tracked
  textField: string = '';

  @tracked
  textArea: string = '';
}

module('Integration | Component | form', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function () {
    this.model = new Model();
    setOwner(this.model, this.owner);
  });

  test('it renders', async function (assert) {
    const model = this.model;

    await render(<template>
      <Form as |Form|>
        <Form.Field @label="Text Field" @required={{true}} as |Field|>
          <Field.TextField @binding={{bind model "textField"}} />
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

    // Text field
    let label = this.element.querySelector('label:has(+ input)');
    const input = this.element.querySelector('label + input');

    assert.dom(label).hasClass('form-label').containsText('Text Field');
    assert.dom('span', label).exists().hasClass('text-danger').hasText('*');

    let labelId = label.getAttribute('for');

    assert
      .dom(input)
      .exists()
      .hasAttribute('type', 'text')
      .hasAttribute('id', labelId)
      .hasClass('form-control');

    // Text area
    label = this.element.querySelector('label:has(+ textarea)');
    const textarea = this.element.querySelector('label + textarea');
    const text = this.element.querySelector('label + textarea + div');

    assert
      .dom(label)
      .hasClass('form-label')
      .containsText('Text Area (with additional text)');
    assert.dom('span', label).exists().hasClass('text-danger').hasText('*');

    labelId = label.getAttribute('for');
    const ariaId = textarea.getAttribute('aria-describedby');

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

  test('validations work', async function (assert) {
    assert.expect(12);

    const model = this.model;

    let didSubmit = false;
    const actionHandler = () => {
      didSubmit = true;
    };

    await render(<template>
      <Form @onSubmit={{actionHandler}} as |Form|>
        <Form.Field @label="Text Field" @required={{true}} as |Field|>
          <Field.TextField @binding={{bind model "textField"}} />
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

    await click('button');

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

    await click('button');

    assert.true(didSubmit, 'Form should submit when validations pass');
  });
});

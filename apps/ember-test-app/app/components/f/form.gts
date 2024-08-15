import { array } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Form from '@nrg-ui/ember/components/form';
import bind from '@nrg-ui/ember/helpers/bind';
import { validator } from '@nrg-ui/ember/validation';

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

export default class extends Component {
  @tracked
  textField = '';

  @tracked
  radio = '';

  @tracked
  required = true;

  @action
  onSubmit() {
    alert(
      JSON.stringify({ textField: this.textField, textArea: this.textArea }),
    );
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
            <Field.TextField @binding={{bind this "textField"}} />
            <Field.Text>
              Some additional context can be added underneath an input.
            </Field.Text>
          </Form.Field>
        </div>
        <div class="mb-3">
          <Form.Field @label="Text Area" @name="textArea" as |Field|>
            <Field.TextArea @binding={{bind this "textArea"}} />
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
              @binding={{bind this "select"}}
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
            <Field.RadioGroup @binding={{bind this "radio"}} as |Group|>
              <Group.Radio @option="A" />
              <Group.Radio @option="B" />
              <Group.Radio @option="C" />
            </Field.RadioGroup>
          </Form.Field>
        </div>
        <Form.SubmitButton class="btn-primary mt-3" />
      </Form>
    </div>
  </template>
}

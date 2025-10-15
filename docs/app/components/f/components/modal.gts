import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { MktgServicePricing, Modal, Button, Form, bind } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../code-block';
import { validator } from '@nrg-ui/core/validation';

const Validators = {
  modelValue: [validator('presence', { presence: true })],
};

export default class ModalDemo extends Component {
  @service toast;

  positionOptions = ['center', 'left', 'right'];

  @tracked
  isOpen = false;

  @tracked
  subtle = false;

  @tracked
  modal2Open = false;

  @tracked
  dismissible = false;

  @tracked
  position = 'center';

  @tracked
  didValidate = false;

  @tracked
  passedInDidValidate = false;

  get modal2Position() {
    if (this.position === 'left') {
      return 'right';
    }
    if (this.position === 'right') {
      return 'left';
    }
    return this.position;
  }

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  @action
  closeModal() {
    this.isOpen = false;
  }

  @action
  openModal() {
    this.isOpen = true;
    this.didValidate = false;
  }

  @action
  onSubmit() {
    this.toast.danger('Tried to submit!');
  }

  <template>
    <FreestyleSection @name="Modal" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Modal
              @dismissible={{this.dismissible}}
              @isOpen={{this.isOpen}}
              @subtle={{this.subtle}}
              @position={{this.position}}
              @onDismiss={{fn this.update "isOpen" false}}
            >
              <:header>
                Modal 1
              </:header>
              <:default>
                <p>Did Validate: {{this.didValidate}}</p>
                {{#if this.passedInDidValidate}}
                  <Form
                    class="mb-0"
                    @validators={{Validators}}
                    @onSubmit={{this.onSubmit}}
                    @didValidate={{this.didValidate}}
                    @disabled={{this.isLoading}}
                    as |Form|
                  >
                    <Form.Field
                      @disabled={{this.isLoading}}
                      class="mt-2"
                      @label="Value"
                      @required={{true}}
                      as |Field|
                    >
                      <Field.TextInput @binding={{bind this "modelValue"}} />
                    </Form.Field>
                    <div class="d-flex py-3 justify-content-end">
                      <Form.SubmitButton
                        class="btn-primary float-right me-2"
                        @text="Save"
                        @loading={{this.save.isRunning}}
                      />
                      <button
                        type="button"
                        class="btn btn-secondary"
                        {{on "click" (fn this.update "isOpen" false)}}
                      >
                        Close this modal
                      </button>
                    </div>
                  </Form>
                {{else}}
                  <Form
                    class="mb-0"
                    @validators={{Validators}}
                    @onSubmit={{this.onSubmit}}
                    @disabled={{this.isLoading}}
                    as |Form|
                  >
                    <Form.Field
                      @disabled={{this.isLoading}}
                      class="mt-2"
                      @label="Value"
                      @required={{true}}
                      as |Field|
                    >
                      <Field.TextInput @binding={{bind this "modelValue"}} />
                    </Form.Field>
                    <div class="d-flex py-3 justify-content-end">
                      <Form.SubmitButton
                        class="btn-primary float-right me-2"
                        @text="Save"
                        @loading={{this.save.isRunning}}
                      />
                      <button
                        type="button"
                        class="btn btn-secondary"
                        {{on "click" (fn this.update "isOpen" false)}}
                      >
                        Close this modal
                      </button>
                    </div>
                  </Form>
                {{/if}}
              </:default>
            </Modal>

          </:example>
          <:api as |Args|>
            <Args.Bool
              @defaultValue={{false}}
              @description="When true, didValidate will be passed in."
              @name="passedInDidValidate"
              @value={{this.passedInDidValidate}}
              @onInput={{fn this.update "passedInDidValidate"}}
            />
            <Args.Bool
              @defaultValue={{false}}
              @description="When true, the modal will open."
              @name="isOpen"
              @value={{this.isOpen}}
              @onInput={{this.openModal}}
            />
            <Args.Boolean
              @defaultValue={{true}}
              @description="When true, an 'X' button will be displayed in the top-right corner of the modal and the 'Esc' key will both fire the onDismiss action."
              @name="dismissible"
            />
            <Args.Boolean
              @defaultValue={{false}}
              @description="When true, modal will have no background and light text"
              @name="subtle"
            />
            <Args.String
              @defaultValue="center"
              @description="Changes the position of the modal on the screen."
              @name="position"
              @options={{positionOptions}}
            />
          </Api.Arguments>
          <Api.Actions as |Action|>
            <Action
              @name="onDismiss"
              @description="This action will be called when the 'X' button is clicked on a dismissible modal. It is the responsibility of the parent component to change the isOpen property in response."
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

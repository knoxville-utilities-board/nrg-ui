import { array } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {
  bind,
  Button,
  Footer,
  Form,
  Icon,
  MktgCardContainer,
  MktgHeader,
  MktgSectionHeader
} from '@nrg-ui/core';
import { tracked as autoTrack } from 'tracked-built-ins';

export default class extends Component {
  @tracked
  searchString = '';

  @tracked
  customerClass = 'residential';

  @tracked
  number;

  @tracked
  text = '';

  @tracked
  textArea = '';

  @tracked
  select = '';

  @tracked
  phone = '';

  @tracked
  radio = '';

  @tracked
  checkbox;

  @tracked
  checkboxGroup = autoTrack(new Array(3));

  <template>
    {{! template-lint-disable no-inline-styles  }}
    <div
      data-theme="marketing"
      id="application"
      class="d-flex flex-column vh-100"
    >
      <Header class="gx-0 sticky-header">
        <:brand>
          <span style="height:75px;width:105px"></span>
        </:brand>
        <:title>
          <p class="m-0" data-test-header-title>
            NRG Fiber
          </p>
        </:title>
        <:nav>
          <div id="header-nav" class="d-flex flex-row"></div>
        </:nav>
        <:options>
        </:options>
      </Header>
      <main class="d-flex flex-fill">
        <div class="container-fluid flex-fill p-4 overflow-auto">
          <SectionHeader
            class="my-2 my-md-4"
            @title="Confirm Your Service Address"
            data-test-page-title
          />
          <CardContainer
            class="row d-flex justify-content-center"
            as |Container|
          >
            <Container.Card
              class="col-12 col-lg-10 col-xxl-7 mb-4 mb-md-0 mx-4"
            >
              <:header>
                <p class="m-0 p-0 fw-semibold fs-2 text-center">
                  Start Fiber Service At...
                </p>
              </:header>
              <:body>
                <div
                  class="d-flex flex-column justify-content-between w-100 h-100"
                >
                  <Form as |Form|>
                    <div class="list-group">
                      <Form.Field
                        @required={{true}}
                        @label="Please confirm the address where you would like to start fiber service."
                        data-test-input="address"
                        as |Field|
                      >
                        <div
                          class="list-group-item d-inline-flex align-items-center rounded-2"
                        >
                          <Icon @type="bi-search" @size="4" />
                          <Field.TextInput
                            class="px-3 py-0"
                            @basic={{true}}
                            @binding={{bind this "searchString"}}
                          />
                        </div>
                      </Form.Field>
                    </div>
                    <div>
                      <Form.Field
                        @required={{true}}
                        @label="What type of service will this be?"
                        data-test-input="customerClass"
                        as |Field|
                      >
                        <Field.RadioGroup
                          @basic={{true}}
                          @binding={{bind this "customerClass"}}
                          as |Group|
                        >
                          <Group.Radio
                            @option="residential"
                            @label="Residential"
                          />
                          <Group.Radio @option="business" @label="Business" />
                        </Field.RadioGroup>
                      </Form.Field>
                    </div>
                    <Form.SubmitButton
                      class="btn-primary w-100"
                      data-test-submit
                    >
                      Next
                    </Form.SubmitButton>
                  </Form>
                </div>
              </:body>
            </Container.Card>

            <Container.Card
              class="col-12 col-lg-10 col-xxl-7 mb-4 mb-md-0 mx-4"
            >
              <:body>
                <Form class="mb-0" as |Form|>
                  <Form.Field
                    @label="Text Input"
                    @required={{true}}
                    @validatorKey="someOtherKey"
                    as |Field|
                  >
                    <Field.TextInput @binding={{bind this "text"}} />
                    <Field.Text>
                      Some additional context can be added underneath an input.
                    </Field.Text>
                  </Form.Field>
                  <Form.Field @label="Text Area" as |Field|>
                    <Field.TextArea @binding={{bind this "textArea"}} />
                  </Form.Field>
                  <Form.Field @label="Select" @required={{true}} as |Field|>
                    <Field.Select
                      @binding={{bind this "select"}}
                      @options={{array "A" "B" "C"}}
                    />
                  </Form.Field>
                  <Form.Field
                    @label="Radio Group"
                    @required={{true}}
                    as |Field|
                  >
                    <Field.RadioGroup @binding={{bind this "radio"}} as |Group|>
                      <Group.Radio @option="A" />
                      <Group.Radio @option="B" />
                      <Group.Radio @option="C" />
                    </Field.RadioGroup>
                  </Form.Field>
                  <Form.Field
                    @label="Phone Number"
                    @required={{true}}
                    as |Field|
                  >
                    <Field.PhoneInput @binding={{bind this "phone"}} />
                  </Form.Field>
                  <Form.Field
                    @label="Checkbox Group"
                    @required={{true}}
                    @validatorKey="checkboxGroup"
                    as |Field|
                  >
                    <Field.CheckboxGroup as |Item|>
                      <Item
                        @binding={{bind this "checkboxGroup.0"}}
                        @label="Option A"
                      />
                      <Item
                        @binding={{bind this "checkboxGroup.1"}}
                        @label="Option B"
                      />
                      <Item
                        @binding={{bind this "checkboxGroup.2"}}
                        @label="Option C"
                      />
                    </Field.CheckboxGroup>
                  </Form.Field>
                  <Form.Field @label="Number" @required={{true}} as |Field|>
                    <Field.NumberInput
                      @binding={{bind this "number"}}
                      @format="currency"
                      @formatPrecision={{3}}
                    />
                  </Form.Field>
                  <Form.Field @required={{true}} as |Field|>
                    <Field.Checkbox @binding={{bind this "checkbox"}}>
                      I agree to the
                      <a
                        class="link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
                        href="#"
                      >Privacy Policy</a>.
                    </Field.Checkbox>
                  </Form.Field>
                  <Form.SubmitButton class="btn-primary" />
                  <Button
                    class="btn{{unless true '-outline'}}-secondary mt-3"
                    @text="Toggle Required"
                    @onClick={{this.toggleRequired}}
                  />
                  <Button
                    class="btn{{unless
                        this.requirePhoneLength
                        '-outline'
                      }}-secondary mt-3"
                    @text="Toggle Phone Length"
                    @onClick={{this.toggleRequirePhoneLength}}
                  />
                </Form>
              </:body>
            </Container.Card>
          </CardContainer>
        </div>
      </main>
      <Footer class="w-100 border-top-0 bg-body-secondary footer">
        <:left>
          <a style="width: 47px; height: 30px;" aria-label="logo" href="">
          </a>
          <span class="mb-0 p-0 px-md-3 align-content-center">
            &copy; NRG UI
          </span>
        </:left>
        <:right>
          <a class="link-secondary" href="">Privacy</a>
          <a class="link-secondary" href="">Terms</a>
        </:right>
      </Footer>

    </div>
  </template>
}

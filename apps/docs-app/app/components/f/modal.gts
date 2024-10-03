import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import ServicePricing from '@nrg-ui/core/components/mktg/service-pricing';
import Modal from '@nrg-ui/core/components/modal';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../code-block';

export default class extends Component {
  positionOptions = ['center', 'left', 'right'];

  @tracked
  isOpen = false;

  @tracked
  modal2Open = false;

  @tracked
  dismissible = false;

  @tracked
  position = 'center';

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
    this[key] = value;
  }

  @action
  closeModal() {
    this.isOpen = false;
  }

  <template>
    <FreestyleSection @name="Modal" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Modal
              @dismissible={{this.dismissible}}
              @isOpen={{this.isOpen}}
              @position={{this.position}}
              @onDismiss={{fn this.update "isOpen" false}}
            >
              <:header>
                Modal 1
              </:header>
              <:default>
                <p>Modal Content</p>
                <div class="container">
                  <h4>Billing &amp; Contact Information</h4>
                  <hr class="my-4" />

                  <ServicePricing
                    @label="Fiber"
                    @package="The Gig"
                    @description="$65/mo"
                    @icon="bi-wifi"
                    @selected={{true}}
                    @active={{false}}
                    as |Addon|
                  >
                    <Addon @label="Smart Gig" @price="$15/mo" />
                  </ServicePricing>
                  <ServicePricing
                    @label="TV"
                    @package="Silver"
                    @description="$107/mo"
                    @icon="bi-tv"
                    @selected={{true}}
                    @active={{false}}
                    as |Addon|
                  >
                    <Addon @label="FireStick" @price="$80" @quantity="2" />
                    <Addon @label="HBO" @price="$5.99/mo" />
                  </ServicePricing>
                  <ServicePricing
                    @label="Phone"
                    @description="$129/mo"
                    @icon="bi-telephone"
                    @selected={{true}}
                    @active={{true}}
                  />
                </div>

              </:default>
              <:footer>
                <button
                  type="button"
                  class="btn btn-secondary"
                  {{on "click" (fn this.update "isOpen" false)}}
                >
                  Close this modal
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  {{on "click" (fn this.update "modal2Open" true)}}
                >
                  Open Modal 2
                </button>
              </:footer>
            </Modal>

            <Modal
              @dismissible={{this.dismissible}}
              @isOpen={{this.modal2Open}}
              @position={{this.modal2Position}}
              @onDismiss={{fn this.update "modal2Open" false}}
            >
              <ServicePricing
                @label="TV"
                @package="Silver"
                @description="$107/mo"
                @icon="bi-tv"
                @selected={{true}}
                @active={{false}}
                as |Addon|
              >
                <Addon @label="FireStick" @price="$80" @quantity="2" />
                <Addon @label="HBO" @price="$5.99/mo" />
                <Addon @label="STARZ" @price="$4.99/mo" />
                <Addon @label="Spanish Channels" @price="$4.99/mo" />
              </ServicePricing>
              <button
                type="button"
                class="btn btn-secondary"
                {{on "click" (fn this.update "modal2Open" false)}}
              >
                Close this modal
              </button>
            </Modal>
          </:example>
          <:api as |Args|>
            <Args.Bool
              @defaultValue={{false}}
              @description="When true, the modal will open."
              @name="isOpen"
              @value={{this.isOpen}}
              @onInput={{fn this.update "isOpen"}}
            />
            <Args.Bool
              @defaultValue={{true}}
              @description="When true, an 'X' button will be displayed in the top-right corner of the modal and the 'Esc' key will both fire the onDismiss action."
              @name="dismissible"
              @value={{this.dismissible}}
              @onInput={{fn this.update "dismissible"}}
            />
            <Args.String
              @defaultValue="center"
              @description="Changes the position of the modal on the screen."
              @name="position"
              @value={{this.position}}
              @options={{this.positionOptions}}
              @onInput={{fn this.update "position"}}
            />
            <Args.Action
              @name="onDismiss"
              @description="This action will be called when the 'X' button is clicked on a dismissible modal. It is the responsibility of the parent component to change the isOpen property in response."
            >
              <CodeBlock @lang="typescript" @code="() => unknown" />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

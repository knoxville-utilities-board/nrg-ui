import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import MktgServicePricing from '@nrg-ui/core/components/mktg/service-pricing';
import Modal from '@nrg-ui/core/components/modal';
import Section from '@nrg-ui/showcase/components/section';

const positionOptions = ['center', 'left', 'right'] as const;

export default class ModalDemo extends Component {
  @tracked
  isOpen = false;

  @tracked
  subtle = false;

  @tracked
  modal2Open = false;

  @tracked
  dismissible = false;

  @tracked
  position: (typeof positionOptions)[number] = 'center';

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

  <template>
    <Section @name="Modal" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="dialog">
        <:example as |model|>
          <Modal
            @dismissible={{model.dismissible}}
            @isOpen={{model.isOpen}}
            @subtle={{model.subtle}}
            @position={{model.position}}
            @onDismiss={{this.closeModal}}
          >
            <:header>
              Modal 1
            </:header>
            <:default>
              <p>Modal Content</p>
              <div class="container">
                <h4>Billing &amp; Contact Information</h4>
                <hr class="my-4" />

                <MktgServicePricing
                  @label="Fiber"
                  @product="The Gig"
                  @description="$65/mo"
                  @icon="bi-wifi"
                  @selected={{true}}
                  @active={{false}}
                  as |Addon|
                >
                  <Addon @label="Smart Gig" @price="$15/mo" />
                </MktgServicePricing>
                <MktgServicePricing
                  @label="TV"
                  @product="Silver"
                  @description="$107/mo"
                  @icon="bi-tv"
                  @selected={{true}}
                  @active={{false}}
                  as |Addon|
                >
                  <Addon @label="FireStick" @price="$80" @quantity={{2}} />
                  <Addon @label="HBO" @price="$5.99/mo" />
                </MktgServicePricing>
                <MktgServicePricing
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
            @dismissible={{model.dismissible}}
            @isOpen={{model.modal2Open}}
            @position={{model.modal2Position}}
            @onDismiss={{fn this.update "modal2Open" false}}
          >
            <MktgServicePricing
              @label="TV"
              @product="Silver"
              @description="$107/mo"
              @icon="bi-tv"
              @selected={{true}}
              @active={{false}}
              as |Addon|
            >
              <Addon @label="FireStick" @price="$80" @quantity={{2}} />
              <Addon @label="HBO" @price="$5.99/mo" />
              <Addon @label="STARZ" @price="$4.99/mo" />
              <Addon @label="Spanish Channels" @price="$4.99/mo" />
            </MktgServicePricing>
            <button
              type="button"
              class="btn btn-secondary"
              {{on "click" (fn this.update "modal2Open" false)}}
            >
              Close this modal
            </button>
          </Modal>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @defaultValue={{false}}
              @description="When true, the modal will open."
              @name="isOpen"
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

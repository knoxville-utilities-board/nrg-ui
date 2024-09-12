import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import ServicePricing from '@nrg-ui/core/components/mktg/service-pricing';
import Modal from '@nrg-ui/core/components/modal';

export default class extends Component {
  @tracked
  modal1Open = false;

  @tracked
  modal2Open = false;

  @tracked
  modal3Open = false;

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  @action
  closeAllModals() {
    this.modal1Open = false;
    this.modal2Open = false;
    this.modal3Open = false;
  }

  <template>
    <button
      class="btn btn-primary"
      type="button"
      {{on "click" (fn this.update "modal1Open" true)}}
    >
      Open Modal 1
    </button>
    <Modal
      @isOpen={{this.modal1Open}}
      @onDismiss={{fn this.update "modal1Open" false}}
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
            <Addon @label="STARZ" @price="$4.99/mo" />
            <Addon @label="Spanish Channels" @price="$4.99/mo" />
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
          class="btn btn-primary"
          {{on "click" (fn this.update "modal2Open" true)}}
        >
          Open Modal 2
        </button>
      </:footer>
    </Modal>
    <Modal
      @dismissable={{false}}
      @isOpen={{this.modal2Open}}
      @position="flyout-left"
      @onDismiss={{fn this.update "modal2Open" false}}
    >
      <:header>
        Modal 2
      </:header>
      <:default>
        <p>Modal 2 content</p>
      </:default>
      <:footer>
        <button
          type="button"
          class="btn btn-primary"
          {{on "click" (fn this.update "modal3Open" true)}}
        >
          Open Modal 3
        </button>
      </:footer>
    </Modal>
    <Modal
      @isOpen={{this.modal3Open}}
      @position="flyout-right"
      @onDismiss={{fn this.update "modal3Open" false}}
    >
      <:default>
        <p>Modal 3 content</p>
      </:default>
      <:footer>
        <button
          type="button"
          class="btn btn-primary"
          {{on "click" this.closeAllModals}}
        >
          Close All Modals
        </button>
      </:footer>
    </Modal>
  </template>
}

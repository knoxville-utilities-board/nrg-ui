import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConfirmAddressController extends Controller {
  @tracked customerClass;
  @service router;

  @tracked nextDisabled = true;

  @action
  setCustomerClass(value) {
    this.customerClass = value;
    this.nextDisabled = false;
  }

  @action
  goToProducts() {
    let route =
      this.customerClass == 'residential'
        ? 'shopping.fiber'
        : 'shopping.fiber-business';
    this.router.transitionTo(route);
  }
}

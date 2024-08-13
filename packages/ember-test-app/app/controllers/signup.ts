import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

import type RouterService from '@ember/routing/router-service';

export default class SignupController extends Controller {
  @service
  declare router: RouterService;

  @action login() {
    this.router.transitionTo('shopping.fiber');
  }

  @action goToAddress() {
    this.router.transitionTo('shopping.fiber');
  }
}

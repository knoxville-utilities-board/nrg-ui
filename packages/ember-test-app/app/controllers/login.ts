import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

import type RouterService from '@ember/routing/router-service';

export default class LoginController extends Controller {
  @service
  declare router: RouterService;

  @action goToOrder() {
    this.router.transitionTo('shopping.fiber');
  }
}

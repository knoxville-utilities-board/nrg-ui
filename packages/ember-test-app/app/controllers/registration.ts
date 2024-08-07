import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

export default class RegistrationController extends Controller {
  @service declare router: RouterService;

  get nextRoute() {
    return 'registration.confirmation';
  }

  @action
  changeRoute() {
    this.router.transitionTo(this.nextRoute);
  }

  get currentRoute() {
    return this.router.currentRouteName;
  }
}

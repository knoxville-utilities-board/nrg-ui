import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

export default class RegistrationController extends Controller {
  @service declare router: RouterService;

  get active() {
    if (this.currentRoute === 'registration.user') {
      return 'user';
    } else if (this.currentRoute === 'registration.billing') {
      return 'billing';
    } else if (this.currentRoute === 'registration.privacy') {
      return 'privacy';
    }
    return '';
  }
  get currentRoute() {
    return this.router.currentRouteName;
  }

  get nextRoute() {
    if (this.currentRoute === 'registration.privacy') {
      return 'registration.confirmation';
    } else {
      return 'installation';
    }
  }

  @action
  changeRoute() {
    this.router.transitionTo(this.nextRoute);
  }

  get buttonDisabled() {
    if (
      this.currentRoute === 'registration.privacy' ||
      this.currentRoute === 'registration.confirmation'
    ) {
      return false;
    }
    return true;
  }
}

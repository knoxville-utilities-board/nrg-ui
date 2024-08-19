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
  routes = [
    'registration.user',
    'registration.billing',
    'registration.privacy',
    'registration.confirmation',
    'installation',
  ];

  get nextRoute() {
    const currentIndex = this.routes.findIndex(
      (route) => route === this.currentRoute,
    );
    if (currentIndex < this.routes.length - 1) {
      const next = this.routes[currentIndex + 1];
      return next;
    }
    return '/';
  }

  @action
  changeRoute() {
    this.router.transitionTo(this.nextRoute);
  }
}

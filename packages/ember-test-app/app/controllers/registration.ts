import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

export default class RegistrationController extends Controller {
  @service declare router: RouterService;

  get active() {
    if (
      this.currentRoute === 'registration.user' ||
      this.currentRoute === 'registration.business'
    ) {
      return 'user';
    } else if (this.currentRoute.startsWith('registration.billing')) {
      return 'billing';
    } else if (this.currentRoute.startsWith('registration.privacy')) {
      return 'privacy';
    }
    return '';
  }
  get currentRoute() {
    return this.router.currentRouteName;
  }

  get businessRegistration() {
    return this.currentRoute.endsWith('business');
  }

  businessRoutes = [
    'registration.business',
    'registration.billing-business',
    'registration.privacy-business',
    'registration.confirmation-business',
    'installation',
  ];

  routes = [
    'registration.user',
    'registration.billing',
    'registration.privacy',
    'registration.confirmation',
    'installation',
  ];

  get nextRoute() {
    const routeOptions = this.businessRegistration
      ? this.businessRoutes
      : this.routes;
    const currentIndex = routeOptions.findIndex(
      (route) => route === this.currentRoute,
    );
    if (currentIndex < routeOptions.length - 1) {
      const next = routeOptions[currentIndex + 1];
      return next;
    }
    return '/';
  }

  get navButtonDisplay() {
    return this.currentRoute.startsWith('registration.confirmation')
      ? 'Confirm'
      : 'Next';
  }

  get navButtonClass() {
    return this.currentRoute.startsWith('registration.confirmation')
      ? 'btn-success'
      : 'btn-primary';
  }

  @action
  changeRoute() {
    this.router.transitionTo(this.nextRoute);
  }
}

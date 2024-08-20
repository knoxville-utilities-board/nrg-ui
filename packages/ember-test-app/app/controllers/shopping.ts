import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

export default class ApplicationController extends Controller {
  @service declare router: RouterService;

  @tracked
  tvDescription = 'Add (optional)';

  @tracked
  phoneDescription = 'Add (optional)';

  @tracked
  tvSelected = false;

  @tracked
  phoneSelected = false;

  get showBusinessProducts() {
    return this.router.currentRouteName.endsWith('business');
  }

  @action
  viewAddons(path: string, event: Event) {
    event.stopPropagation();
    this.router.transitionTo(`shopping.${path}-addons`);
  }

  @action
  changeRoute() {
    this.router.transitionTo(this.nextRoute);
  }

  routes = [
    'shopping.fiber',
    'shopping.fiber-selected',
    'shopping.fiber-addons',
    'shopping.tv',
    'shopping.tv-addons',
    'shopping.phone',
    'shopping.phone-addons',
    'shopping.phone-registration',
    'registration.user',
  ];

  businessRoutes = [
    'shopping.fiber-business',
    'shopping.fiber-selected-business',
    'shopping.fiber-addons-business',
    'shopping.phone-business',
    'shopping.phone-addons-business',
    'shopping.phone-registration-business',
    'registration.business',
  ];

  get activeTab() {
    if (this.currentRoute.startsWith('shopping.fiber')) {
      return 'fiber';
    } else if (this.currentRoute.startsWith('shopping.tv')) {
      return 'tv';
    } else if (this.currentRoute.startsWith('shopping.phone')) {
      return 'phone';
    }
    return 'fiber';
  }

  get nextRoute() {
    const routeOptions = this.showBusinessProducts
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

  get currentRoute() {
    return this.router.currentRouteName;
  }

  get fiberDescription() {
    if (
      this.currentRoute === 'shopping' ||
      this.currentRoute === 'shopping.fiber' ||
      this.currentRoute === 'shopping.fiber-business'
    ) {
      return 'Required';
    } else if (this.showBusinessProducts) {
      return '$150/mo';
    } else {
      return '$65/mo';
    }
  }

  get fiberSelected() {
    if (
      this.currentRoute === 'shopping' ||
      this.currentRoute === 'shopping.fiber'
    ) {
      return false;
    }
    return true;
  }

  get fiberLabel() {
    if (
      this.currentRoute === 'shopping' ||
      this.currentRoute === 'shopping.fiber' ||
      this.currentRoute === 'shopping.fiber-business'
    ) {
      return 'Fiber';
    } else if (this.showBusinessProducts) {
      return 'Fiber: The Gig At Work';
    } else {
      return 'Fiber: The Gig';
    }
  }

  get total() {
    if (
      this.currentRoute === 'shopping' ||
      this.currentRoute === 'shopping.fiber' ||
      this.currentRoute === 'shopping.fiber-business'
    ) {
      return '';
    } else if (
      this.currentRoute === 'shopping.fiber-selected' ||
      this.currentRoute === 'shopping.fiber-addons'
    ) {
      return '$65/mo';
    } else if (
      this.currentRoute === 'shopping.fiber-selected-business' ||
      this.currentRoute === 'shopping.fiber-addons-business'
    ) {
      return '$150/mo';
    } else if (this.showBusinessProducts) {
      return '$175/mo';
    } else {
      return '$80/mo';
    }
  }

  get addonSelected() {
    if (
      this.currentRoute === 'shopping.fiber' ||
      this.currentRoute === 'shopping.fiber-selected' ||
      this.currentRoute === 'shopping.fiber-addons' ||
      this.currentRoute === 'shopping.fiber-business' ||
      this.currentRoute === 'shopping.fiber-selected-business' ||
      this.currentRoute === 'shopping.fiber-addons-business'
    ) {
      return false;
    }
    return true;
  }
}

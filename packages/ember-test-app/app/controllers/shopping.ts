import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

export default class ApplicationController extends Controller {
  @service declare router: RouterService;

  @tracked routeNumber = 0;

  get activeTab() {
    if (
      this.currentRoute === 'shopping.fiber' ||
      this.currentRoute === 'shopping.fiber-addons' ||
      this.currentRoute === 'shopping.fiber-selected'
    ) {
      return 'fiber';
    } else if (
      this.currentRoute === 'shopping.tv' ||
      this.currentRoute === 'shopping.tv-addons' ||
      this.currentRoute === 'shopping.tv-selected'
    ) {
      return 'tv';
    } else if (
      this.currentRoute === 'shopping.phone' ||
      this.currentRoute === 'shopping.phone-addons' ||
      this.currentRoute === 'shopping.phone-selected'
    ) {
      return 'phone';
    }
    return 'fiber';
  }

  routes = [
    'shopping.fiber',
    'shopping.fiber-addons',
    'shopping.fiber-selected',
    'shopping.tv',
    'shopping.tv-addons',
    'shopping.phone',
    'shopping.phone-addons',
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

  get currentRoute() {
    return this.router.currentRouteName;
  }

  get fiberDescription() {
    if (
      this.currentRoute === 'shopping' ||
      this.currentRoute === 'shopping.fiber'
    ) {
      return 'Required';
    }
    return '$65/mo';
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
      this.currentRoute === 'shopping.fiber'
    ) {
      return 'Fiber';
    }
    return 'Fiber: The Gig';
  }
  @tracked
  tvDescription = 'Add (optional)';

  @tracked
  phoneDescription = 'Add (optional)';

  @tracked
  tvSelected = false;

  @tracked
  phoneSelected = false;
}

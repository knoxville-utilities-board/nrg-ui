import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

export default class ApplicationController extends Controller {
  @service declare router: RouterService;

  @tracked
  active = 'fiber';

  @action
  isActive(path: string) {
    if (this.active === path) {
      return true;
    } else {
      return false;
    }
  }

  @action
  setActive(path: string) {
    this.active = path;
  }

  @tracked routeNumber = 0;

  routes = [
    'shopping.fiber-addons',
    'shopping.tv',
    'shopping.tv-addons',
    'shopping.phone',
    'shopping.phone-addons',
  ];

  get nextRoute() {
    const next = this.routes[this.routeNumber];
    return next;
  }

  @action
  changeRoute() {
    this.router.transitionTo(this.nextRoute);
    this.routeNumber++;
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

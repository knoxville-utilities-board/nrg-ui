import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type RouterService from '@ember/routing/router-service';

export default class ApplicationController extends Controller {
  @service
  declare router: RouterService;

  redirect() {
    this.router.transitionTo('shopping.fiber');
  }

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

  @tracked
  fiberDescription = 'Required';

  @tracked
  tvDescription = 'Add (optional)';

  @tracked
  phoneDescription = 'Add (optional)';

  @tracked
  fiberSelected = false;

  @tracked
  tvSelected = false;

  @tracked
  phoneSelected = false;
}

import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type ApplicationService from '../services/application';
import type RouterService from '@ember/routing/router-service';

export default class ApplicationController extends Controller {
  @service
  declare application: ApplicationService;

  @service
  declare router: RouterService;

  @tracked
  options = [
    {
      label: 'KUB Fiber is available at 123 Main St',
      link: {
        text: 'Change Address',
        route: 'signup',
      },
    },
  ];

  get currentRoute() {
    return this.router.currentRouteName;
  }
}

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
        route: 'index',
      },
    },
  ];

  @tracked
  title: string | undefined;

  @tracked
  showPreviousNav = false;

  @tracked
  nextNavDisabled = true;

  @tracked
  selection: string | undefined;

  shouldShowPreviousNav() {
    if (this.router.currentRouteName === 'index') {
      this.showPreviousNav = false;
    } else {
      this.showPreviousNav = true;
    }
  }

  shouldDisabledNextNav() {
    if (this.selection) {
      this.nextNavDisabled = false;
    } else {
      this.nextNavDisabled = true;
    }
  }
}

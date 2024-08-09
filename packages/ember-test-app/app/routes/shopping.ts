import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';
export default class ShoppingRoute extends Route {
  @service
  declare router: RouterService;

  selectionMade = false;

  async model() {
    return {
      selectionMade: this.selectionMade,
    };
  }
}

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type Router from 'ember-test-app/router';

export default class ApplicationController extends Controller {
  @service
  declare router: Router;

  @action
  clickHandler() {
    this.router.transitionTo('shopping.fiber-selected-business');
  }
}

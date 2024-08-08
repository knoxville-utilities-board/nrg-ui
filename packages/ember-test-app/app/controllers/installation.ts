import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type Router from 'ember-test-app/router';

export default class ApplicationController extends Controller {
  @service
  declare router: Router;

  @tracked
  dateSelected = false;

  @action
  selectDate() {
    this.dateSelected = true;
  }

  @action
  confirmOrder() {
    this.router.transitionTo('shopping');
  }
}

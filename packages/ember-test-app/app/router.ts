import EmberRouter from '@ember/routing/router';
import config from 'ember-test-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('marketing');
  this.route('form');
  this.route('cards');
  this.route('promo');
  this.route('faq');
  this.route('workflow-tray');
  this.route('components', function () {
    this.route('button');
    this.route('card');
    this.route('icon');
    this.route('navbar');
  });
  this.route('helpers');
  this.route('modifiers');
  this.route('services');
});

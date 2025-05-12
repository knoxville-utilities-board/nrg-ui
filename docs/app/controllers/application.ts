import Controller from '@ember/controller';
import { action } from '@ember/object';
import { isDevelopingApp, isTesting, macroCondition } from '@embroider/macros';
import { tracked } from '@glimmer/tracking';

// @ts-expect-error - Currently don't know how to
// handle SVG imports in TypeScript
import logo from '../assets/images/logo.svg';

export default class ApplicationController extends Controller {
  logo = logo;

  @tracked
  isCollapsed = false;

  get environment() {
    if (macroCondition(isTesting())) {
      return 'test';
    }
    if (macroCondition(isDevelopingApp())) {
      return 'dev';
    }
    return 'prod';
  }

  @action
  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}

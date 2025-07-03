import Controller from '@ember/controller';
import { isDevelopingApp, isTesting, macroCondition } from '@embroider/macros';

import logo from '../assets/images/logo.svg';

export default class ApplicationController extends Controller {
  logo = logo;

  get environment() {
    if (macroCondition(isTesting())) {
      return 'test';
    }
    if (macroCondition(isDevelopingApp())) {
      return 'dev';
    }
    return 'prod';
  }
}

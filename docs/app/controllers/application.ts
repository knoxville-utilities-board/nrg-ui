import Controller from '@ember/controller';
import { isDevelopingApp, isTesting, macroCondition } from '@embroider/macros';

export default class ApplicationController extends Controller {
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

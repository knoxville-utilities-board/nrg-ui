import Route from '@ember/routing/route';
import { classify } from '@ember/string';

export default class ApplicationRoute extends Route {
  model() {
    console.log(classify(this.fullRouteName));
  }
}

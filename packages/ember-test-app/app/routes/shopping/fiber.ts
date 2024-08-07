import Route from '@ember/routing/route';

export default class FiberRoute extends Route {
  async model() {
    // eslint-disable-next-line prefer-rest-params
    return super.model(...arguments);
  }
}

import Route from '@ember/routing/route';

export default class SideBySideDetailRoute extends Route {
  async model(params: Record<string, unknown>) {
    return params['item_id'] as string;
  }
}

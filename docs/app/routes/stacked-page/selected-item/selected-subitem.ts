import Route from '@ember/routing/route';

export default class SelectedSubitemRoute extends Route {
  async model(params: Record<string, unknown>) {
    return params['subitem_id'] as string;
  }
}

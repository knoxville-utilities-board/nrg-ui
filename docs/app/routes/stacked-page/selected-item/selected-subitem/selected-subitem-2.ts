import Route from '@ember/routing/route';

export default class SelectedSubitem2Route extends Route {
  async model(params: Record<string, unknown>) {
    return params['subitem_2_id'] as string;
  }
}

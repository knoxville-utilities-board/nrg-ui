import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// BEGIN-SNIPPET stacked-pane-controller
export default class StackedPaneController extends Controller {
  @tracked
  start = 0;

  @tracked
  count = 25;

  @tracked
  total = this?.args?.items?.length ?? 1000;

  get meta() {
    return {
      start: this.start,
      count: this.count,
      total: this.total,
    }
  }

  @action
  update(key: 'start' | 'count' | 'total', value: number) {
    (this)[key] = value;
  }
}
// END-SNIPPET

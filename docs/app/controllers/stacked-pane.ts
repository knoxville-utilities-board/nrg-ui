import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const range = (len: number) =>
  Array(len)
    .fill(1)
    .map((x, y) => x + y);

// BEGIN-SNIPPET stacked-pane-controller
export default class StackedPaneController extends Controller {
  @tracked
  start = 0;

  @tracked
  count = 25;

  @tracked
  total = 1000;

  get meta() {
    return {
      start: this.start,
      count: this.count,
      total: this.total,
    };
  }

  get longRange() {
    return range(25);
  }

  get shortRange() {
    return range(5);
  }

  @action
  update(key: 'start' | 'count' | 'total', value: number) {
    this[key] = value;
  }
}
// END-SNIPPET

import { action } from '@ember/object';
import Component from '@glimmer/component';
export default class MarketingPromoComponent extends Component {
  @action
  onClick() {
    this.args.onClick?.();
  }
}

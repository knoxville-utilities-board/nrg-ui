import { action } from '@ember/object';
import Component from '@glimmer/component';
export default class ButtonComponent extends Component {
  @action
  onClick() {
    this.args.onClick?.();
  }
}

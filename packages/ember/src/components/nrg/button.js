import { action } from '@ember/object';
import Component from '@glimmer/component';
export default class ButtonComponent extends Component {
  @action
  onClick(event) {
    this.args.onClick?.(event);
  }
}

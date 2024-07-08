import { action } from '@ember/object';
import Component from '@glimmer/component';
export default class TextFieldComponent extends Component {
  @action
  onChange() {
    this.args.onChange?.();
  }
}

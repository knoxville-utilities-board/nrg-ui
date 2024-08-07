import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class FiberController extends Controller {
  @action clickHandler() {
    this.model.selectionMade = true;
  }
}

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked
  active = 'fiber';

  @action
  isActive(path: string) {
    if (this.active === path) {
      return true;
    } else {
      return false;
    }
  }

  get selectionMade() {
    return this.model === true;
  }

  @action
  setActive(path: string) {
    this.active = path;
  }

  @tracked
  fiberDescription = 'Required';

  @tracked
  tvDescription = 'Add (optional)';

  @tracked
  phoneDescription = 'Add (optional)';

  @tracked
  fiberSelected = this.selectionMade;

  @tracked
  tvSelected = false;

  @tracked
  phoneSelected = false;
}

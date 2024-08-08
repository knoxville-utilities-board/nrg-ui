import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked
  phoneNumberOption: string | undefined = undefined;

  @action
  setPhoneNumberOption(value: string) {
    this.phoneNumberOption = value;
  }

  get existingBtnClass() {
    if (this.phoneNumberOption === 'existing') {
      return 'btn-success text-white';
    } else if (this.phoneNumberOption === 'new') {
      return 'btn-outline-success';
    }
    return 'btn-primary';
  }

  get newBtnClass() {
    if (this.phoneNumberOption === 'new') {
      return 'btn-success text-white';
    } else if (this.phoneNumberOption === 'existing') {
      return 'btn-outline-success';
    }
    return 'btn-primary';
  }
}

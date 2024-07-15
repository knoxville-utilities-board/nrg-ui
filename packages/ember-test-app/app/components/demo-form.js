import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

class Person {
  @tracked firstName = '';
}

export default class DemoForm extends Component {
  person = new Person();

  @tracked combos = [];

  @tracked lastName = '';

  get nameLength() {
    console.log({
      firstName: this.person.firstName.length,
      length: this.lastName.length,
    });
    return this.person.firstName.length + this.lastName.length;
  }

  get comboCount() {
    console.log({ comboCount: this.combos.length });
    return this.combos.length;
  }

  @action
  submit() {
    console.log({
      person: this.person,
      lastName: this.lastName,
      combos: this.combos,
    });
  }
}

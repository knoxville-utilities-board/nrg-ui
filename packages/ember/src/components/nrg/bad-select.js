import ValidationComponent from './validation-component.js';
import { action } from '@ember/object';

export default class BadSelect extends ValidationComponent {
  @action
  onChange({ target }) {
    const values = [...target.options]
      .filter((option) => option.selected)
      .map((option) => option.value);

    super.onChange(values);

    values.push('6');

    super.onChange(values);
  }
}

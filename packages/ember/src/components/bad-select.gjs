import ValidationComponent from './validation-component.ts';
import { on } from '@ember/modifier';
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

  <template>
  <select
  class="form-select"
  multiple
  aria-label="multiple select example"
  {{on "change" this.onChange}}
  >
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Four</option>
  </select>
</template>
}


import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import InputField from './-private/input-field.ts';

import type { Optional } from '../../';


interface AutocompleteItemSignature {
  Args: {
    value: string;
    index: number;
    activeIndex: number;
  };
  Element: HTMLLIElement;
}

class AutocompleteItem extends Component<AutocompleteItemSignature> {
  @tracked
  active = true;

  get isActiveIndex() {
    return this.args.activeIndex === this.args.index;
  }

  <template>
    <li class="dropdown-item {{if this.isActiveIndex "active"}}" role="option" ...attributes>{{this.args.value}}</li>
  </template>
}

export interface AutocompleteSignature {
  format?: ((value: Optional<string>) => string) | false;
}

export default class Autocomplete extends InputField<AutocompleteSignature> {
  @tracked
  isFocused = false;

  @tracked
  items = ["Apple", "Pear", "Orange", "Banana", "Grape", "Strawberry"];

  @tracked
  activeIndex= -1;

  @tracked
  isItemGettingSelected = false;

  get displayValue() {
    const { isFocused, value } = this;

    if (isFocused || !value) {
      return value;
    }

    return value;
  }

  toggleFocus(focus: boolean) {
    this.isFocused = focus;
  }

  @action
  selectItem(item: string, index: number, evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    this.value = item;
    this.activeIndex = index;

    this.isFocused = false;
  }

  @action
  onFocus() {
    this.isFocused = true;
  }

  @action
  onBlur(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    console.log(evt)
    this.isFocused = false;
  }

  <template>
    <div>
      <div class="input-group">
        <input
          aria-describedby={{@describedBy}}
          id={{@id}}
          class="{{this.classList}} border-end-0"
          disabled={{@disabled}}
          readonly={{@readonly}}
          type="text"
          value={{this.displayValue}}
          {{on "input" this.change}}
          {{on "focus" this.onFocus}}
          {{!-- {{on "blur" this.onBlur}} --}}
          ...attributes
        />
        <span class="input-group-text bg-transparent border-start-0" >
          <i class="bi bi-search"/>
        </span>
      </div>
      <ul
        class="dropdown-menu mt-1 {{if this.isFocused 'show'}}"
        role="listbox"
        >
          {{#each this.items as |item index|}}
            <AutocompleteItem
              @value={{item}}
              @index={{index}}
              @activeIndex={{this.activeIndex}}
              {{on "click" (fn this.selectItem item index)}}
            />
          {{/each}}
      </ul>
    </div>
  </template>
}

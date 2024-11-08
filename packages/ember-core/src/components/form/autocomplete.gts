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
  Args: {
    format?: ((value: Optional<string>) => string) | false;
    loading: boolean;
  };
  Element: HTMLInputElement;
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

  get disabled() {
    return this.args.disabled || this.args.loading;
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

    this.isFocused = false;
  }

  <template>
    <div>
      <div class="input-group">
        <input
          aria-describedby={{@describedBy}}
          id={{@id}}
          class="{{this.classList}}"
          disabled={{this.disabled}}
          readonly={{@readonly}}
          type="text"
          value={{this.displayValue}}
          {{on "input" this.change}}
          {{on "focus" this.onFocus}}
          {{on "blur" this.onBlur}}
          ...attributes
        />
        {{!-- <span class="input-group-text border-start-0 {{if this.disabled 'bg-body-secondary' 'bg-transparent'}}">
          {{#if @loading}}
            <span class="spinner-border spinner-border-sm"/>
          {{else}}
            <i class="bi bi-search"/>
          {{/if}}
        </span> --}}
      </div>

      <div class="dropdown">
        <ul
          class="dropdown-menu mt-1 w-100 {{if this.isFocused 'show'}}"
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

    </div>
  </template>
}

import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import InputField from './-private/input-field.ts';
import onClickOutside from '../../modifiers/on-click-outside.ts';

import type { Optional } from '../../';

interface AutocompleteItemSignature {
  Args: {
    value: string;
    index: number;
    activeIndex?: number;
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
    loading?: boolean;
  };
  Element: HTMLInputElement;
}

export default class Autocomplete extends InputField<AutocompleteSignature> {
  @tracked
  isFocused = false;

  @tracked
  items = ["Apple", "Pear", "Orange", "Banana", "Grape", "Strawberry"];

  @tracked
  searchString = '';

  get disabled() {
    return this.args.disabled || this.args.loading;
  }

  get showSuggestions() {
    return this.isFocused && this.searchString.length > 0;
  }

  toggleFocus(focus: boolean) {
    this.isFocused = focus;
  }

  @action
  selectItem(index: number, evt?: Event) {
    evt?.preventDefault();
    evt?.stopPropagation();

    this.value = this.items[index] ?? '';
    this.searchString = this.value;

    this.isFocused = false;
  }

  @action
  onFocus() {
    this.isFocused = true;
  }

  @action
  onBlur() {
    this.isFocused = false;
  }

  @action
  search(evt: Event) {
    this.searchString = (evt.target as HTMLInputElement).value;
    this.value = '';
  }

  <template>
    <div
      {{onClickOutside this.onBlur}}
    >
      <div class="input-group">
        {{#unless @basic}}
          <span class="input-group-text">
            {{#if @loading}}
              <span class="spinner-border spinner-border-sm"/>
            {{else}}
              <i class="bi bi-search"/>
            {{/if}}
          </span>
        {{/unless}}
        <input
          aria-describedby={{@describedBy}}
          id={{@id}}
          class={{this.classList}}
          disabled={{this.disabled}}
          readonly={{@readonly}}
          type="text"
          value={{this.searchString}}
          {{on "input" this.search}}
          {{on "focus" this.onFocus}}
          ...attributes
        />
      </div>
      <div class="dropdown">
        <ul
          class="dropdown-menu mt-1 w-100 {{if this.showSuggestions 'show'}}"
          role="listbox"
        >
          {{#each this.items as |item index|}}
            <AutocompleteItem
              @value={{item}}
              @index={{index}}
              {{on "click" (fn this.selectItem index)}}
            />
          {{/each}}
        </ul>
      </div>
    </div>
  </template>
}

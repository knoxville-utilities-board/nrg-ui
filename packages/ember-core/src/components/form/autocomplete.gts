import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import onKey from 'ember-keyboard/modifiers/on-key';

import InputField from './-private/input-field.ts';
import onClickOutside from '../../modifiers/on-click-outside.ts';


import type { Optional } from '../../';

interface AutocompleteItemSignature {
  Args: {
    currentValue: string;
    index: number;
    activeIndex?: number;
  };
  Element: HTMLLIElement;
}

class AutocompleteItem extends Component<AutocompleteItemSignature> {
  @tracked
  active = true;

  get classList() {
      const classes = ['dropdown-item'];

      if (this.isActiveIndex) {
        classes.push('active');
      }

      return classes.join(' ');
    }

  get isActiveIndex() {
    return this.args.activeIndex === this.args.index;
  }

  <template>
    <li class={{this.classList}} role="option" ...attributes>{{this.args.currentValue}}</li>
  </template>
}

export interface AutocompleteSignature {
  Args: {
    format?: ((value: Optional<string>) => string) | false;
    loading?: boolean;
    query: (searchString: string) => Promise<string[]>;
  };
  Element: HTMLInputElement;
}

export default class Autocomplete extends InputField<AutocompleteSignature> {
  @tracked
  isFocused = false;

  @tracked
  activeIndex = -1;

  @tracked
  searchString = '';

  @tracked
  filterItems: string[] = [];

  get loading() {
    return this.args.loading || this.onQuery.isRunning;
  }

  get showSuggestions() {
    return this.isFocused && this.searchString.length > 0 && !this.loading;
  }

  @action
  selectItem(index: number, evt?: Event) {
    evt?.preventDefault();
    evt?.stopPropagation();

    this.value = this.filterItems[index] ?? '';
    this.searchString = this.value;

    this.activeIndex = index;

    this.onBlur();
  }

  @action
  moveUp(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    if (!this.showSuggestions) {
      return;
    }

    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
}

  @action
  moveDown(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    if (!this.showSuggestions) {
      return;
    }

    if (this.activeIndex < this.filterItems.length - 1) {
      this.activeIndex++;
    }
  }

  @action
  enterKeyHandler(evt?: KeyboardEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();

    if (!this.showSuggestions) {
      return;
    }

    if (this.activeIndex == -1) {
      return;
    }

    this.selectItem(this.activeIndex);

    this.onBlur();
  }

  @action
  exitKeyHandler(evt?: KeyboardEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();

    if (!this.showSuggestions) {
      return;
    }

    this.onBlur();
  }

  @action
  onFocus(evt: FocusEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    this.isFocused = true;
  }

  @action
  onBlur() {
    this.isFocused = false;
  }

  @action
  onSearch(evt: Event) {
    this.searchString = (evt.target as HTMLInputElement).value;
    this.value = '';

    if (this.searchString.length === 0) {
      this.activeIndex = -1;
      return;
    }

    this.onQuery.perform();
  }

  onQuery = restartableTask(async () => {
    await timeout(500);
    this.filterItems = await this.args.query(this.searchString);
    this.isFocused = true;
  });

  <template>
    <div
      {{onClickOutside this.onBlur}}
      {{onKey "ArrowUp" this.moveUp onlyWhenFocused=true}}
      {{onKey "ArrowDown" this.moveDown onlyWhenFocused=true}}
      {{onKey "Enter" this.enterKeyHandler onlyWhenFocused=true}}
      {{onKey "Space" this.enterKeyHandler onlyWhenFocused=true}}
      {{onKey "NumpadEnter" this.enterKeyHandler onlyWhenFocused=true}}
      {{onKey "Tab" this.exitKeyHandler onlyWhenFocused=true}}
      {{onKey "Escape" this.exitKeyHandler onlyWhenFocused=true}}
    >
      <div class="input-group">
        {{#unless @basic}}
          <span class="input-group-text">
            {{#if this.loading}}
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
          disabled={{@disabled}}
          readonly={{@readonly}}
          type="text"
          value={{this.searchString}}
          {{on "input" this.onSearch}}
          {{on "focus" this.onFocus}}
          ...attributes
        />
      </div>
      <div class="dropdown">
        <ul
          class="dropdown-menu mt-1 w-100 {{if this.showSuggestions 'show'}}"
          role="listbox"
        >
          {{#each this.filterItems as |item index|}}
            <AutocompleteItem
              @currentValue={{item}}
              @index={{index}}
              @activeIndex={{this.activeIndex}}
              {{on "click" (fn this.selectItem index)}}
            />
          {{else}}
            <li class="dropdown-item disabled">No results found</li>
          {{/each}}
        </ul>
      </div>
    </div>
  </template>
}

import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import onKey from 'ember-keyboard/modifiers/on-key';

import InputField from './-private/input-field.ts';
import onInsert from '../../modifiers/did-insert.ts';
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
    clearable?: boolean;
    hideSearchIcon?: boolean;
    loading?: boolean;
    minCharacters?: number;
    noResultsLabel?: string;
    placeholder?: string;
    searchTimeout?: number;
    scrollable?: boolean;
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

  @tracked
  menuElement: Optional<HTMLElement> = null;

  @tracked
  searchInputElement: Optional<HTMLElement> = null;

  get hideSearchIcon() {
    if (this.args.basic) {
      return true;
    }

    return this.args.hideSearchIcon ?? false;
  }

  get loading() {
    return this.args.loading || this.onQuery.isRunning;
  }

  get minCharacters() {
    return this.args.minCharacters ?? 1;
  }

  get noResultsLabel() {
    return this.args.noResultsLabel ?? "No results found";
  }

  get placeholder() {
    if (this.args.basic) {
      return "";
    }

    return this.args.placeholder ?? "Search";
  }

  get searchTimeout() {
    return this.args.searchTimeout ?? 300;
  }

  get scrollable() {
    return this.args.scrollable ?? true;
  }

  get clearable() {
    return this.args.clearable ?? false;
  }

  get canPerformSearch () {
    return this.searchString.length >= this.minCharacters;
  }

  get showSuggestions() {
    return this.isFocused && this.canPerformSearch && !this.loading;
  }

  scrollActiveItemIntoView() {
    if (this.activeIndex == -1) {
      return;
    }
    const childElements = Array.from(
      this.menuElement?.querySelectorAll(`li`) ?? [],
    );
    const activeElement = childElements[this.activeIndex];
    if (!activeElement) {
      return;
    }
    activeElement.scrollIntoView({ block: 'nearest' });
  }

  onQuery = restartableTask(async () => {
    await timeout(this.searchTimeout);
    this.filterItems = await this.args.query(this.searchString);
    this.isFocused = true;
  });

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

    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.scrollActiveItemIntoView();
    }
}

  @action
  moveDown(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.activeIndex < this.filterItems.length - 1) {
      this.activeIndex++;
      this.scrollActiveItemIntoView();
    }
  }

  @action
  enterKeyHandler(evt?: KeyboardEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();

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
    this.searchInputElement?.blur();
  }

  @action
  onSearch(evt: Event) {
    this.searchString = (evt.target as HTMLInputElement).value;
    this.value = '';
    this.activeIndex = -1;

    if (this.searchString.trim().length === 0) {
      return;
    }

    this.onQuery.perform();
  }

  @action
  clear() {
    this.searchString = ''
    this.value = '';
    this.activeIndex = -1;

    this.onBlur()
  }

  @action
  onSearchBarInsert(element: HTMLElement) {
    this.searchInputElement = element;
  }

  @action
  onMenuInsert(element: HTMLElement) {
    this.menuElement = element;
  }

  <template>
    <div
      class="search"
      {{onClickOutside this.onBlur}}
    >
      <div class="input-group">
        {{#unless this.hideSearchIcon}}
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
          placeholder={{this.placeholder}}
          type="text"
          value={{this.searchString}}
          {{on "input" this.onSearch}}
          {{on "focus" this.onFocus}}
          {{onKey "ArrowUp" this.moveUp onlyWhenFocused=true}}
          {{onKey "ArrowDown" this.moveDown onlyWhenFocused=true}}
          {{onKey "Enter" this.enterKeyHandler onlyWhenFocused=true}}
          {{onKey "NumpadEnter" this.enterKeyHandler onlyWhenFocused=true}}
          {{onKey "Tab" this.exitKeyHandler onlyWhenFocused=true}}
          {{onKey "Escape" this.exitKeyHandler onlyWhenFocused=true}}
          {{onInsert this.onSearchBarInsert}}
          ...attributes
        />
        {{#if this.clearable}}
          <button
            class="input-group-text"
            {{on "click" this.clear}}
          >
            <i class="bi bi-x-lg"/>
          </button>
        {{/if}}
      </div>
      <div class="dropdown {{if this.scrollable 'scrollable'}}">
        <ul
          class="dropdown-menu mt-1 w-100 {{if this.showSuggestions 'show'}}"
          role="listbox"
          {{onInsert this.onMenuInsert}}
        >
          {{#each this.filterItems as |item index|}}
            <AutocompleteItem
              @currentValue={{item}}
              @index={{index}}
              @activeIndex={{this.activeIndex}}
              {{on "click" (fn this.selectItem index)}}
            />
          {{else}}
            <li class="dropdown-item disabled">{{this.noResultsLabel}}</li>
          {{/each}}
        </ul>
      </div>
    </div>
  </template>
}

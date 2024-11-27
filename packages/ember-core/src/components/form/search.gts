import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
// @ts-expect-error Ember keyboard doesn't currently ship a type for the `on-key` modifier
// https://github.com/adopted-ember-addons/ember-keyboard/issues/464
import onKey from 'ember-keyboard/modifiers/on-key';

import BoundValue from './bound-value.ts';
import onInsert from '../../modifiers/did-insert.ts';
import onClickOutside from '../../modifiers/on-click-outside.ts';

import type { Optional } from '../../';

declare type SearchOption<T> = {
  label: string;
  value: string | T;
  raw: T;
};

interface SearchItemSignature<T> {
  Args: {
    option: SearchOption<T>;
    index: number;
    activeIndex?: number;
  };
  Element: HTMLLIElement;
}

class SearchItem<T> extends Component<SearchItemSignature<T>> {
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
    <li class={{this.classList}} role="option" ...attributes>{{this.args.option.label}}</li>
  </template>
}

export interface SearchSignature<T> {
  Args: {
    basic?: boolean;
    clearable?: boolean;
    describedBy?: string;
    disabled?: boolean;
    displayPath?: string;
    format?: ((value: Optional<string>) => string) | false;
    hideSearchIcon?: boolean;
    id?: string;
    isInvalid?: boolean;
    isWarning?: boolean;
    loading?: boolean;
    minCharacters?: number;
    noResultsLabel?: string;
    placeholder?: string;
    query: (searchString: string) => Promise<T[]>;
    readonly?: boolean;
    scrollable?: boolean;
    searchTimeout?: number;
    serializationPath?: string;
  };
  Element: HTMLDivElement;
}

export default class Search<T> extends BoundValue<SearchSignature<T>, string | T> {
  @tracked
  activeItem = -1;

  @tracked
  items: T[] = [];

  @tracked
  isFocused = false;

  @tracked
  menuElement: Optional<HTMLElement> = null;

  @tracked
  searchInputElement: Optional<HTMLElement> = null;

  @tracked
  searchString = '';

  get clearable() {
    if (this.args.basic) {
      return false;
    }

    return this.args.clearable ?? false;
  }

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

  get scrollable() {
    return this.args.scrollable ?? true;
  }

  get searchTimeout() {
    return this.args.searchTimeout ?? 300;
  }

  get canPerformSearch () {
    return this.searchString.trim().length >= this.minCharacters;
  }

  get showItems() {
    return this.isFocused && this.canPerformSearch && !this.loading;
  }

  get classList() {
    const classes = ['search'];

    if (this.args.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.isWarning) {
      classes.push('is-warning');
    }

    return classes.join(' ');
  }

  get inputClassList() {
    const classes = ['form-control'];

    if (this.args.basic) {
      classes[0] += '-plaintext';
    }

    if (this.args.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.isWarning) {
      classes.push('is-warning');
    }

    return classes.join(' ');
  }

  get displayValue() {
    if (this.value) {
      if (this.args.displayPath) {
        return get(this.value, this.args.displayPath) as string;
      }

      return this.value as string;
    }

    return this.searchString;
  }

  get internalItems() {
    return this.items.map((option) => {
      if (typeof option !== 'object') {
        return {
          raw: option,
          label: option as string,
          value: option as string,
        };
      }

      const label = get(option, this.args.displayPath ?? 'label') as string;
      let value: string | T = option;
      // null serializationPath results in value being the raw option
      if (this.args.serializationPath !== null) {
        value = get(option, this.args.serializationPath ?? 'value') as string;
      }
      return {
        raw: option,
        label,
        value,
      };
    });
  }

  scrollActiveItemIntoView() {
    if (this.activeItem == -1) {
      return;
    }
    const childElements = Array.from(
      this.menuElement?.querySelectorAll(`li`) ?? [],
    );
    const activeElement = childElements[this.activeItem];
    if (!activeElement) {
      return;
    }
    activeElement.scrollIntoView({ block: 'nearest' });
  }

  onQuery = restartableTask(async (searchString) => {
    await timeout(this.searchTimeout);
    this.items = await this.args.query(searchString);
    this.isFocused = true;
  });

  @action
  selectItem(item: SearchOption<T>, index: number, evt?: Event) {
    evt?.preventDefault();
    evt?.stopPropagation();

    this.activeItem = index;

    this.onBlur();

    this.onChange(item.value);
  }

  @action
  moveUp(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.activeItem > 0) {
      this.activeItem--;
      this.scrollActiveItemIntoView();
    }
}

  @action
  moveDown(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.activeItem < this.items.length - 1) {
      this.activeItem++;
      this.scrollActiveItemIntoView();
    }
  }

  @action
  enterKeyHandler(evt?: KeyboardEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();

    if (this.activeItem == -1) {
      return;
    }

    const item = this.internalItems[this.activeItem];

    if (item != undefined) {
      this.selectItem(item, this.activeItem);
    }

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
    this.activeItem = -1;

    if (!this.canPerformSearch) {
      return;
    }

    this.onQuery.perform(this.searchString);
  }

  @action
  clear() {
    this.searchString = ''
    this.value = '';
    this.activeItem = -1;

    this.onBlur();
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
      class={{this.classList}}
      {{onClickOutside this.onBlur}}
      ...attributes
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
          class={{this.inputClassList}}
          disabled={{@disabled}}
          readonly={{@readonly}}
          placeholder={{this.placeholder}}
          type="text"
          value={{this.displayValue}}
          {{on "input" this.onSearch}}
          {{on "focus" this.onFocus}}
          {{onKey "ArrowUp" this.moveUp onlyWhenFocused=true}}
          {{onKey "ArrowDown" this.moveDown onlyWhenFocused=true}}
          {{onKey "Enter" this.enterKeyHandler onlyWhenFocused=true}}
          {{onKey "NumpadEnter" this.enterKeyHandler onlyWhenFocused=true}}
          {{onKey "Tab" this.exitKeyHandler onlyWhenFocused=true}}
          {{onKey "Escape" this.exitKeyHandler onlyWhenFocused=true}}
          {{onInsert this.onSearchBarInsert}}
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
          class="dropdown-menu mt-1 w-100 {{if this.showItems 'show'}}"
          role="listbox"
          {{onInsert this.onMenuInsert}}
        >
          {{#each this.internalItems as |option index|}}
            <SearchItem
              @option={{option}}
              @index={{index}}
              @activeIndex={{this.activeItem}}
              {{on "click" (fn this.selectItem option index)}}
            />
          {{else}}
            <li class="dropdown-item disabled">{{this.noResultsLabel}}</li>
          {{/each}}
        </ul>
      </div>
    </div>
  </template>
}

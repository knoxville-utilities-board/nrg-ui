import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import { t } from 'ember-intl';
// @ts-expect-error Ember keyboard doesn't currently ship a type for the `on-key` modifier
// https://github.com/adopted-ember-addons/ember-keyboard/issues/464
import onKey from 'ember-keyboard/modifiers/on-key';

import TextInput from './../form/text-input.gts';
import BoundValue from './bound-value.ts';
import { bind } from '../../helpers/bind.ts';
import onClickOutside from '../../modifiers/on-click-outside.ts';
import onInsert from '../../modifiers/on-insert.ts';
import Button from '../button.gts';

import type { Optional } from '../../';
import type IntlService from 'ember-intl/services/intl';


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
  get classList() {
    const classes = ['dropdown-item'];

    if (this.isActive) {
      classes.push('active');
    }

    return classes.join(' ');
  }

  get isActive() {
    return this.args.activeIndex === this.args.index;
  }

  <template>
    <li
      class={{this.classList}}
      role="option"
      aria-selected={{this.isActive}}
      ...attributes
    >{{@option.label}}</li>
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
    readonly?: boolean;
    scrollable?: boolean;
    searchTimeout?: number;
    serializationPath?: string;
    onQuery: (searchString: string) => Promise<T[]>;
  };
  Element: HTMLDivElement;
}

export default class Search<T> extends BoundValue<
  SearchSignature<T>,
  string | T
> {
  self: Record<'searchString', string> = this;

  @tracked
  activeIndex = -1;

  @tracked
  options: T[] = [];

  @tracked
  isFocused = false;

  @tracked
  menuElement: Optional<HTMLElement> = null;

  @tracked
  searchInputElement: Optional<HTMLElement> = null;

  @tracked
  searchString = '';

  @service
  declare intl: IntlService;

  constructor(owner: unknown, args: SearchSignature<T>) {
    super(owner, args);

    if (typeof this.value === 'object') {
      this.searchString = get(this.value, this.args.displayPath ?? 'label') as string;
    } else if (this.value) {
      this.searchString = this.value;
    }
  }

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
    return this.args.loading || this.query.isRunning;
  }

  get minCharacters() {
    return this.args.minCharacters ?? 1;
  }

  get noResultsLabel() {
    return this.args.noResultsLabel ?? this.intl.t('nrg.search.noResults');
  }

  get placeholder() {
    if (this.args.basic) {
      return '';
    }

    return this.args.placeholder ?? this.intl.t('nrg.search.placeholder');
  }

  get scrollable() {
    return this.args.scrollable ?? true;
  }

  get searchTimeout() {
    return this.args.searchTimeout ?? 300;
  }

  get canPerformSearch() {
    return this.searchString.trim().length >= this.minCharacters;
  }

  get showOptions() {
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

  get internalOptions() {
    return this.options.map((option) => {
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

  scrollActiveOptionIntoView() {
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

  query = restartableTask(async (searchString) => {
    await timeout(this.searchTimeout);
    this.options = await this.args.onQuery(searchString);
    this.isFocused = true;
  });

  @action
  selectOption(option: SearchOption<T>, index: number, evt?: Event) {
    evt?.preventDefault();
    evt?.stopPropagation();

    this.activeIndex = index;
    this.onChange(option.value);
    this.searchString = option.label;

    this.onBlur();
  }

  @action
  moveUp(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.scrollActiveOptionIntoView();
    }
  }

  @action
  moveDown(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.activeIndex < this.options.length - 1) {
      this.activeIndex++;
      this.scrollActiveOptionIntoView();
    }
  }

  @action
  enterKeyHandler(evt?: KeyboardEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();

    if (this.activeIndex == -1) {
      return;
    }

    const option = this.internalOptions[this.activeIndex];

    if (option != undefined) {
      this.selectOption(option, this.activeIndex);
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
    this.activeIndex = -1;

    if (!this.canPerformSearch) {
      return;
    }

    this.query.perform(this.searchString);
  }

  @action
  clear() {
    this.searchString = '';
    this.value = '';
    this.activeIndex = -1;

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
    <div class={{this.classList}} {{onClickOutside this.onBlur}} ...attributes>
      <div class="input-group">
        {{#unless this.hideSearchIcon}}
          <span class="input-group-text">
            {{#if this.loading}}
              <span class="spinner-border spinner-border-sm" />
            {{else}}
              <i class="bi bi-search" />
            {{/if}}
          </span>
        {{/unless}}
        <TextInput
          class={{this.inputClassList}}
          placeholder={{this.placeholder}}
          @basic={{@basic}}
          @binding={{bind this.self 'searchString'}}
          @disabled={{@disabled}}
          @id={{@id}}
          @readonly={{@readonly}}
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
          <Button
            aria-label={{t "nrg.base.clear"}}
            class="btn-outline-secondary"
            @onClick={{this.clear}}
          >
            <i class="bi bi-x-lg" />
          </Button>
        {{/if}}
      </div>
      <div class="dropdown {{if this.scrollable 'scrollable'}}">
        <ul
          class="dropdown-menu mt-1 w-100 {{if this.showOptions 'show'}}"
          role="listbox"
          {{onInsert this.onMenuInsert}}
        >
          {{#each this.internalOptions as |option index|}}
            <SearchItem
              @activeIndex={{this.activeIndex}}
              @index={{index}}
              @option={{option}}
              {{on "click" (fn this.selectOption option index)}}
            />
          {{else}}
            <li class="dropdown-item disabled">{{this.noResultsLabel}}</li>
          {{/each}}
        </ul>
      </div>
    </div>
  </template>
}

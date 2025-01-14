import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import { isTesting, macroCondition } from '@embroider/macros';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import { t } from 'ember-intl';
// @ts-expect-error Ember keyboard doesn't currently ship a type for the `on-key` modifier
// https://github.com/adopted-ember-addons/ember-keyboard/issues/464
import onKey from 'ember-keyboard/modifiers/on-key';
import { eq } from 'ember-truth-helpers';

import Dropdown from './../dropdown.gts';
import TextInput from './../form/text-input.gts';
import BoundValue from './bound-value.ts';
import { bind } from '../../helpers/bind.ts';
import { classes } from '../../helpers/classes.ts';
import onInsert from '../../modifiers/on-insert.ts';
import Button from '../button.gts';

import type { Optional } from '../../';
import type { Direction, PopoverVisibility } from '../popover.ts';
import type IntlService from 'ember-intl/services/intl';

declare type SearchOption<T> = {
  label: string;
  value: T;
};

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
    side?: Direction;

    onShow?: () => unknown | Promise<unknown>;
    onHide?: () => unknown | Promise<unknown>;
    onQuery: (searchString: string) => Promise<T[]>;
  };
  Element: HTMLDivElement;
}

export default class Search<T> extends BoundValue<
  SearchSignature<T>,
  string | T
> {
  self: Record<'searchString', string | null> = this;
  declare visibility: PopoverVisibility;
  declare inputElement: HTMLInputElement;
  declare menuElement: HTMLElement;

  @tracked
  activeIndex = -1;

  @tracked
  options: T[] = [];

  @tracked
  searchString: string | null = null;

  @service
  declare intl: IntlService;

  get clearable() {
    if (this.args.basic) {
      return false;
    }

    return this.args.clearable ?? false;
  }

  get displayPath() {
    return this.args.displayPath ?? 'label';
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
    if (macroCondition(isTesting())) {
      return 0;
    }

    return this.args.searchTimeout ?? 300;
  }

  get canPerformSearch() {
    return this.searchString && this.searchString.trim().length >= this.minCharacters;
  }

  get showOptions() {
    return this.visibility?.isShown && this.canPerformSearch && !this.loading;
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
    const displayLabel = get(this.value ?? {}, this.displayPath) as string;
    return this.searchString ?? displayLabel ?? this.value ?? '';
  }

  set displayValue(value: string) {
    this.searchString = value;
    this.value = null;
    this.activeIndex = -1;

    if (!this.canPerformSearch) {
      return;
    }

    this.query.perform(this.searchString);
  }

  get internalOptions(): SearchOption<T>[] {
    return this.options.map((option) => {
      return {
        label: get(option, this.displayPath) as string ?? option,
        value: option,
      };
    });
  }

  scrollActiveOptionIntoView() {
    if (this.activeIndex == -1) {
      return;
    }
    const childElements = Array.from(
      this.menuElement.querySelectorAll(`li`) ?? [],
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
    this.visibility.show(this.inputElement);
  });

  @action
  selectOption(index: number, evt?: Event) {
    evt?.preventDefault();
    evt?.stopPropagation();

    this.activeIndex = index;
    this.value = this.options[index] ?? null;
    this.searchString = null;

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

    if (this.activeIndex < 0 || this.activeIndex >= this.options.length) {
      return;
    }

    this.selectOption(this.activeIndex);

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

    this.visibility.show(evt);
  }

  @action
  onBlur() {
    this.visibility.hide();
    this.inputElement.blur();
  }

  @action
  clear() {
    this.searchString = null;
    this.value = null;
    this.activeIndex = -1;

    this.onBlur();
  }

  @action
  onSearchBarInsert(element: HTMLElement) {
    this.inputElement = element as HTMLInputElement;
  }

  @action
  onMenuInsert(element: HTMLElement) {
    this.menuElement = element;
  }

  @action
  setVisibility(visibility: PopoverVisibility) {
    this.visibility = visibility;
  }

  <template>
    <Dropdown
      @fullWidth={{true}}
      @side={{@side}}
      @onShow={{@onShow}}
      @onHide={{@onHide}}
      {{onInsert this.onMenuInsert}}
    >
      <:control as |visibility|>
        <div
          class={{classes
            "search"
            (if @isInvalid "is-invalid")
            (if @isWarning "is-warning")
          }}
          {{onInsert (fn this.setVisibility visibility)}}
          ...attributes
        >
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
              @binding={{bind this.self "displayValue"}}
              @disabled={{@disabled}}
              @id={{@id}}
              @readonly={{@readonly}}
              {{on "focus" visibility.show}}
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
        </div>
      </:control>
      <:menu as |Menu|>
        {{#each this.internalOptions as |option index|}}
          {{#let (eq this.activeIndex index) as |isActive|}}
            <Menu.Item
              aria-selected={{isActive}}
              class={{if isActive "active"}}
              @onSelect={{fn this.selectOption index}}
            >
              {{option.label}}
            </Menu.Item>
          {{/let}}
        {{else}}
          <Menu.Item class="disabled">
            {{this.noResultsLabel}}
          </Menu.Item>
        {{/each}}
      </:menu>
    </Dropdown>
  </template>
}

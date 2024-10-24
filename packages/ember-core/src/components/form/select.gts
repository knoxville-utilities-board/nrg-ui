import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import { isEqual } from '@ember/utils';
import Component from '@glimmer/component';
// @ts-expect-error Glimmer doesn't currently ship a type for the `cached` decorator
// https://github.com/glimmerjs/glimmer.js/issues/408
import { cached, tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
// @ts-expect-error Ember keyboard doesn't currently ship a type for the `on-key` modifier
// https://github.com/adopted-ember-addons/ember-keyboard/issues/464
import onKey from 'ember-keyboard/modifiers/on-key';
import { runTask } from 'ember-lifeline';

import BoundValue from './bound-value.ts';
import onInsert from '../../modifiers/did-insert.ts';

import type { Optional } from '../../';
import type IntlService from 'ember-intl/services/intl';

declare type SelectOption<T> = {
  label: string;
  value: string | T;
  raw: T;
};

interface SelectItemSignature<T> {
  Args: {
    optionIndex: number;
    activeIndex: number;
    currentValue: string | T;
    option: SelectOption<T>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

class SelectItem<T> extends Component<SelectItemSignature<T>> {
  get classList() {
    const classes = ['dropdown-item'];

    const useIndexActive = this.args.activeIndex != -1;
    const isCurrentIndex = this.args.optionIndex === this.args.activeIndex;
    const isCurrentValue = isEqual(
      this.args.option.value,
      this.args.currentValue,
    );

    if (useIndexActive && isCurrentIndex) {
      classes.push('active');
    }

    if (!useIndexActive && isCurrentValue) {
      classes.push('active');
    }

    return classes.join(' ');
  }

  get isActive() {
    return isEqual(this.args.option.value, this.args.currentValue);
  }

  <template>
    <li
      class={{this.classList}}
      role="option"
      aria-selected={{this.isActive}}
      ...attributes
    >
      {{yield}}
    </li>
  </template>
}

export interface SelectSignature<T> {
  Args: {
    defaultText?: string;
    describedBy?: string;
    disabled?: boolean;
    displayPath?: string;
    id?: string;
    isInvalid?: boolean;
    isWarning?: boolean;
    loading?: boolean;
    options: T[];
    scrollable?: boolean;
    serializationPath?: string | null;
  };
  Blocks: {
    display?: [T | undefined];
    option?: [T | undefined];
    empty?: [];
  };
  Element: HTMLButtonElement;
}

export default class Select<T> extends BoundValue<
  SelectSignature<T>,
  string | T
> {
  @tracked
  _isOpen = false;

  @tracked
  menuId = crypto.randomUUID();

  @tracked
  menuElement: Optional<HTMLElement> = null;

  @tracked
  activeItem = -1;

  @tracked
  internalSearchBuffer = '';

  @service
  declare intl: IntlService;

  get classList() {
    const classes = ['dropdown', 'form-control', 'text-start', 'focus-ring'];

    if (this.scrollable) {
      classes.push('scrollable');
    }

    if (this.args.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.isWarning) {
      classes.push('is-warning');
    }

    return classes.join(' ');
  }

  get caretIcon() {
    return this.isOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill';
  }

  get defaultText() {
    const baseDefaultText = this.intl.t('nrg.select.defaultText', {});
    return this.args.defaultText ?? baseDefaultText;
  }

  get scrollable() {
    return this.args.scrollable ?? true;
  }

  get isOpen() {
    return this._isOpen && !this.disabled && !!this.internalOptions.length;
  }

  get selected(): Optional<SelectOption<T>> {
    const found = this.internalOptions.find(
      (option) => option.value === this.value,
    );
    return found || null;
  }

  set selected(option: SelectOption<T>) {
    this.onChange(option.value);
  }

  get hasSelected() {
    return !!this.selected;
  }

  @cached
  get internalOptions(): SelectOption<T>[] {
    if (!this.args.options) {
      return [];
    }
    return this.args.options.map((option) => {
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

  get disabled() {
    return this.args.disabled || this.args.loading;
  }

  selectItemBySearch() {
    const searchBuffer = this.internalSearchBuffer;
    if (searchBuffer.length === 0) {
      return;
    }

    const childElements = Array.from(
      this.menuElement?.querySelectorAll(`li`) ?? [],
    );
    for (const stringIndex in childElements) {
      const index = parseInt(stringIndex);
      const element = childElements[index];
      if (!element) {
        continue;
      }
      const text = element.textContent?.toLowerCase() ?? '';
      const splitText = text.split(' ') ?? [];
      for (const text of splitText) {
        if (text.startsWith(searchBuffer)) {
          this.activeItem = index;
          this.scrollActiveItemIntoView();
          return true;
        }
      }
    }
    return false;
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

  @action
  onSelectInternal(option: SelectOption<T>, evt?: MouseEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();
    this.onBlur();
    this.selected = option;
  }

  @action
  onInsert(element: HTMLElement) {
    this.menuElement = element;
  }

  @action
  toggleSelect(evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.disabled) {
      return;
    }
    if (this.isOpen) {
      this.onBlur();
    } else {
      this.onFocus();
    }
  }

  @action
  onFocus() {
    const currentlySelectedIndex = this.internalOptions.findIndex(
      (option) => option.value === this.value,
    );
    if (currentlySelectedIndex > -1) {
      this.activeItem = currentlySelectedIndex;
      runTask(this, () => {
        this.scrollActiveItemIntoView();
      });
    }

    this._isOpen = true;
  }

  @action
  onBlur() {
    this.activeItem = -1;
    this._isOpen = false;
  }

  @action
  onKeyboardInput(evt: KeyboardEvent) {
    if (!this._isOpen) {
      return;
    }
    const key = evt.key.toLowerCase();
    const isSingleChar = key.length === 1;
    const isLetter = 'a' <= key && key <= 'z';
    const isNumber = '0' <= key && key <= '9';
    const isAlphaNumeric = (isLetter || isNumber) && isSingleChar;
    if (!isAlphaNumeric) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    this.internalSearchBuffer += key;
    const foundItem = this.selectItemBySearch();
    if (!foundItem && this.internalSearchBuffer.length > 1) {
      this.internalSearchBuffer = key;
      this.selectItemBySearch();
    }
  }

  @action
  moveUp(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this._isOpen) {
      return;
    }
    this.internalSearchBuffer = '';
    if (this.activeItem > 0) {
      this.activeItem--;
      this.scrollActiveItemIntoView();
    }
  }

  @action
  moveDown(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this._isOpen) {
      return;
    }
    this.internalSearchBuffer = '';
    if (this.activeItem < this.internalOptions.length - 1) {
      this.activeItem++;
      this.scrollActiveItemIntoView();
    }
  }

  @action
  enterKeyHandler(evt?: KeyboardEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();
    this.internalSearchBuffer = '';
    if (!this._isOpen) {
      this.onFocus();
      return;
    }

    const optionsLength = this.internalOptions.length;
    const validRange = this.activeItem >= 0 && this.activeItem < optionsLength;
    if (validRange) {
      const option = this.internalOptions[this.activeItem];
      if (option != undefined) {
        this.onSelectInternal(option);
        return;
      }
    }
    this.onBlur();
  }

  @action
  exitKeyHandler(evt?: KeyboardEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();
    if (!this._isOpen) {
      return;
    }
    this.internalSearchBuffer = '';
    this.onBlur();
  }

  <template>
    <button
      class={{this.classList}}
      id={{@id}}
      type="button"
      role="combobox"
      disabled={{this.disabled}}
      aria-controls={{this.menuId}}
      aria-describedby={{@describedBy}}
      aria-expanded={{this._isOpen}}
      aria-haspopup="listbox"
      {{on "click" this.toggleSelect}}
      {{on "blur" this.onBlur}}
      {{on "keydown" this.onKeyboardInput}}
      {{onKey "ArrowUp" this.moveUp onlyWhenFocused=true}}
      {{onKey "ArrowDown" this.moveDown onlyWhenFocused=true}}
      {{onKey "Enter" this.enterKeyHandler onlyWhenFocused=true}}
      {{onKey "Space" this.enterKeyHandler onlyWhenFocused=true}}
      {{onKey "NumpadEnter" this.enterKeyHandler onlyWhenFocused=true}}
      {{onKey "Tab" this.exitKeyHandler onlyWhenFocused=true}}
      {{onKey "Escape" this.exitKeyHandler onlyWhenFocused=true}}
      ...attributes
    >
      <span class="selected-display">
        {{#if this.hasSelected}}
          {{#if (has-block "display")}}
            {{yield this.selected.raw to="display"}}
          {{else if (has-block "option")}}
            {{yield this.selected.raw to="option"}}
          {{else}}
            {{this.selected.label}}
          {{/if}}
        {{else}}
          {{#if (has-block "empty")}}
            {{yield to="empty"}}
          {{else}}
            {{this.defaultText}}
          {{/if}}
        {{/if}}
      </span>

      {{#if @loading}}
        <span
          class="spinner-border spinner-border-sm float-end m-1"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden" role="status">
          {{t "nrg.base.loading"}}
        </span>
      {{else}}
        <i class="bi {{this.caretIcon}} float-end m-1" />
      {{/if}}
      <ul
        id={{this.menuId}}
        class="dropdown-menu {{if this.isOpen 'show'}}"
        role="listbox"
        {{onInsert this.onInsert}}
      >
        {{#each this.internalOptions as |option i|}}
          <SelectItem
            @optionIndex={{i}}
            @activeIndex={{this.activeItem}}
            @currentValue={{this.value}}
            @option={{option}}
            {{on "click" (fn this.onSelectInternal option)}}
          >
            {{#if (has-block "option")}}
              {{yield option.raw to="option"}}
            {{else}}
              {{option.label}}
            {{/if}}
          </SelectItem>
        {{/each}}
      </ul>
    </button>
  </template>
}

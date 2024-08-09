import { action } from '@ember/object';
import Component from '@glimmer/component';

// @ts-expect-error Glimmer doesn't currently ship a type for the `cached` decorator
// https://github.com/glimmerjs/glimmer.js/issues/408
import { tracked, cached } from '@glimmer/tracking';

// @ts-expect-error Ember keyboard doesn't currently ship a type for the `on-key` modifier
import onKey from 'ember-keyboard/modifiers/on-key';

import { on } from '@ember/modifier';
import BoundValue from './bound-value.ts';
import { fn } from '@ember/helper';
import { get } from '@ember/object';

import type { Optional } from '../../types.d.ts';
import { runTask } from 'ember-lifeline';

declare type SelectOption<T> = {
  label: string;
  value: string | T;
  raw: T;
};

export interface SelectSignature<T> {
  Args: {
    disabled?: boolean;
    loading?: boolean;
    scrollable?: boolean;
    defaultText?: string;
    options: T[];
    displayPath?: string;
    serializationPath?: string | null;
  };
  Blocks: {
    display?: [T | undefined];
    option?: [T | undefined];
    empty?: [];
  };
  Element: HTMLButtonElement;
}

const baseDefaultText = 'Select an Option'; // TODO i18n

export default class Select<T> extends BoundValue<
  SelectSignature<T>,
  string | T
> {
  get classList() {
    let classes = ['dropdown', 'form-control', 'text-start', 'focus-ring'];

    if (this.scrollable) {
      classes.push('scrollable');
    }

    return classes.join(' ');
  }

  get caretIcon() {
    return this.isOpen ? 'bi-caret-up' : 'bi-caret-down-fill';
  }

  get defaultText() {
    return this.args.defaultText ?? baseDefaultText;
  }

  get scrollable() {
    return this.args.scrollable ?? true;
  }

  @tracked
  menuId = crypto.randomUUID();

  @tracked
  isOpen = false;

  @action
  onSelectInternal(option: SelectOption<T>, evt?: MouseEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();
    this.onBlur();
    this.selected = option;
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
      // null valuePath results in value being the raw option
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
      runTask(
        this,
        () => {
          this.scrollActiveItemIntoView();
        },
        0,
      );
    }

    this.isOpen = true;
  }

  @action
  onBlur() {
    this.activeItem = -1;
    this.isOpen = false;
  }

  get disabled() {
    return this.args.disabled || this.args.loading;
  }

  @tracked
  activeItem = -1;

  scrollActiveItemIntoView() {
    if (this.activeItem == -1) {
      return;
    }
    const childElements = Array.from(
      document.querySelectorAll(`#${CSS.escape(this.menuId)} > li`),
    );
    const activeElement = childElements[this.activeItem];
    if (!activeElement) {
      return;
    }
    activeElement.scrollIntoView({ block: 'nearest' });
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
    if (this.activeItem < this.internalOptions.length - 1) {
      this.activeItem++;
      this.scrollActiveItemIntoView();
    }
  }

  @action
  enterKeyHandler(evt?: KeyboardEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();
    if (!this.isOpen) {
      this.onFocus();
    } else {
      this.exitKeyHandler();
    }
  }

  @action
  exitKeyHandler(evt?: KeyboardEvent) {
    const optionsLength = this.internalOptions.length;
    const validRange = this.activeItem >= 0 && this.activeItem < optionsLength;
    evt?.preventDefault();
    evt?.stopPropagation();
    if (validRange) {
      const option = this.internalOptions[this.activeItem];
      if (option != undefined) {
        this.onSelectInternal(option);
        return;
      }
    }
    this.onBlur();
  }

  <template>
      <button
        class={{this.classList}}
        role="combobox"
        disabled={{this.disabled}}
        aria-controls={{this.menuId}}
        aria-expanded={{this.isOpen}}
        aria-haspopup="listbox"
        {{on "click" this.toggleSelect}}
      {{on "blur" this.onBlur}}
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
          <span class="visually-hidden" role="status">Loading...</span>
        {{else}}
          <i class="bi {{this.caretIcon}} float-end m-1" />
        {{/if}}
        <ul
          id={{this.menuId}}
          class="dropdown-menu {{if this.isOpen 'show'}}"
          role="listbox"
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
    let classes = ['dropdown-item'];

    const useIndexActive = this.args.activeIndex != -1;
    const isCurrentIndex = this.args.optionIndex === this.args.activeIndex;
    const isCurrentValue = this.args.option.value === this.args.currentValue;

    if (useIndexActive && isCurrentIndex) {
      classes.push('active');
    }

    if (!useIndexActive && isCurrentValue) {
      classes.push('active');
    }

    return classes.join(' ');
  }

  <template>
    <li class={{this.classList}} role="option" ...attributes>
      {{yield}}
    </li>
  </template>
}

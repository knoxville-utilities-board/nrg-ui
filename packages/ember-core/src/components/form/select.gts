import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import { isEqual } from '@ember/utils';
import { cached, tracked } from '@glimmer/tracking';
import { t, tKey } from 'ember-intl';
// @ts-expect-error Ember keyboard doesn't currently ship a type for the `on-key` modifier
// https://github.com/adopted-ember-addons/ember-keyboard/issues/464
import onKey from 'ember-keyboard/modifiers/on-key';
import { runTask } from 'ember-lifeline';

import Dropdown from '../dropdown.gts';
import BoundValue from './bound-value.ts';
import onInsert from '../../modifiers/on-insert.ts';
import { collapseWhitespace } from '../../utils/string.ts';

import type { BoundValueSignature, DropdownSignature, Optional } from '../../index.ts';
import type { Direction, PopoverVisibility } from '../popover.gts';
import type { FieldOptions } from './field.gts';
import type IntlService from 'ember-intl/services/intl';

declare type SelectOption<T> = {
  label: string;
  value: T;
  raw: T;
};

function isActive<T>(
  activeIndex: number,
  optionIndex: number,
  currentValue: T,
  option: SelectOption<T>,
) {
  const useIndexActive = activeIndex != -1;
  const isCurrentIndex = optionIndex === activeIndex;
  const isCurrentValue = isEqual(option.value, currentValue);

  return (useIndexActive && isCurrentIndex) || (!useIndexActive && isCurrentValue);
}

export type SelectSignature<T> = BoundValueSignature<
  {
    Args: {
      closeOnSelect?: boolean;
      defaultText?: string;
      defaultTextKey?: string;
      displayPath?: string;
      loading?: boolean;
      noOptionsText?: string;
      noOptionsTextKey?: string;
      options?: readonly T[];
      scrollable?: boolean;
      serializationPath?: string | null;
      side?: Direction;

      fieldOptions?: FieldOptions;
    };
    Blocks: {
      control?: [PopoverVisibility];
      display?: [T | undefined];
      option?: [T | undefined];
      empty?: [];
      menu?: DropdownSignature['Blocks']['menu'];
    };
    Element: HTMLButtonElement;
  },
  T
>;

export default class Select<T> extends BoundValue<SelectSignature<T>, T> {
  declare visibility: PopoverVisibility;

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

    if (this.args.fieldOptions?.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.fieldOptions?.isWarning) {
      classes.push('is-warning');
    }

    return classes.join(' ');
  }

  get caretIcon() {
    return this.isOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill';
  }

  get defaultText() {
    return (
      this.args.defaultText ??
      this.intl.t(this.args.defaultTextKey ?? tKey('nrg.select.defaultText'))
    );
  }

  get scrollable() {
    return this.args.scrollable ?? true;
  }

  get isOpen() {
    return this.visibility?.isShown && !this.disabled && !!this.internalOptions.length;
  }

  get selected(): Optional<SelectOption<T>> {
    const found = this.internalOptions.find((option) => option.value === this.value);
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
          value: option,
        };
      }

      const label = get(option, this.args.displayPath ?? 'label') as string;
      let value: T = option;
      // null serializationPath results in value being the raw option
      if (this.args.serializationPath !== null) {
        value = get(option, this.args.serializationPath ?? 'value') as T;
      }
      return {
        raw: option,
        label,
        value,
      };
    });
  }

  get disabled() {
    return this.args.fieldOptions?.disabled || this.args.loading;
  }

  get noOptionsText() {
    return (
      this.args.noOptionsText ??
      this.intl.t(this.args.noOptionsTextKey ?? tKey('nrg.select.noOptions'))
    );
  }

  selectItemBySearch() {
    const searchBuffer = this.internalSearchBuffer;
    if (searchBuffer.length === 0) {
      return;
    }

    const childElements = Array.from(this.menuElement?.querySelectorAll(`li`) ?? []);
    for (const stringIndex in childElements) {
      const index = parseInt(stringIndex);
      const element = childElements[index];
      if (!element) {
        continue;
      }
      const text = element.textContent?.toLowerCase() ?? '';
      const splitText = collapseWhitespace(text).split(' ') ?? [];
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
    const childElements = Array.from(this.menuElement?.querySelectorAll(`li`) ?? []);
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
      this.onFocus(evt);
    }
  }

  @action
  onFocus(evt: Event) {
    const currentlySelectedIndex = this.internalOptions.findIndex(
      (option) => option.value === this.value,
    );
    if (currentlySelectedIndex > -1) {
      this.activeItem = currentlySelectedIndex;
      runTask(this, () => {
        this.scrollActiveItemIntoView();
      });
    }

    this.visibility.show(evt);
  }

  @action
  onBlur() {
    this.activeItem = -1;
    this.internalSearchBuffer = '';
    this.visibility.hide();
  }

  @action
  onKeyboardInput(evt: KeyboardEvent) {
    if (!this.visibility.isShown) {
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
    if (!this.visibility.isShown) {
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
    if (!this.visibility.isShown) {
      return;
    }
    this.internalSearchBuffer = '';
    if (this.activeItem < this.internalOptions.length - 1) {
      this.activeItem++;
      this.scrollActiveItemIntoView();
    }
  }

  @action
  enterKeyHandler(evt: KeyboardEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();
    this.internalSearchBuffer = '';
    if (!this.visibility.isShown) {
      this.onFocus(evt);
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
    if (!this.visibility.isShown) {
      return;
    }
    this.internalSearchBuffer = '';
    this.onBlur();
  }

  @action
  saveVisibility(visibility: PopoverVisibility) {
    this.visibility = visibility;
  }

  <template>
    <Dropdown
      @closeOnSelect={{@closeOnSelect}}
      @fullWidth={{true}}
      @scrollable={{this.scrollable}}
      @side={{@side}}
      @onHide={{this.onBlur}}
      {{on "blur" this.onBlur}}
      {{onInsert this.onInsert}}
    >
      <:control as |visibility|>
        {{#if (has-block-params "control")}}
          {{yield visibility to="control"}}
        {{else}}
          <button
            class={{this.classList}}
            id={{@fieldOptions.id}}
            type="button"
            role="combobox"
            disabled={{this.disabled}}
            aria-controls={{this.menuId}}
            aria-describedby={{@fieldOptions.describedBy}}
            aria-expanded={{visibility.isShown}}
            aria-haspopup="listbox"
            {{on "click" this.toggleSelect}}
            {{on "keydown" this.onKeyboardInput}}
            {{onInsert (fn this.saveVisibility visibility)}}
            {{onKey "ArrowUp" this.moveUp onlyWhenFocused=true}}
            {{onKey "ArrowDown" this.moveDown onlyWhenFocused=true}}
            {{onKey "Enter" this.enterKeyHandler onlyWhenFocused=true}}
            {{onKey "Space" this.enterKeyHandler onlyWhenFocused=true}}
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
            {{! @glint-expect-error - If there are no block params, we don't need to yield anything to the block }}
            {{yield to="control"}}
            {{#if @loading}}
              <span
                class="spinner-border spinner-border-sm float-end m-1"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden" role="status">
                {{t "nrg.base.loading"}}
              </span>
            {{else}}
              <i class="bi {{this.caretIcon}} float-end mx-1" />
            {{/if}}
          </button>
        {{/if}}
      </:control>
      <:menu as |Menu|>
        {{#each this.internalOptions as |option i|}}
          {{#let (isActive this.activeItem i this.value option) as |isActive|}}
            <Menu.Item
              aria-selected={{isActive}}
              class={{if isActive "active"}}
              @onSelect={{fn this.onSelectInternal option}}
            >
              {{#if (has-block "option")}}
                {{yield option.raw to="option"}}
              {{else}}
                {{option.label}}
              {{/if}}
            </Menu.Item>
          {{/let}}
        {{else}}
          <Menu.Item aria-disabled={{true}} @disabled={{true}}>
            {{this.noOptionsText}}
          </Menu.Item>
        {{/each}}
        {{yield Menu to="menu"}}
      </:menu>
    </Dropdown>
  </template>
}

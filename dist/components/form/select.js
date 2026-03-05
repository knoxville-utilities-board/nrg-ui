import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { get, action } from '@ember/object';
import { service } from '@ember/service';
import { isEqual } from '@ember/utils';
import { tracked, cached } from '@glimmer/tracking';
import { tKey, t } from 'ember-intl';
import onKey from 'ember-keyboard/modifiers/on-key';
import { runTask } from 'ember-lifeline';
import Dropdown from '../dropdown.js';
import BoundValue from './bound-value.js';
import OnInsertModifier from '../../modifiers/on-insert.js';
import { collapseWhitespace } from '../../utils/string.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

function isActive(activeIndex, optionIndex, currentValue, option) {
  const useIndexActive = activeIndex != -1;
  const isCurrentIndex = optionIndex === activeIndex;
  const isCurrentValue = isEqual(option.value, currentValue);
  return useIndexActive && isCurrentIndex || !useIndexActive && isCurrentValue;
}
class Select extends BoundValue {
  static {
    g(this.prototype, "menuId", [tracked], function () {
      return crypto.randomUUID();
    });
  }
  #menuId = (i(this, "menuId"), void 0);
  static {
    g(this.prototype, "menuElement", [tracked], function () {
      return null;
    });
  }
  #menuElement = (i(this, "menuElement"), void 0);
  static {
    g(this.prototype, "activeItem", [tracked], function () {
      return -1;
    });
  }
  #activeItem = (i(this, "activeItem"), void 0);
  static {
    g(this.prototype, "internalSearchBuffer", [tracked], function () {
      return '';
    });
  }
  #internalSearchBuffer = (i(this, "internalSearchBuffer"), void 0);
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), void 0);
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
    return this.args.defaultText ?? this.intl.t(this.args.defaultTextKey ?? tKey('nrg.select.defaultText'));
  }
  get scrollable() {
    return this.args.scrollable ?? true;
  }
  get isOpen() {
    return this.visibility?.isShown && !this.disabled && !!this.internalOptions.length;
  }
  get selected() {
    const found = this.internalOptions.find(option => option.value === this.value);
    return found || null;
  }
  set selected(option) {
    this.onChange(option.value);
  }
  get hasSelected() {
    return !!this.selected;
  }
  get internalOptions() {
    if (!this.args.options) {
      return [];
    }
    return this.args.options.map(option => {
      if (typeof option !== 'object') {
        return {
          raw: option,
          label: option,
          value: option
        };
      }
      const label = get(option, this.args.displayPath ?? 'label');
      let value = option;
      // null serializationPath results in value being the raw option
      if (this.args.serializationPath !== null) {
        value = get(option, this.args.serializationPath ?? 'value');
      }
      return {
        raw: option,
        label,
        value
      };
    });
  }
  static {
    n(this.prototype, "internalOptions", [cached]);
  }
  get disabled() {
    return this.args.fieldOptions?.disabled || this.args.loading;
  }
  get noOptionsText() {
    return this.args.noOptionsText ?? this.intl.t(this.args.noOptionsTextKey ?? tKey('nrg.select.noOptions'));
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
    activeElement.scrollIntoView({
      block: 'nearest'
    });
  }
  onSelectInternal(option, evt) {
    evt?.preventDefault();
    evt?.stopPropagation();
    this.selected = option;
  }
  static {
    n(this.prototype, "onSelectInternal", [action]);
  }
  onInsert(element) {
    this.menuElement = element;
  }
  static {
    n(this.prototype, "onInsert", [action]);
  }
  toggleSelect(evt) {
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
  static {
    n(this.prototype, "toggleSelect", [action]);
  }
  onFocus(evt) {
    const currentlySelectedIndex = this.internalOptions.findIndex(option => option.value === this.value);
    if (currentlySelectedIndex > -1) {
      this.activeItem = currentlySelectedIndex;
      runTask(this, () => {
        this.scrollActiveItemIntoView();
      });
    }
    this.visibility.show(evt);
  }
  static {
    n(this.prototype, "onFocus", [action]);
  }
  onBlur() {
    this.activeItem = -1;
    this.internalSearchBuffer = '';
    this.visibility.hide();
  }
  static {
    n(this.prototype, "onBlur", [action]);
  }
  onKeyboardInput(evt) {
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
  static {
    n(this.prototype, "onKeyboardInput", [action]);
  }
  moveUp(evt) {
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
  static {
    n(this.prototype, "moveUp", [action]);
  }
  moveDown(evt) {
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
  static {
    n(this.prototype, "moveDown", [action]);
  }
  enterKeyHandler(evt) {
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
  static {
    n(this.prototype, "enterKeyHandler", [action]);
  }
  exitKeyHandler(evt) {
    evt?.preventDefault();
    evt?.stopPropagation();
    if (!this.visibility.isShown) {
      return;
    }
    this.internalSearchBuffer = '';
    this.onBlur();
  }
  static {
    n(this.prototype, "exitKeyHandler", [action]);
  }
  saveVisibility(visibility) {
    this.visibility = visibility;
  }
  static {
    n(this.prototype, "saveVisibility", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<Dropdown @closeOnSelect={{@closeOnSelect}} @fullWidth={{true}} @scrollable={{this.scrollable}} @side={{@side}} @onHide={{this.onBlur}} {{on \"blur\" this.onBlur}} {{onInsert this.onInsert}}>\n  <:control as |visibility|>\n    {{#if (has-block-params \"control\")}}\n      {{yield visibility to=\"control\"}}\n    {{else}}\n      <button class={{this.classList}} id={{@fieldOptions.id}} type=\"button\" role=\"combobox\" disabled={{this.disabled}} aria-controls={{this.menuId}} aria-describedby={{@fieldOptions.describedBy}} aria-expanded={{visibility.isShown}} aria-haspopup=\"listbox\" {{on \"click\" this.toggleSelect}} {{on \"keydown\" this.onKeyboardInput}} {{onInsert (fn this.saveVisibility visibility)}} {{onKey \"ArrowUp\" this.moveUp onlyWhenFocused=true}} {{onKey \"ArrowDown\" this.moveDown onlyWhenFocused=true}} {{onKey \"Enter\" this.enterKeyHandler onlyWhenFocused=true}} {{onKey \"Space\" this.enterKeyHandler onlyWhenFocused=true}} {{onKey \"Tab\" this.exitKeyHandler onlyWhenFocused=true}} {{onKey \"Escape\" this.exitKeyHandler onlyWhenFocused=true}} ...attributes>\n        <span class=\"selected-display\">\n          {{#if this.hasSelected}}\n            {{#if (has-block \"display\")}}\n              {{yield this.selected.raw to=\"display\"}}\n            {{else if (has-block \"option\")}}\n              {{yield this.selected.raw to=\"option\"}}\n            {{else}}\n              {{this.selected.label}}\n            {{/if}}\n          {{else}}\n            {{#if (has-block \"empty\")}}\n              {{yield to=\"empty\"}}\n            {{else}}\n              {{this.defaultText}}\n            {{/if}}\n          {{/if}}\n        </span>\n        {{!-- @glint-expect-error - If there are no block params, we don't need to yield anything to the block --}}\n        {{yield to=\"control\"}}\n        {{#if @loading}}\n          <span class=\"spinner-border spinner-border-sm float-end m-1\" aria-hidden=\"true\"></span>\n          <span class=\"visually-hidden\" role=\"status\">\n            {{t \"nrg.base.loading\"}}\n          </span>\n        {{else}}\n          <i class=\"bi {{this.caretIcon}} float-end mx-1\" />\n        {{/if}}\n      </button>\n    {{/if}}\n  </:control>\n  <:menu as |Menu|>\n    {{#each this.internalOptions as |option i|}}\n      {{#let (isActive this.activeItem i this.value option) as |isActive|}}\n        <Menu.Item aria-selected={{isActive}} class={{if isActive \"active\"}} @onSelect={{fn this.onSelectInternal option}}>\n          {{#if (has-block \"option\")}}\n            {{yield option.raw to=\"option\"}}\n          {{else}}\n            {{option.label}}\n          {{/if}}\n        </Menu.Item>\n      {{/let}}\n    {{else}}\n      <Menu.Item aria-disabled={{true}} @disabled={{true}}>\n        {{this.noOptionsText}}\n      </Menu.Item>\n    {{/each}}\n    {{yield Menu to=\"menu\"}}\n  </:menu>\n</Dropdown>", {
      strictMode: true,
      scope: () => ({
        Dropdown,
        on,
        onInsert: OnInsertModifier,
        fn,
        onKey,
        t,
        isActive
      })
    }), this);
  }
}

export { Select as default };
//# sourceMappingURL=select.js.map

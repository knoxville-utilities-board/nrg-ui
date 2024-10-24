import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { get, action } from '@ember/object';
import { service } from '@ember/service';
import { isEqual } from '@ember/utils';
import Component from '@glimmer/component';
import { tracked, cached } from '@glimmer/tracking';
import { t } from 'ember-intl';
import onKey from 'ember-keyboard/modifiers/on-key';
import { runTask } from 'ember-lifeline';
import BoundValue from './bound-value.js';
import OnInsertModifier from '../../modifiers/did-insert.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

let SelectItem = class SelectItem extends Component {
  get classList() {
    const classes1 = ['dropdown-item'];
    const useIndexActive1 = this.args.activeIndex != -1;
    const isCurrentIndex1 = this.args.optionIndex === this.args.activeIndex;
    const isCurrentValue1 = isEqual(this.args.option.value, this.args.currentValue);
    if (useIndexActive1 && isCurrentIndex1) {
      classes1.push('active');
    }
    if (!useIndexActive1 && isCurrentValue1) {
      classes1.push('active');
    }
    return classes1.join(' ');
  }
  get isActive() {
    return isEqual(this.args.option.value, this.args.currentValue);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <li class={{this.classList}} role=\"option\" aria-selected={{this.isActive}} ...attributes>\n      {{yield}}\n    </li>\n  ", {
      strictMode: true
    }), this);
  }
};
class Select extends BoundValue {
  static {
    g(this.prototype, "_isOpen", [tracked], function () {
      return false;
    });
  }
  #_isOpen = (i(this, "_isOpen"), void 0);
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
    const classes1 = ['dropdown', 'form-control', 'text-start', 'focus-ring'];
    if (this.scrollable) {
      classes1.push('scrollable');
    }
    if (this.args.isInvalid) {
      classes1.push('is-invalid');
    } else if (this.args.isWarning) {
      classes1.push('is-warning');
    }
    return classes1.join(' ');
  }
  get caretIcon() {
    return this.isOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill';
  }
  get defaultText() {
    const baseDefaultText1 = this.intl.t('nrg.select.defaultText', {});
    return this.args.defaultText ?? baseDefaultText1;
  }
  get scrollable() {
    return this.args.scrollable ?? true;
  }
  get isOpen() {
    return this._isOpen && !this.disabled && !!this.internalOptions.length;
  }
  get selected() {
    const found1 = this.internalOptions.find(option1 => option1.value === this.value);
    return found1 || null;
  }
  set selected(option1) {
    this.onChange(option1.value);
  }
  get hasSelected() {
    return !!this.selected;
  }
  get internalOptions() {
    if (!this.args.options) {
      return [];
    }
    return this.args.options.map(option1 => {
      if (typeof option1 !== 'object') {
        return {
          raw: option1,
          label: option1,
          value: option1
        };
      }
      const label1 = get(option1, this.args.displayPath ?? 'label');
      let value1 = option1;
      // null serializationPath results in value being the raw option
      if (this.args.serializationPath !== null) {
        value1 = get(option1, this.args.serializationPath ?? 'value');
      }
      return {
        raw: option1,
        label: label1,
        value: value1
      };
    });
  }
  static {
    n(this.prototype, "internalOptions", [cached]);
  }
  get disabled() {
    return this.args.disabled || this.args.loading;
  }
  selectItemBySearch() {
    const searchBuffer1 = this.internalSearchBuffer;
    if (searchBuffer1.length === 0) {
      return;
    }
    const childElements1 = Array.from(this.menuElement?.querySelectorAll(`li`) ?? []);
    for (const stringIndex1 in childElements1) {
      const index1 = parseInt(stringIndex1);
      const element1 = childElements1[index1];
      if (!element1) {
        continue;
      }
      const text1 = element1.textContent?.toLowerCase() ?? '';
      const splitText1 = text1.split(' ') ?? [];
      for (const text1 of splitText1) {
        if (text1.startsWith(searchBuffer1)) {
          this.activeItem = index1;
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
    const childElements1 = Array.from(this.menuElement?.querySelectorAll(`li`) ?? []);
    const activeElement1 = childElements1[this.activeItem];
    if (!activeElement1) {
      return;
    }
    activeElement1.scrollIntoView({
      block: 'nearest'
    });
  }
  onSelectInternal(option1, evt1) {
    evt1?.preventDefault();
    evt1?.stopPropagation();
    this.onBlur();
    this.selected = option1;
  }
  static {
    n(this.prototype, "onSelectInternal", [action]);
  }
  onInsert(element1) {
    this.menuElement = element1;
  }
  static {
    n(this.prototype, "onInsert", [action]);
  }
  toggleSelect(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (this.disabled) {
      return;
    }
    if (this.isOpen) {
      this.onBlur();
    } else {
      this.onFocus();
    }
  }
  static {
    n(this.prototype, "toggleSelect", [action]);
  }
  onFocus() {
    const currentlySelectedIndex1 = this.internalOptions.findIndex(option1 => option1.value === this.value);
    if (currentlySelectedIndex1 > -1) {
      this.activeItem = currentlySelectedIndex1;
      runTask(this, () => {
        this.scrollActiveItemIntoView();
      });
    }
    this._isOpen = true;
  }
  static {
    n(this.prototype, "onFocus", [action]);
  }
  onBlur() {
    this.activeItem = -1;
    this._isOpen = false;
  }
  static {
    n(this.prototype, "onBlur", [action]);
  }
  onKeyboardInput(evt1) {
    if (!this._isOpen) {
      return;
    }
    const key1 = evt1.key.toLowerCase();
    const isSingleChar1 = key1.length === 1;
    const isLetter1 = 'a' <= key1 && key1 <= 'z';
    const isNumber1 = '0' <= key1 && key1 <= '9';
    const isAlphaNumeric1 = (isLetter1 || isNumber1) && isSingleChar1;
    if (!isAlphaNumeric1) {
      return;
    }
    evt1.preventDefault();
    evt1.stopPropagation();
    this.internalSearchBuffer += key1;
    const foundItem1 = this.selectItemBySearch();
    if (!foundItem1 && this.internalSearchBuffer.length > 1) {
      this.internalSearchBuffer = key1;
      this.selectItemBySearch();
    }
  }
  static {
    n(this.prototype, "onKeyboardInput", [action]);
  }
  moveUp(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (!this._isOpen) {
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
  moveDown(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (!this._isOpen) {
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
  enterKeyHandler(evt1) {
    evt1?.preventDefault();
    evt1?.stopPropagation();
    this.internalSearchBuffer = '';
    if (!this._isOpen) {
      this.onFocus();
      return;
    }
    const optionsLength1 = this.internalOptions.length;
    const validRange1 = this.activeItem >= 0 && this.activeItem < optionsLength1;
    if (validRange1) {
      const option1 = this.internalOptions[this.activeItem];
      if (option1 != undefined) {
        this.onSelectInternal(option1);
        return;
      }
    }
    this.onBlur();
  }
  static {
    n(this.prototype, "enterKeyHandler", [action]);
  }
  exitKeyHandler(evt1) {
    evt1?.preventDefault();
    evt1?.stopPropagation();
    if (!this._isOpen) {
      return;
    }
    this.internalSearchBuffer = '';
    this.onBlur();
  }
  static {
    n(this.prototype, "exitKeyHandler", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <button class={{this.classList}} id={{@id}} type=\"button\" role=\"combobox\" disabled={{this.disabled}} aria-controls={{this.menuId}} aria-describedby={{@describedBy}} aria-expanded={{this._isOpen}} aria-haspopup=\"listbox\" {{on \"click\" this.toggleSelect}} {{on \"blur\" this.onBlur}} {{on \"keydown\" this.onKeyboardInput}} {{onKey \"ArrowUp\" this.moveUp onlyWhenFocused=true}} {{onKey \"ArrowDown\" this.moveDown onlyWhenFocused=true}} {{onKey \"Enter\" this.enterKeyHandler onlyWhenFocused=true}} {{onKey \"Space\" this.enterKeyHandler onlyWhenFocused=true}} {{onKey \"NumpadEnter\" this.enterKeyHandler onlyWhenFocused=true}} {{onKey \"Tab\" this.exitKeyHandler onlyWhenFocused=true}} {{onKey \"Escape\" this.exitKeyHandler onlyWhenFocused=true}} ...attributes>\n      <span class=\"selected-display\">\n        {{#if this.hasSelected}}\n          {{#if (has-block \"display\")}}\n            {{yield this.selected.raw to=\"display\"}}\n          {{else if (has-block \"option\")}}\n            {{yield this.selected.raw to=\"option\"}}\n          {{else}}\n            {{this.selected.label}}\n          {{/if}}\n        {{else}}\n          {{#if (has-block \"empty\")}}\n            {{yield to=\"empty\"}}\n          {{else}}\n            {{this.defaultText}}\n          {{/if}}\n        {{/if}}\n      </span>\n\n      {{#if @loading}}\n        <span class=\"spinner-border spinner-border-sm float-end m-1\" aria-hidden=\"true\"></span>\n        <span class=\"visually-hidden\" role=\"status\">\n          {{t \"nrg.base.loading\"}}\n        </span>\n      {{else}}\n        <i class=\"bi {{this.caretIcon}} float-end m-1\" />\n      {{/if}}\n      <ul id={{this.menuId}} class=\"dropdown-menu {{if this.isOpen \"show\"}}\" role=\"listbox\" {{onInsert this.onInsert}}>\n        {{#each this.internalOptions as |option i|}}\n          <SelectItem @optionIndex={{i}} @activeIndex={{this.activeItem}} @currentValue={{this.value}} @option={{option}} {{on \"click\" (fn this.onSelectInternal option)}}>\n            {{#if (has-block \"option\")}}\n              {{yield option.raw to=\"option\"}}\n            {{else}}\n              {{option.label}}\n            {{/if}}\n          </SelectItem>\n        {{/each}}\n      </ul>\n    </button>\n  ", {
      strictMode: true,
      scope: () => ({
        on,
        onKey,
        t,
        onInsert: OnInsertModifier,
        SelectItem,
        fn
      })
    }), this);
  }
}

export { Select as default };
//# sourceMappingURL=select.js.map

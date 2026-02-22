import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { hash, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { get, action } from '@ember/object';
import { service } from '@ember/service';
import { macroCondition, isTesting } from '@embroider/macros';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { t } from 'ember-intl';
import onKey from 'ember-keyboard/modifiers/on-key';
import { eq } from 'ember-truth-helpers';
import Dropdown from '../dropdown.js';
import TextInput from './text-input.js';
import BoundValue from './bound-value.js';
import { bind } from '../../helpers/bind.js';
import { classes } from '../../helpers/classes.js';
import OnInsertModifier from '../../modifiers/on-insert.js';
import Button from '../button.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

class Search extends BoundValue {
  self = this;
  static {
    g(this.prototype, "activeIndex", [tracked], function () {
      return -1;
    });
  }
  #activeIndex = (i(this, "activeIndex"), void 0);
  static {
    g(this.prototype, "options", [tracked], function () {
      return [];
    });
  }
  #options = (i(this, "options"), void 0);
  static {
    g(this.prototype, "searchString", [tracked], function () {
      return '';
    });
  }
  #searchString = (i(this, "searchString"), void 0);
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), void 0);
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
    if (macroCondition(isTesting())) {
      return 0;
    }
    return this.args.searchTimeout ?? 300;
  }
  get canPerformSearch() {
    return this.searchString.trim().length >= this.minCharacters;
  }
  get inputClassList() {
    const classes = ['form-control'];
    if (this.args.basic) {
      classes[0] += '-plaintext';
    }
    if (this.args.fieldOptions?.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.fieldOptions?.isWarning) {
      classes.push('is-warning');
    }
    return classes.join(' ');
  }
  get displayValue() {
    const {
      value
    } = this;
    const isStringValue = typeof value === 'string';
    const isStringOption = typeof this.selectedOption?.value === 'string';
    if (!value) {
      return '';
    }
    if (isStringValue || isStringOption && (!this.internalOptions.length || this.query.isRunning)) {
      return value;
    }
    if (this.args.serializationPath === null) {
      return get(value, this.args.displayPath ?? 'label');
    }
    if (this.selectedOption) {
      return this.selectedOption.label;
    }
    return '';
  }
  get internalOptions() {
    return this.options.map(option => {
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
  get selectedOption() {
    const found = this.internalOptions.find(option => option.value === this.value);
    return found || null;
  }
  set selectedOption(option) {
    this.onChange(option.value);
  }
  get isInputElementActive() {
    return this.inputElement === document.activeElement;
  }
  get inputValue() {
    return this.isInputElementActive ? this.searchString : this.displayValue;
  }
  set inputValue(searchString) {
    this.query.perform(searchString);
  }
  scrollActiveOptionIntoView() {
    if (this.activeIndex == -1) {
      return;
    }
    const childElements = Array.from(this.menuElement.querySelectorAll(`li`) ?? []);
    const activeElement = childElements[this.activeIndex];
    if (!activeElement) {
      return;
    }
    activeElement.scrollIntoView({
      block: 'nearest'
    });
  }
  query = buildTask(() => ({
    context: this,
    generator: function* (searchString) {
      this.searchString = searchString;
      this.activeIndex = -1;
      if (!this.canPerformSearch) {
        this.visibility.hide();
        return;
      }
      yield timeout(this.searchTimeout);
      this.options = (yield this.args.onQuery?.(searchString)) ?? [];
      this.visibility.show(this.inputElement);
    }
  }), null, "query", "restartable");
  selectOption(option, index, evt) {
    evt?.preventDefault();
    evt?.stopPropagation();
    this.activeIndex = index;
    this.selectedOption = option;
    this.onBlur();
  }
  static {
    n(this.prototype, "selectOption", [action]);
  }
  moveUp(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.scrollActiveOptionIntoView();
    }
  }
  static {
    n(this.prototype, "moveUp", [action]);
  }
  moveDown(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.activeIndex < this.options.length - 1) {
      this.activeIndex++;
      this.scrollActiveOptionIntoView();
    }
  }
  static {
    n(this.prototype, "moveDown", [action]);
  }
  enterKeyHandler(evt) {
    evt?.preventDefault();
    evt?.stopPropagation();
    if (this.activeIndex == -1) {
      return;
    }
    const option = this.internalOptions[this.activeIndex];
    if (option != undefined) {
      this.selectOption(option, this.activeIndex);
    }
  }
  static {
    n(this.prototype, "enterKeyHandler", [action]);
  }
  exitKeyHandler(evt) {
    evt?.preventDefault();
    evt?.stopPropagation();
    this.onBlur();
  }
  static {
    n(this.prototype, "exitKeyHandler", [action]);
  }
  onFocus(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.searchString = this.displayValue;
  }
  static {
    n(this.prototype, "onFocus", [action]);
  }
  onBlur() {
    this.visibility.hide();
    this.inputElement.blur();
  }
  static {
    n(this.prototype, "onBlur", [action]);
  }
  onMouseDown(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.inputElement.focus();
  }
  static {
    n(this.prototype, "onMouseDown", [action]);
  }
  clear() {
    this.searchString = '';
    this.activeIndex = -1;
    this.onChange(null);
    this.onBlur();
  }
  static {
    n(this.prototype, "clear", [action]);
  }
  onSearchBarInsert(element) {
    this.inputElement = element;
  }
  static {
    n(this.prototype, "onSearchBarInsert", [action]);
  }
  onMenuInsert(element) {
    this.menuElement = element;
  }
  static {
    n(this.prototype, "onMenuInsert", [action]);
  }
  setVisibility(visibility) {
    this.visibility = visibility;
  }
  static {
    n(this.prototype, "setVisibility", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<Dropdown @fullWidth={{true}} @side={{@side}} @onShow={{@onShow}} @onHide={{@onHide}} @scrollable={{this.scrollable}} {{onInsert this.onMenuInsert}}>\n  <:control as |visibility|>\n    <div class={{classes \"search\" (if @fieldOptions.isInvalid \"is-invalid\") (if @fieldOptions.isWarning \"is-warning\")}} {{onInsert (fn this.setVisibility visibility)}} ...attributes>\n      <div class=\"input-group\">\n        {{#unless this.hideSearchIcon}}\n          <span class=\"input-group-text\">\n            {{#if this.loading}}\n              <span class=\"spinner-border spinner-border-sm\" />\n            {{else}}\n              <i class=\"bi bi-search\" />\n            {{/if}}\n          </span>\n        {{/unless}}\n        <TextInput class={{this.inputClassList}} placeholder={{this.placeholder}} @basic={{@basic}} @binding={{bind this.self \"inputValue\"}} @fieldOptions={{hash describedBy=@fieldOptions.describedBy disabled=@fieldOptions.disabled id=@fieldOptions.id isInvalid=@fieldOptions.isInvalid isWarning=@fieldOptions.isWarning required=@fieldOptions.required}} @readonly={{@readonly}} {{on \"focus\" this.onFocus}} {{onKey \"ArrowUp\" this.moveUp onlyWhenFocused=true}} {{onKey \"ArrowDown\" this.moveDown onlyWhenFocused=true}} {{onKey \"Enter\" this.enterKeyHandler onlyWhenFocused=true}} {{onKey \"NumpadEnter\" this.enterKeyHandler onlyWhenFocused=true}} {{onKey \"Tab\" this.exitKeyHandler onlyWhenFocused=true}} {{onKey \"Escape\" this.exitKeyHandler onlyWhenFocused=true}} {{onInsert this.onSearchBarInsert}} />\n        {{#if this.clearable}}\n          <Button aria-label={{t \"nrg.base.clear\"}} class=\"btn-outline-secondary\" @onClick={{this.clear}}>\n            <i class=\"bi bi-x-lg\" />\n          </Button>\n        {{/if}}\n      </div>\n    </div>\n  </:control>\n  <:menu as |Menu|>\n    {{#each this.internalOptions as |option index|}}\n      {{#let (eq this.activeIndex index) as |isActive|}}\n        <Menu.Item aria-selected={{isActive}} class={{if isActive \"active\"}} @onSelect={{fn this.selectOption option index}} {{!-- template-lint-disable no-pointer-down-event-binding --}} {{on \"mousedown\" this.onMouseDown}}>\n          {{#if (has-block \"option\")}}\n            {{yield option.raw to=\"option\"}}\n          {{else}}\n            {{option.label}}\n          {{/if}}\n        </Menu.Item>\n      {{/let}}\n    {{else}}\n      <Menu.Item @disabled={{true}}>\n        {{this.noResultsLabel}}\n      </Menu.Item>\n    {{/each}}\n  </:menu>\n</Dropdown>", {
      strictMode: true,
      scope: () => ({
        Dropdown,
        onInsert: OnInsertModifier,
        classes,
        fn,
        TextInput,
        bind,
        hash,
        on,
        onKey,
        Button,
        t,
        eq
      })
    }), this);
  }
}

export { Search as default };
//# sourceMappingURL=search.js.map

import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { fn } from '@ember/helper';
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
import ButtonComponent from '../button.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

class Search extends BoundValue {
  self = this;
  visibility;
  inputElement;
  menuElement;
  static {
    g(this.prototype, "activeIndex", [tracked], function () {
      return -1;
    });
  }
  #activeIndex = (i(this, "activeIndex"), undefined);
  static {
    g(this.prototype, "options", [tracked], function () {
      return [];
    });
  }
  #options = (i(this, "options"), undefined);
  static {
    g(this.prototype, "searchString", [tracked], function () {
      return '';
    });
  }
  #searchString = (i(this, "searchString"), undefined);
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), undefined);
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
  get showOptions() {
    return this.visibility?.isShown && this.canPerformSearch && !this.loading;
  }
  get inputClassList() {
    const classes1 = ['form-control'];
    if (this.args.basic) {
      classes1[0] += '-plaintext';
    }
    if (this.args.isInvalid) {
      classes1.push('is-invalid');
    } else if (this.args.isWarning) {
      classes1.push('is-warning');
    }
    return classes1.join(' ');
  }
  get displayValue() {
    if (!this.value) {
      return this.searchString;
    }
    if (this.args.serializationPath === null) {
      return get(this.value, this.args.displayPath ?? 'label');
    }
    if (this.selectedOption) {
      return this.selectedOption.label;
    }
    return '';
  }
  get internalOptions() {
    return this.options.map(option1 => {
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
  get selectedOption() {
    const found1 = this.internalOptions.find(option1 => option1.value === this.value);
    return found1 || null;
  }
  set selectedOption(option1) {
    this.onChange(option1.value);
  }
  scrollActiveOptionIntoView() {
    if (this.activeIndex == -1) {
      return;
    }
    const childElements1 = Array.from(this.menuElement.querySelectorAll(`li`) ?? []);
    const activeElement1 = childElements1[this.activeIndex];
    if (!activeElement1) {
      return;
    }
    activeElement1.scrollIntoView({
      block: 'nearest'
    });
  }
  query = buildTask(() => ({
    context: this,
    generator: function* (searchString1) {
      yield timeout(this.searchTimeout);
      this.options = yield this.args.onQuery(searchString1);
      this.visibility.show(this.inputElement);
    }
  }), null, "query", "restartable");
  selectOption(option1, index1, evt1) {
    evt1?.preventDefault();
    evt1?.stopPropagation();
    this.activeIndex = index1;
    this.selectedOption = option1;
    this.searchString = option1.label;
    this.onBlur();
  }
  static {
    n(this.prototype, "selectOption", [action]);
  }
  moveUp(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.scrollActiveOptionIntoView();
    }
  }
  static {
    n(this.prototype, "moveUp", [action]);
  }
  moveDown(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (this.activeIndex < this.options.length - 1) {
      this.activeIndex++;
      this.scrollActiveOptionIntoView();
    }
  }
  static {
    n(this.prototype, "moveDown", [action]);
  }
  enterKeyHandler(evt1) {
    evt1?.preventDefault();
    evt1?.stopPropagation();
    if (this.activeIndex == -1) {
      return;
    }
    const option1 = this.internalOptions[this.activeIndex];
    if (option1 != undefined) {
      this.selectOption(option1, this.activeIndex);
    }
    this.onBlur();
  }
  static {
    n(this.prototype, "enterKeyHandler", [action]);
  }
  exitKeyHandler(evt1) {
    evt1?.preventDefault();
    evt1?.stopPropagation();
    this.onBlur();
  }
  static {
    n(this.prototype, "exitKeyHandler", [action]);
  }
  onFocus(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    this.visibility.show(evt1);
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
  onSearch(evt1) {
    this.searchString = evt1.target.value;
    this.value = '';
    this.activeIndex = -1;
    if (!this.canPerformSearch) {
      return;
    }
    this.query.perform(this.searchString);
  }
  static {
    n(this.prototype, "onSearch", [action]);
  }
  clear() {
    this.searchString = '';
    this.value = '';
    this.activeIndex = -1;
    this.onBlur();
  }
  static {
    n(this.prototype, "clear", [action]);
  }
  onSearchBarInsert(element1) {
    this.inputElement = element1;
  }
  static {
    n(this.prototype, "onSearchBarInsert", [action]);
  }
  onMenuInsert(element1) {
    this.menuElement = element1;
  }
  static {
    n(this.prototype, "onMenuInsert", [action]);
  }
  setVisibility(visibility1) {
    this.visibility = visibility1;
  }
  static {
    n(this.prototype, "setVisibility", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <Dropdown @fullWidth={{true}} @side={{@side}} @onShow={{@onShow}} @onHide={{@onHide}} {{onInsert this.onMenuInsert}}>\n      <:control as |visibility|>\n        <div class={{classes \"search\" (if @isInvalid \"is-invalid\") (if @isWarning \"is-warning\")}} {{onInsert (fn this.setVisibility visibility)}} ...attributes>\n          <div class=\"input-group\">\n            {{#unless this.hideSearchIcon}}\n              <span class=\"input-group-text\">\n                {{#if this.loading}}\n                  <span class=\"spinner-border spinner-border-sm\" />\n                {{else}}\n                  <i class=\"bi bi-search\" />\n                {{/if}}\n              </span>\n            {{/unless}}\n            <TextInput class={{this.inputClassList}} placeholder={{this.placeholder}} @basic={{@basic}} @binding={{bind this.self \"searchString\"}} @disabled={{@disabled}} @id={{@id}} @readonly={{@readonly}} {{on \"input\" this.onSearch}} {{on \"focus\" visibility.show}} {{onKey \"ArrowUp\" this.moveUp onlyWhenFocused=true}} {{onKey \"ArrowDown\" this.moveDown onlyWhenFocused=true}} {{onKey \"Enter\" this.enterKeyHandler onlyWhenFocused=true}} {{onKey \"NumpadEnter\" this.enterKeyHandler onlyWhenFocused=true}} {{onKey \"Tab\" this.exitKeyHandler onlyWhenFocused=true}} {{onKey \"Escape\" this.exitKeyHandler onlyWhenFocused=true}} {{onInsert this.onSearchBarInsert}} />\n            {{#if this.clearable}}\n              <Button aria-label={{t \"nrg.base.clear\"}} class=\"btn-outline-secondary\" @onClick={{this.clear}}>\n                <i class=\"bi bi-x-lg\" />\n              </Button>\n            {{/if}}\n          </div>\n        </div>\n      </:control>\n      <:menu as |Menu|>\n        {{#each this.internalOptions as |option index|}}\n          {{#let (eq this.activeIndex index) as |isActive|}}\n            <Menu.Item aria-selected={{isActive}} class={{if isActive \"active\"}} @onSelect={{fn this.selectOption option index}}>\n              {{option.label}}\n            </Menu.Item>\n          {{/let}}\n        {{else}}\n          <Menu.Item class=\"disabled\">\n            {{this.noResultsLabel}}\n          </Menu.Item>\n        {{/each}}\n      </:menu>\n    </Dropdown>\n  ", {
      strictMode: true,
      scope: () => ({
        Dropdown,
        onInsert: OnInsertModifier,
        classes,
        fn,
        TextInput,
        bind,
        on,
        onKey,
        Button: ButtonComponent,
        t,
        eq
      })
    }), this);
  }
}

export { Search as default };
//# sourceMappingURL=search.js.map

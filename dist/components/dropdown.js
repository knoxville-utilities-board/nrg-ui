import { hash, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Popover from './popover.js';
import { classes } from '../helpers/classes.js';
import OnClickOutside from '../modifiers/on-click-outside.js';
import OnInsertModifier from '../modifiers/on-insert.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';
import { g, i } from 'decorator-transforms/runtime';

class Item extends Component {
  onSelect = evt => {
    if (this.args.disabled) {
      return;
    }
    this.args.onSelectInternal(evt, this.args.closeOnSelect ?? true, this.args.onSelect);
  };
  static {
    setComponentTemplate(precompileTemplate("<li aria-selected=\"false\" role=\"option\" data-test-dropdown-item {{on \"click\" this.onSelect}}>\n  <span class={{classes \"dropdown-item\" (if @disabled \"disabled\")}} ...attributes>\n    {{yield}}\n  </span>\n</li>", {
      strictMode: true,
      scope: () => ({
        on,
        classes
      })
    }), this);
  }
}
const Divider = setComponentTemplate(precompileTemplate("<li>\n  <hr class=\"dropdown-divider\" data-test-dropdown-divider ...attributes />\n</li>", {
  strictMode: true
}), templateOnly());
const Header = setComponentTemplate(precompileTemplate("<li>\n  <h5 class=\"dropdown-header\" data-test-dropdown-header ...attributes>\n    {{yield}}\n  </h5>\n</li>", {
  strictMode: true
}), templateOnly());
class Dropdown extends Component {
  menuId = crypto.randomUUID();
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), void 0);
  get alignment() {
    return this.args.alignment ?? 'start';
  }
  get disabled() {
    return this.args.disabled || this.args.loading;
  }
  get hasIcon() {
    return this.args.hasIcon ?? true;
  }
  get showLeftIcon() {
    return this.hasIcon && this.args.side === 'start';
  }
  get showRightIcon() {
    return this.hasIcon && !this.showLeftIcon;
  }
  get icon() {
    if (this.args.icon) {
      return this.args.icon;
    }
    switch (this.args.side) {
      case 'top':
        return 'bi-caret-up-fill';
      case 'start':
        return 'bi-caret-left-fill';
      case 'end':
        return 'bi-caret-right-fill';
      case 'bottom':
      default:
        return 'bi-caret-down-fill';
    }
  }
  get scrollable() {
    return this.args.scrollable ?? true;
  }
  onMenuInsert = (visibility, element) => {
    this.visibility = visibility;
    this.menuElement = element;
  };
  onSelect = async (evt, shouldClose, callback) => {
    if (!this.visibility.isShown) {
      return;
    }
    if (shouldClose) {
      await this.visibility.hide();
    }
    await callback?.(evt);
  };
  static {
    setComponentTemplate(precompileTemplate("<div class=\"dropdown\" {{onClickOutside this.visibility.hide}} ...attributes>\n  <Popover class=\"border-0\" @alignment={{this.alignment}} @arrow={{false}} @flip={{@flip}} @fullWidth={{@fullWidth}} @offset={{@offset}} @side={{@side}} @onShow={{@onShow}} @onHide={{@onHide}}>\n    <:control as |visibility|>\n      {{#if (has-block-params \"control\")}}\n        {{yield visibility to=\"control\"}}\n      {{else}}\n        <button aria-controls={{this.menuId}} aria-disabled={{if this.disabled \"true\"}} {{!-- This is intentional - if isShown is false, the attribute is removed --}} aria-expanded=\"{{visibility.isShown}}\" aria-haspopup=\"listbox\" class=\"btn dropdown text-start\" disabled={{this.disabled}} role=\"combobox\" type=\"button\" {{on \"click\" visibility.toggle}}>\n          {{#if this.showLeftIcon}}\n            <i class={{classes \"icon\" this.icon (unless @iconOnly \"float-start ms-n1 me-1\")}}></i>\n          {{/if}}\n          {{yield visibility to=\"control\"}}\n          {{#if this.showRightIcon}}\n            <i class={{classes \"icon\" this.icon (unless @iconOnly \"float-end ms-1 me-n1\")}}></i>\n          {{/if}}\n        </button>\n      {{/if}}\n    </:control>\n    <:content as |Content visibility|>\n      <Content.Body class=\"p-0\">\n        <ul class={{classes \"dropdown-menu\" (unless visibility.isShown \"hidden\") (if this.scrollable \"scrollable\")}} id={{this.menuId}} role=\"listbox\" {{onInsert (fn this.onMenuInsert visibility)}}>\n          {{yield (hash Divider=(component Divider) Header=(component Header) Item=(component Item closeOnSelect=@closeOnSelect onSelectInternal=this.onSelect)) to=\"menu\"}}\n        </ul>\n      </Content.Body>\n    </:content>\n  </Popover>\n</div>", {
      strictMode: true,
      scope: () => ({
        onClickOutside: OnClickOutside,
        Popover,
        on,
        classes,
        onInsert: OnInsertModifier,
        fn,
        hash,
        Divider,
        Header,
        Item
      })
    }), this);
  }
}

export { Dropdown as default };
//# sourceMappingURL=dropdown.js.map

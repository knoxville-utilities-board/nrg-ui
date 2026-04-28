import { warn, assert } from '@ember/debug';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import Dropdown from './dropdown.js';
import OnDestroy from '../modifiers/on-destroy.js';
import OnInsertModifier from '../modifiers/on-insert.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime';

class ContextMenuItem extends Component {
  static {
    g(this.prototype, "contextMenu", [service]);
  }
  #contextMenu = (i(this, "contextMenu"), void 0);
  get menu() {
    const {
      menuId
    } = this.args;
    const menu = this.contextMenu.menu(menuId);
    warn(`[ContextMenuItem] Context menu with id "${menuId}" not found. Make sure the context menu exists before trying to access it.` + ' This warning may be thrown if the context menu was registered in the same render cycle as the access.' + ' If this is the case, you can ignore this warning.', Boolean(menu), {
      id: 'nrg-ui.context-menu.not-found'
    });
    return menu;
  }
  get renderTo() {
    return this.args.bottom ? this.menu?.bottom : this.menu?.top;
  }
  get options() {
    return this.menu?.dropdown;
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if this.renderTo}}\n  {{#in-element this.renderTo insertBefore=null}}\n    {{#let this.options as |Options|}}\n      {{#if @divider}}\n        <Options.Divider ...attributes />\n      {{else if @header}}\n        <Options.Header ...attributes>\n          {{yield}}\n        </Options.Header>\n      {{else}}\n        <Options.Item @closeOnSelect={{@closeOnSelect}} @disabled={{@disabled}} @onSelect={{@onSelect}} ...attributes>\n          {{yield}}\n        </Options.Item>\n      {{/if}}\n    {{/let}}\n  {{/in-element}}\n{{/if}}", {
      strictMode: true
    }), this);
  }
}
class ContextMenu extends Component {
  static {
    g(this.prototype, "contextMenu", [service]);
  }
  #contextMenu = (i(this, "contextMenu"), void 0);
  register = (top, {
    menu: dropdown
  }) => {
    const {
      id
    } = this.args;
    assert('ContextMenu requires an id', id);
    const bottom = top.nextElementSibling;
    this.contextMenu.register(id, {
      top,
      bottom,
      dropdown
    });
  };
  unregister = () => {
    this.contextMenu.unregister(this.args.id);
  };
  static {
    setComponentTemplate(precompileTemplate("<Dropdown class=\"context-menu\" @alignment={{@alignment}} @disabled={{@disabled}} @closeOnSelect={{@closeOnSelect}} @controlElement={{@controlElement}} @flip={{@flip}} @fullWidth={{@fullWidth}} @hasIcon={{@hasIcon}} @loading={{@loading}} @offset={{@offset}} @scrollable={{@scrollable}} @side={{@side}} @onHide={{@onHide}} @onShow={{@onShow}} ...attributes>\n  <:control as |visibility|>\n    <i aria-disabled={{if @disabled \"true\"}} class=\"bi bi-three-dots-vertical p-1\" role=\"button\" title={{t \"nrg.navbar.toggleContextMenu\"}} {{on \"click\" visibility.toggle}} />\n  </:control>\n  <:menu as |Menu|>\n    <div class=\"dropdown-top\" {{onInsert this.register menu=Menu}} {{onDestroy this.unregister}}>\n      {{yield Menu}}\n    </div>\n    <div class=\"dropdown-bottom\"></div>\n  </:menu>\n</Dropdown>", {
      strictMode: true,
      scope: () => ({
        Dropdown,
        t,
        on,
        onInsert: OnInsertModifier,
        onDestroy: OnDestroy
      })
    }), this);
  }
}

export { ContextMenuItem, ContextMenu as default };
//# sourceMappingURL=context-menu.js.map

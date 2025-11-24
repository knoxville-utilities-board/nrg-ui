import { assert, warn } from '@ember/debug';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { t } from 'ember-intl';

import Dropdown from './dropdown.gts';
import onDestroy from '../modifiers/on-destroy.ts';
import onInsert from '../modifiers/on-insert.ts';

import type { Direction } from './popover.ts';
import type { Dropdown as DropdownType } from '../services/context-menu.ts';
import type ContextMenuService from '../services/context-menu.ts';
import type { Alignment } from '@floating-ui/dom';

export interface ContextMenuItemSignature {
  Element: HTMLHRElement | HTMLHeadingElement | HTMLSpanElement;
  Args: {
    bottom?: boolean;
    closeOnSelect?: boolean;
    disabled?: boolean;
    divider?: boolean;
    header?: boolean;
    menuId: string;

    onSelect?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    default: [];
  };
}

export class ContextMenuItem extends Component<ContextMenuItemSignature> {
  @service
  declare contextMenu: ContextMenuService;

  get menu() {
    const { menuId } = this.args;
    const menu = this.contextMenu.menu(menuId);

    warn(
      `[ContextMenuItem] Context menu with id "${menuId}" not found. Make sure the context menu exists before trying to access it.` +
        ' This warning may be thrown if the context menu was registered in the same render cycle as the access.' +
        ' If this is the case, you can ignore this warning.',
      Boolean(menu),
      {
        id: 'nrg-ui.context-menu.not-found',
      },
    );

    return menu;
  }

  get renderTo() {
    return this.args.bottom ? this.menu?.bottom : this.menu?.top;
  }

  get options(): DropdownType | undefined {
    return this.menu?.dropdown;
  }

  <template>
    {{#if this.renderTo}}
      {{#in-element this.renderTo insertBefore=null}}
        {{#let this.options as |Options|}}
          {{#if @divider}}
            <Options.Divider ...attributes />
          {{else if @header}}
            <Options.Header ...attributes>
              {{yield}}
            </Options.Header>
          {{else}}
            <Options.Item
              @closeOnSelect={{@closeOnSelect}}
              @disabled={{@disabled}}
              @onSelect={{@onSelect}}
              ...attributes
            >
              {{yield}}
            </Options.Item>
          {{/if}}
        {{/let}}
      {{/in-element}}
    {{/if}}
  </template>
}

export interface ContextMenuSignature {
  Element: HTMLDivElement;
  Args: {
    disabled?: boolean;
    id: string;

    // Inherited from Dropdown
    alignment?: Alignment;
    closeOnSelect?: boolean;
    controlElement?: HTMLElement;
    flip?: boolean;
    fullWidth?: boolean;
    hasIcon?: boolean;
    loading?: boolean;
    offset?: string | number;
    scrollable?: boolean;
    side?: Direction;

    onShow?: () => unknown | Promise<unknown>;
    onHide?: () => unknown | Promise<unknown>;
  };
  Blocks: {
    default: [DropdownType];
  };
}

export default class ContextMenu extends Component<ContextMenuSignature> {
  @service
  declare contextMenu: ContextMenuService;

  register = (
    top: HTMLDivElement,
    { menu: dropdown }: { menu: DropdownType },
  ) => {
    const { id } = this.args;

    assert('ContextMenu requires an id', id);

    const bottom = top.nextElementSibling as HTMLDivElement;

    this.contextMenu.register(id, { top, bottom, dropdown });
  };

  unregister = () => {
    this.contextMenu.unregister(this.args.id);
  };

  <template>
    <Dropdown
      class="context-menu"
      @alignment={{@alignment}}
      @disabled={{@disabled}}
      @closeOnSelect={{@closeOnSelect}}
      @controlElement={{@controlElement}}
      @flip={{@flip}}
      @fullWidth={{@fullWidth}}
      @hasIcon={{@hasIcon}}
      @loading={{@loading}}
      @offset={{@offset}}
      @scrollable={{@scrollable}}
      @side={{@side}}
      @onHide={{@onHide}}
      @onShow={{@onShow}}
      ...attributes
    >
      <:control as |visibility|>
        <i
          aria-disabled={{if @disabled "true"}}
          class="bi bi-three-dots-vertical p-1"
          role="button"
          title={{t "nrg.navbar.toggleContextMenu"}}
          {{on "click" visibility.toggle}}
        />
      </:control>
      <:menu as |Menu|>
        <div
          class="dropdown-top"
          {{onInsert this.register menu=Menu}}
          {{onDestroy this.unregister}}
        >
          {{yield Menu}}
        </div>
        <div class="dropdown-bottom"></div>
      </:menu>
    </Dropdown>
  </template>
}

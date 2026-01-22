import { fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import Popover from './popover.gts';
import { classes } from '../helpers/classes.ts';
import onClickOutside from '../modifiers/on-click-outside.ts';
import onInsert from '../modifiers/on-insert.ts';

import type { Direction, PopoverVisibility } from './popover.gts';
import type { TOC } from '@ember/component/template-only';
import type { Alignment } from '@floating-ui/dom';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type IntlService from 'ember-intl/services/intl';

interface ItemSignature {
  Element: HTMLSpanElement;
  Args: {
    closeOnSelect?: boolean;
    disabled?: boolean;

    onSelect?: (evt: MouseEvent) => unknown;
    onSelectInternal: (
      evt: MouseEvent,
      shouldClose: boolean,
      callback?: (evt: MouseEvent) => unknown,
    ) => unknown;
  };
  Blocks: {
    default: [];
  };
}

class Item extends Component<ItemSignature> {
  onSelect = (evt: MouseEvent) => {
    if (this.args.disabled) {
      return;
    }

    this.args.onSelectInternal(evt, this.args.closeOnSelect ?? true, this.args.onSelect);
  };

  <template>
    <li aria-selected="false" role="option" data-test-dropdown-item {{on "click" this.onSelect}}>
      <span class={{classes "dropdown-item" (if @disabled "disabled")}} ...attributes>
        {{yield}}
      </span>
    </li>
  </template>
}

interface DividerSignature {
  Element: HTMLHRElement;
}

const Divider: TOC<DividerSignature> = <template>
  <li>
    <hr class="dropdown-divider" data-test-dropdown-divider ...attributes />
  </li>
</template>;

interface HeaderSignature {
  Element: HTMLHeadingElement;
  Blocks: {
    default: [];
  };
}

const Header: TOC<HeaderSignature> = <template>
  <li>
    <h5 class="dropdown-header" data-test-dropdown-header ...attributes>
      {{yield}}
    </h5>
  </li>
</template>;

export interface DropdownSignature {
  Element: HTMLDivElement;
  Args: {
    alignment?: Alignment;
    closeOnSelect?: boolean;
    controlElement?: HTMLElement;
    disabled?: boolean;
    flip?: boolean;
    fullWidth?: boolean;
    hasIcon?: boolean;
    icon?: string;
    iconOnly?: boolean;
    loading?: boolean;
    offset?: string | number;
    scrollable?: boolean;
    side?: Direction;

    onShow?: () => unknown | Promise<unknown>;
    onHide?: () => unknown | Promise<unknown>;
  };
  Blocks: {
    control: [PopoverVisibility];
    menu: [
      {
        Divider: ComponentLike<DividerSignature>;
        Header: ComponentLike<HeaderSignature>;
        Item: WithBoundArgs<typeof Item, 'onSelectInternal'>;
      },
    ];
  };
}

export default class Dropdown extends Component<DropdownSignature> {
  declare menuElement: HTMLElement;
  declare visibility: PopoverVisibility;

  menuId = crypto.randomUUID();

  @service
  declare intl: IntlService;

  get alignment(): Alignment {
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

  onMenuInsert = (visibility: PopoverVisibility, element: HTMLElement) => {
    this.visibility = visibility;
    this.menuElement = element;
  };

  onSelect = async (
    evt: MouseEvent,
    shouldClose: boolean,
    callback?: (evt: MouseEvent) => unknown,
  ) => {
    if (!this.visibility.isShown) {
      return;
    }

    if (shouldClose) {
      await this.visibility.hide();
    }

    await callback?.(evt);
  };

  <template>
    <div class="dropdown" {{onClickOutside this.visibility.hide}} ...attributes>
      <Popover
        class="border-0"
        @alignment={{this.alignment}}
        @arrow={{false}}
        @flip={{@flip}}
        @fullWidth={{@fullWidth}}
        @offset={{@offset}}
        @side={{@side}}
        @onShow={{@onShow}}
        @onHide={{@onHide}}
      >
        <:control as |visibility|>
          {{#if (has-block-params "control")}}
            {{yield visibility to="control"}}
          {{else}}
            <button
              aria-controls={{this.menuId}}
              aria-disabled={{if this.disabled "true"}}
              {{! This is intentional - if isShown is false, the attribute is removed }}
              aria-expanded="{{visibility.isShown}}"
              aria-haspopup="listbox"
              class="btn dropdown text-start"
              disabled={{this.disabled}}
              role="combobox"
              type="button"
              {{on "click" visibility.toggle}}
            >
              {{#if this.showLeftIcon}}
                <i
                  class={{classes "icon" this.icon (unless @iconOnly "float-start ms-n1 me-1")}}
                ></i>
              {{/if}}
              {{yield visibility to="control"}}
              {{#if this.showRightIcon}}
                <i class={{classes "icon" this.icon (unless @iconOnly "float-end ms-1 me-n1")}}></i>
              {{/if}}
            </button>
          {{/if}}
        </:control>
        <:content as |Content visibility|>
          <Content.Body class="p-0">
            <ul
              class={{classes
                "dropdown-menu"
                (unless visibility.isShown "hidden")
                (if this.scrollable "scrollable")
              }}
              id={{this.menuId}}
              role="listbox"
              {{onInsert (fn this.onMenuInsert visibility)}}
            >
              {{yield
                (hash
                  Divider=(component Divider)
                  Header=(component Header)
                  Item=(component Item closeOnSelect=@closeOnSelect onSelectInternal=this.onSelect)
                )
                to="menu"
              }}
            </ul>
          </Content.Body>
        </:content>
      </Popover>
    </div>
  </template>
}

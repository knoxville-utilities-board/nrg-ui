import { hash } from '@ember/helper';
import {
  arrow,
  autoPlacement,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import classes from '../modifiers/classes.ts';
import onInsert from '../modifiers/on-insert.ts';

import type { TOC } from '@ember/component/template-only';
import type { Alignment, Placement, Side } from '@floating-ui/dom';
import type { ComponentLike } from '@glint/template';

export interface PopoverActions {
  toggle: (evt: Event) => Promise<void>;
  show: (evt: Event) => Promise<void>;
  hide: (evt: Event) => Promise<void>;
}

interface HeaderSignature {
  Element: HTMLHeadingElement;
  Blocks: {
    default: [];
  };
}

const Header: TOC<HeaderSignature> = <template>
  <h3 class="popover-header" ...attributes>
    {{yield}}
  </h3>
</template>;

interface BodySignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

const Body: TOC<BodySignature> = <template>
  <div class="popover-body" ...attributes>
    {{yield}}
  </div>
</template>;

export interface PopoverSignature {
  Element: HTMLDivElement;
  Args: {
    alignment?: Alignment;
    animated?: boolean;
    arrow?: boolean;
    autoPlacement?: boolean;
    flip?: boolean;
    isShown?: boolean;
    offset?: string;
    placement?: Placement;
    shiftPadding?: string | number;
    side?: Side;

    onShow?: () => Promise<void>;
    onHide?: () => Promise<void>;
  };
  Blocks: {
    control: [PopoverActions];
    content:
      | [
          {
            Header: ComponentLike<HeaderSignature>;
            Body: ComponentLike<BodySignature>;
          },
        ]
      | [];
  };
}

export default class Popover extends Component<PopoverSignature> {
  declare control: HTMLElement | null;
  declare popover: HTMLElement | null;
  declare arrow: HTMLElement | null;

  id = `popover-${crypto.randomUUID()}`;

  @tracked
  _isShown = false;

  get animated() {
    return this.args.animated ?? true;
  }

  get alignment() {
    return this.args.alignment ? `-${this.args.alignment}` : '';
  }

  get hasArrow() {
    return this.args.arrow ?? true;
  }

  get offset() {
    const offset = parseInt(this.args.offset ?? '');
    if (offset >= 0) {
      return offset;
    }
    return 5;
  }

  get placement() {
    if (this.args.autoPlacement) {
      return;
    }
    let placement = this.args.placement || 'bottom';
    if (this.args.alignment) {
      placement += `-${this.args.alignment}`;
    }
    return placement as Placement;
  }

  get shiftPadding() {
    const { arrow, shiftPadding } = this.args;

    if (arrow && !shiftPadding) {
      return 0;
    }

    if (typeof shiftPadding === 'number') {
      return shiftPadding;
    }

    return parseInt(shiftPadding ?? '0') || 0;
  }

  get middleware() {
    const middleware = [offset(this.offset)];

    if (this.args.flip) {
      middleware.push(flip());
    }

    if (this.args.shiftPadding) {
      middleware.push(shift({ padding: this.shiftPadding }));
    }

    if (this.args.autoPlacement) {
      middleware.push(autoPlacement());
    }

    if (!this.hasArrow) {
      middleware.push(arrow({ element: this.arrow! }));
    }

    return middleware;
  }

  get isShown() {
    return this.args.isShown ?? this._isShown;
  }

  setArrow = (popover: HTMLElement) => {
    this.arrow = popover;
  };

  show = async (evt: Event) => {
    if (this.isShown) {
      return;
    }

    this._isShown = true;
    await this.args.onShow?.();

    if (evt.target instanceof HTMLElement) {
      this.control = evt.target;
      this.showPopover();
    }
  };

  hide = async () => {
    if (!this.isShown) {
      return;
    }

    this._isShown = false;
    await this.args.onHide?.();

    this.control = null;
  };

  toggle = async (evt: Event) => {
    const action = this.isShown ? this.hide : this.show;

    await action(evt);
  };

  initPopover = (popover: HTMLElement) => {
    this.popover = popover;

    // this.showPopover();
  };

  showPopover = async () => {
    const { x, y, placement, middlewareData } = await computePosition(
      this.control!,
      this.popover!,
      {
        placement: this.placement,
        middleware: this.middleware,
      },
    );

    Object.assign(this.popover!.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    if (!this.hasArrow) {
      return;
    }

    const { x: arrowX, y: arrowY } = middlewareData.arrow!;
    const staticSide: string = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]!]!;

    Object.assign(this.arrow!.style, {
      left: arrowX ? `${arrowX}px` : '',
      top: arrowY ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: '-4px',
    });
  };

  <template>
    {{yield
      (hash show=this.show hide=this.hide toggle=this.toggle)
      to="control"
    }}
    <div
      id={{this.id}}
      {{classes
        "popover"
        (if this.animated "fade show")
        (unless this.isShown "invisible")
      }}
      {{onInsert this.initPopover}}
      ...attributes
    >
      {{#if (has-block-params "content")}}
        {{yield
          (hash Header=(component Header) Body=(component Body))
          to="content"
        }}
      {{else}}
        {{yield to="content"}}
      {{/if}}
    </div>
    {{#if this.hasArrow}}
      <div class="popover-arrow" {{onInsert this.setArrow}}></div>
    {{/if}}
  </template>
}

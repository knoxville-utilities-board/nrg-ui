import { concat, hash } from '@ember/helper';
import { arrow, computePosition, offset } from '@floating-ui/dom';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { classes } from '../helpers/classes.ts';
import onInsert from '../modifiers/on-insert.ts';
import onUpdate from '../modifiers/on-update.ts';
import { getRemValue } from '../utils/dom.ts';

import type { TOC } from '@ember/component/template-only';
import type { Alignment, Placement, Side } from '@floating-ui/dom';
import type { ComponentLike } from '@glint/template';

export interface PopoverVisibility {
  isShown: boolean;
  toggle: (evt: Event) => Promise<void>;
  show: (evt: Event) => Promise<void>;
  hide: () => Promise<void>;
}

export interface HeaderSignature {
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

export interface BodySignature {
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

export type Direction = 'top' | 'end' | 'bottom' | 'start';

export interface PopoverSignature {
  Element: HTMLDivElement;
  Args: {
    alignment?: Alignment;
    arrow?: boolean;
    controlElement?: HTMLElement;
    isShown?: boolean;
    offset?: string | number;
    side?: Direction;

    onShow?: () => unknown;
    onHide?: () => unknown;
  };
  Blocks: {
    control: [PopoverVisibility];
    content: [
      {
        Header: ComponentLike<HeaderSignature>;
        Body: ComponentLike<BodySignature>;
      },
      PopoverVisibility,
    ];
  };
}

const SIDE_TRANSLATION = {
  top: 'top',
  end: 'right',
  bottom: 'bottom',
  start: 'left',
} as const as Record<Direction, Side>;

const ARROW_SIDE = {
  top: 'bottom',
  end: 'left',
  bottom: 'top',
  start: 'right',
} as const as Record<Direction, Side>;

export default class Popover extends Component<PopoverSignature> {
  declare _control: HTMLElement | null;
  declare popover: HTMLElement | null;
  declare arrow: HTMLElement | null;

  id = `popover-${crypto.randomUUID()}`;

  @tracked
  _isShown = false;

  get hasArrow() {
    return this.args.arrow ?? true;
  }

  get offset() {
    const defaultOffset = this.hasArrow ? getRemValue() / 2 : 0;
    const { offset } = this.args;
    const numOffset =
      typeof offset === 'number' ? offset : parseFloat(offset ?? '0');

    return numOffset + defaultOffset;
  }

  get placement() {
    let placement: Placement | Side = SIDE_TRANSLATION[this.side];
    if (this.args.alignment) {
      placement += `-${this.args.alignment}`;
    }
    return placement as Placement;
  }

  get middleware() {
    const middleware = [offset(this.offset)];

    if (this.hasArrow) {
      middleware.push(arrow({ element: this.arrow! }));
    }

    return middleware;
  }

  get side(): Direction {
    return this.args.side ?? 'bottom';
  }

  get isShown() {
    return this.args.isShown ?? this._isShown;
  }

  get control() {
    return this.args.controlElement ?? this._control;
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

    if (evt.currentTarget instanceof HTMLElement) {
      this._control = evt.currentTarget;
      this.showPopover();
    }
  };

  hide = async () => {
    if (!this.isShown) {
      return;
    }

    this._isShown = false;
    await this.args.onHide?.();

    this._control = null;
  };

  toggle = async (evt: Event) => {
    const action = this.isShown ? this.hide : this.show;

    await action(evt);
  };

  initPopover = (popover: HTMLElement) => {
    this.popover = popover;
  };

  showPopover = async () => {
    if (!this.control || !this.popover) {
      return;
    }

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
    const staticSide: string =
      ARROW_SIDE[placement.split('-')[0] as Direction]!;

    Object.assign(this.arrow!.style, {
      left: arrowX ? `${arrowX}px` : '',
      top: arrowY ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: 'calc(-1 * (0.5rem + var(--bs-popover-border-width)))',
    });
  };

  <template>
    {{#let
      (hash
        isShown=this.isShown show=this.show hide=this.hide toggle=this.toggle
      )
      as |visibility|
    }}
      {{yield visibility to="control"}}
      <div
        id={{this.id}}
        class={{classes
          (unless this.isShown "hidden")
          (concat "popover bs-popover-" this.side)
        }}
        {{onInsert this.initPopover}}
        {{! @glint-expect-error Modifier types are currently not correct }}
        {{onUpdate
          this.showPopover
          @alignment
          @arrow
          @controlElement
          @offset
          @side
        }}
        ...attributes
      >
        {{#if (has-block-params "content")}}
          {{yield
            (hash Header=(component Header) Body=(component Body))
            visibility
            to="content"
          }}
        {{else}}
          {{! @glint-expect-error - If there are no block params, we don't need to yield anything to the block }}
          {{yield to="content"}}
        {{/if}}
        {{#if this.hasArrow}}
          <div class="popover-arrow" {{onInsert this.setArrow}}></div>
        {{/if}}
      </div>
    {{/let}}
  </template>
}

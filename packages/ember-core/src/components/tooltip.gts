import { on } from '@ember/modifier';
import Component from '@glimmer/component';

import Popover from './popover.gts';

import type { Direction } from './popover.gts';
import type { Alignment } from '@floating-ui/dom';
import type { ComponentLike } from '@glint/template';

export interface TooltipSignature {
  Element: HTMLSpanElement;
  Args: {
    alignment?: Alignment;
    controlElement?: HTMLElement;
    delay?: number;
    flip?: boolean;
    offset?: string | number;
    side?: Direction;

    onShow?: () => unknown;
    onHide?: () => unknown;
  };
  Blocks: {
    default: [ComponentLike<TooltipTargetSignature>];
    content: [
      {
        Header: ComponentLike<HeaderSignature>;
        Body: ComponentLike<BodySignature>;
      },
    ];
  };
}

interface HeaderSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

interface BodySignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

interface TooltipTargetSignature {
  Element: HTMLSpanElement;
  Args: {
    onMouseEnter?: (evt: MouseEvent) => unknown;
    onMouseLeave?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    default: [];
  };
}

class TooltipTarget extends Component<TooltipTargetSignature> {
  mouseEnter = (evt: MouseEvent) => {
    this.args.onMouseEnter?.(evt);
  };

  mouseLeave = (evt: MouseEvent) => {
    this.args.onMouseLeave?.(evt);
  };

  <template>
    <span
      {{on "mouseenter" this.mouseEnter}}
      {{on "mouseleave" this.mouseLeave}}
      ...attributes
    >
      {{yield}}
    </span>
  </template>
}

class Tooltip extends Component<TooltipSignature> {
  get delay() {
    return this.args.delay ?? 300;
  }

<template>
  <Popover
    class="tooltip"
    @alignment={{@alignment}}
    @delay={{this.delay}}
    @flip={{@flip}}
    @offset={{@offset}}
    @side={{@side}}
    @onShow={{@onShow}}
    @onHide={{@onHide}}
  >
    <:control as |actions|>
      {{yield
        (component
          TooltipTarget onMouseEnter=actions.show onMouseLeave=actions.hide
        )
      }}
    </:control>
    <:content as |Content|>
      {{#if Content}}
        {{yield Content to="content"}}
      {{/if}}
    </:content>
  </Popover>
</template>
}

export default Tooltip;

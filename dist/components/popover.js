import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { registerDestructor } from '@ember/destroyable';
import { concat, hash } from '@ember/helper';
import { offset, flip, arrow, size, autoUpdate, computePosition } from '@floating-ui/dom';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { modifier } from 'ember-modifier';
import { classes } from '../helpers/classes.js';
import OnInsertModifier from '../modifiers/on-insert.js';
import { getRemValue } from '../utils/dom.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';
import { g, i } from 'decorator-transforms/runtime';

const Header = setComponentTemplate(precompileTemplate("<h3 class=\"popover-header\" ...attributes>\n  {{yield}}\n</h3>", {
  strictMode: true
}), templateOnly());
const Body = setComponentTemplate(precompileTemplate("<div class=\"popover-body\" ...attributes>\n  {{yield}}\n</div>", {
  strictMode: true
}), templateOnly());
const SIDE_TRANSLATION = {
  top: 'top',
  end: 'right',
  bottom: 'bottom',
  start: 'left'
};
const ARROW_SIDE = {
  top: 'bottom',
  end: 'left',
  bottom: 'top',
  start: 'right'
};
class Popover extends Component {
  id = `popover-${crypto.randomUUID()}`;
  static {
    g(this.prototype, "adjustedSide", [tracked], function () {
      return 'bottom';
    });
  }
  #adjustedSide = (i(this, "adjustedSide"), void 0);
  static {
    g(this.prototype, "isShown", [tracked], function () {
      return false;
    });
  }
  #isShown = (i(this, "isShown"), void 0);
  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, () => {
      if (this.cleanupAutoUpdate) {
        this.cleanupAutoUpdate();
        this.cleanupAutoUpdate = null;
      }
    });
  }
  get control() {
    return this.args.controlElement ?? this._control;
  }
  get hasArrow() {
    return this.args.arrow ?? true;
  }
  get middleware() {
    const middleware = [offset(this.offset)];
    if (this.args.flip) {
      middleware.push(flip());
    }
    if (this.hasArrow) {
      middleware.push(arrow({
        element: this.arrow
      }));
    }
    if (this.args.fullWidth) {
      const expandWidth = size({
        apply({
          rects,
          elements
        }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxWidth: `${rects.reference.width}px`
          });
        }
      });
      middleware.push(expandWidth);
    }
    return middleware;
  }
  get offset() {
    const defaultOffset = this.hasArrow ? getRemValue() / 2 : 0;
    const {
      offset
    } = this.args;
    const numOffset = typeof offset === 'number' ? offset : parseFloat(offset ?? '0');
    return numOffset + defaultOffset;
  }
  get placement() {
    let placement = SIDE_TRANSLATION[this.side];
    if (this.args.alignment) {
      placement += `-${this.args.alignment}`;
    }
    return placement;
  }
  get side() {
    return this.args.side ?? 'bottom';
  }
  hide = async () => {
    this.triggerDisplay.cancelAll();
    if (!this.isShown) {
      return;
    }
    this.isShown = false;
    await this.args.onHide?.();
    if (this.cleanupAutoUpdate) {
      this.cleanupAutoUpdate();
      this.cleanupAutoUpdate = null;
    }
    this._control = null;
  };
  initPopover = popover => {
    this.popover = popover;
  };
  setArrow = popover => {
    this.arrow = popover;
  };
  show = async evtOrInput => {
    if (this.isShown) {
      return;
    }
    this.triggerDisplay.perform(evtOrInput);
  };
  showPopover = () => {
    if (!this.control || !this.popover) {
      return;
    }
    this.cleanupAutoUpdate?.();
    this.cleanupAutoUpdate = autoUpdate(this.control, this.popover, this.updatePosition);
  };
  showPopoverModifier = modifier((element, positional) => {
    // Entangle all arguments to ensure reactivity
    positional.forEach(() => {});
    this.showPopover();
  });
  updatePosition = async () => {
    const {
      x,
      y,
      placement,
      middlewareData
    } = await computePosition(this.control, this.popover, {
      placement: this.placement,
      middleware: this.middleware
    });
    Object.assign(this.popover.style, {
      left: `${x}px`,
      top: `${y}px`
    });
    if (!this.hasArrow) {
      return;
    }
    if (placement !== this.placement) {
      this.adjustedSide = Object.keys(SIDE_TRANSLATION).find(side => SIDE_TRANSLATION[side] === placement);
    } else {
      this.adjustedSide = this.side;
    }
    const {
      x: arrowX,
      y: arrowY
    } = middlewareData.arrow;
    const staticSide = ARROW_SIDE[placement.split('-')[0]];
    Object.assign(this.arrow.style, {
      left: arrowX ? `${arrowX}px` : '',
      top: arrowY ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: 'calc(-1 * (0.5rem + var(--bs-popover-border-width)))'
    });
  };
  toggle = async evt => {
    const action = this.isShown ? this.hide : this.show;
    await action(evt);
  };
  triggerDisplay = buildTask(() => ({
    context: this,
    generator: function* (evtOrInput) {
      const {
        currentTarget
      } = evtOrInput;
      if (this.args.delay) {
        yield timeout(this.args.delay);
      }
      this.isShown = true;
      yield this.args.onShow?.();
      if (evtOrInput instanceof HTMLInputElement) {
        this._control = evtOrInput;
        this.showPopover();
      } else if (evtOrInput instanceof Event && currentTarget instanceof HTMLElement) {
        this._control = currentTarget;
        this.showPopover();
      }
    }
  }), null, "triggerDisplay", "restartable");
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash isShown=this.isShown show=this.show hide=this.hide toggle=this.toggle) as |visibility|}}\n  {{yield visibility to=\"control\"}}\n  <div id={{this.id}} class={{classes (unless this.isShown \"hidden\") (concat \"popover bs-popover-\" this.adjustedSide) \"overflow-x-auto\"}} {{onInsert this.initPopover}} {{this.showPopoverModifier @alignment @arrow @controlElement @offset @side}} ...attributes>\n    {{#if (has-block-params \"content\")}}\n      {{yield (hash Header=(component Header) Body=(component Body)) visibility to=\"content\"}}\n    {{else}}\n      {{!-- @glint-expect-error - If there are no block params, we don't need to yield anything to the block --}}\n      {{yield to=\"content\"}}\n    {{/if}}\n    {{#if this.hasArrow}}\n      <div class=\"popover-arrow\" {{onInsert this.setArrow}}></div>\n    {{/if}}\n  </div>\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        classes,
        concat,
        onInsert: OnInsertModifier,
        Header,
        Body
      })
    }), this);
  }
}

export { Popover as default };
//# sourceMappingURL=popover.js.map

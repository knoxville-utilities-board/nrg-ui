import { hash, concat } from '@ember/helper';
import { offset, arrow, computePosition } from '@floating-ui/dom';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { classes } from '../helpers/classes.js';
import OnInsertModifier from '../modifiers/on-insert.js';
import OnUpdate from '../modifiers/on-update.js';
import { getRemValue } from '../utils/dom.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';
import { g, i } from 'decorator-transforms/runtime';

const Header = setComponentTemplate(precompileTemplate("\n  <h3 class=\"popover-header\" ...attributes>\n    {{yield}}\n  </h3>\n", {
  strictMode: true
}), templateOnly());
const Body = setComponentTemplate(precompileTemplate("\n  <div class=\"popover-body\" ...attributes>\n    {{yield}}\n  </div>\n", {
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
  _control;
  popover;
  arrow;
  id = `popover-${crypto.randomUUID()}`;
  static {
    g(this.prototype, "_isShown", [tracked], function () {
      return false;
    });
  }
  #_isShown = (i(this, "_isShown"), void 0);
  get hasArrow() {
    return this.args.arrow ?? true;
  }
  get offset() {
    const defaultOffset1 = this.hasArrow ? getRemValue() / 2 : 0;
    const {
      offset: offset1
    } = this.args;
    const numOffset1 = typeof offset1 === 'number' ? offset1 : parseFloat(offset1 ?? '0');
    return numOffset1 + defaultOffset1;
  }
  get placement() {
    let placement1 = SIDE_TRANSLATION[this.side];
    if (this.args.alignment) {
      placement1 += `-${this.args.alignment}`;
    }
    return placement1;
  }
  get middleware() {
    const middleware1 = [offset(this.offset)];
    if (this.hasArrow) {
      middleware1.push(arrow({
        element: this.arrow
      }));
    }
    return middleware1;
  }
  get side() {
    return this.args.side ?? 'bottom';
  }
  get isShown() {
    return this.args.isShown ?? this._isShown;
  }
  get control() {
    return this.args.controlElement ?? this._control;
  }
  setArrow = popover1 => {
    this.arrow = popover1;
  };
  show = async evt1 => {
    if (this.isShown) {
      return;
    }
    this._isShown = true;
    await this.args.onShow?.();
    if (evt1.currentTarget instanceof HTMLElement) {
      this._control = evt1.currentTarget;
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
  toggle = async evt1 => {
    const action1 = this.isShown ? this.hide : this.show;
    await action1(evt1);
  };
  initPopover = popover1 => {
    this.popover = popover1;
  };
  showPopover = async () => {
    if (!this.control || !this.popover) {
      return;
    }
    const {
      x: x1,
      y: y1,
      placement: placement1,
      middlewareData: middlewareData1
    } = await computePosition(this.control, this.popover, {
      placement: this.placement,
      middleware: this.middleware
    });
    Object.assign(this.popover.style, {
      left: `${x1}px`,
      top: `${y1}px`
    });
    if (!this.hasArrow) {
      return;
    }
    const {
      x: arrowX1,
      y: arrowY1
    } = middlewareData1.arrow;
    const staticSide1 = ARROW_SIDE[placement1.split('-')[0]];
    Object.assign(this.arrow.style, {
      left: arrowX1 ? `${arrowX1}px` : '',
      top: arrowY1 ? `${arrowY1}px` : '',
      right: '',
      bottom: '',
      [staticSide1]: 'calc(-1 * (0.5rem + var(--bs-popover-border-width)))'
    });
  };
  static {
    setComponentTemplate(precompileTemplate("\n    {{#let (hash isShown=this.isShown show=this.show hide=this.hide toggle=this.toggle) as |visibility|}}\n      {{yield visibility to=\"control\"}}\n      <div id={{this.id}} class={{classes (unless this.isShown \"hidden\") (concat \"popover bs-popover-\" this.side)}} {{onInsert this.initPopover}} {{!-- @glint-expect-error Modifier types are currently not correct --}} {{onUpdate this.showPopover @alignment @arrow @controlElement @offset @side}} ...attributes>\n        {{#if (has-block-params \"content\")}}\n          {{yield (hash Header=(component Header) Body=(component Body)) visibility to=\"content\"}}\n        {{else}}\n          {{!-- @glint-expect-error - If there are no block params, we don't need to yield anything to the block --}}\n          {{yield to=\"content\"}}\n        {{/if}}\n        {{#if this.hasArrow}}\n          <div class=\"popover-arrow\" {{onInsert this.setArrow}}></div>\n        {{/if}}\n      </div>\n    {{/let}}\n  ", {
      strictMode: true,
      scope: () => ({
        hash,
        classes,
        concat,
        onInsert: OnInsertModifier,
        onUpdate: OnUpdate,
        Header,
        Body
      })
    }), this);
  }
}

export { Popover as default };
//# sourceMappingURL=popover.js.map

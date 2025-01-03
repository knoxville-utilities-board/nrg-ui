import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import Popover from './popover.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

let TooltipTarget = class TooltipTarget extends Component {
  mouseEnter = evt1 => {
    this.args.onMouseEnter?.(evt1);
  };
  mouseLeave = evt1 => {
    this.args.onMouseLeave?.(evt1);
  };
  static {
    setComponentTemplate(precompileTemplate("\n    <span {{on \"mouseenter\" this.mouseEnter}} {{on \"mouseleave\" this.mouseLeave}} ...attributes>\n      {{yield}}\n    </span>\n  ", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
};
const Tooltip = setComponentTemplate(precompileTemplate("\n  <Popover class=\"tooltip\" @alignment={{@alignment}} @offset={{@offset}} @side={{@side}} @onShow={{@onShow}} @onHide={{@onHide}}>\n    <:control as |actions|>\n      {{yield (component TooltipTarget onMouseEnter=actions.show onMouseLeave=actions.hide)}}\n    </:control>\n    <:content as |Content|>\n      {{#if Content}}\n        {{yield Content to=\"content\"}}\n      {{/if}}\n    </:content>\n  </Popover>\n", {
  strictMode: true,
  scope: () => ({
    Popover,
    TooltipTarget
  })
}), templateOnly());

export { Tooltip as default };
//# sourceMappingURL=tooltip.js.map

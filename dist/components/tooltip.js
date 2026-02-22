import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import Popover from './popover.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TooltipTarget extends Component {
  mouseEnter = evt => {
    this.args.onMouseEnter?.(evt);
  };
  mouseLeave = evt => {
    this.args.onMouseLeave?.(evt);
  };
  static {
    setComponentTemplate(precompileTemplate("<span {{on \"mouseenter\" this.mouseEnter}} {{on \"mouseleave\" this.mouseLeave}} ...attributes>\n  {{yield}}\n</span>", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}
class Tooltip extends Component {
  get delay() {
    return this.args.delay ?? 300;
  }
  static {
    setComponentTemplate(precompileTemplate("<Popover class=\"tooltip\" @alignment={{@alignment}} @delay={{this.delay}} @flip={{@flip}} @offset={{@offset}} @side={{@side}} @onShow={{@onShow}} @onHide={{@onHide}}>\n  <:control as |actions|>\n    {{yield (component TooltipTarget onMouseEnter=actions.show onMouseLeave=actions.hide)}}\n  </:control>\n  <:content as |Content|>\n    {{#if Content}}\n      {{yield Content to=\"content\"}}\n    {{/if}}\n  </:content>\n</Popover>", {
      strictMode: true,
      scope: () => ({
        Popover,
        TooltipTarget
      })
    }), this);
  }
}

export { Tooltip as default };
//# sourceMappingURL=tooltip.js.map

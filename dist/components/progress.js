
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

class Segment extends Component {
  get classList() {
    const classes = ['progress-bar'];
    if (this.args.striped) {
      classes.push('progress-bar-striped');
    }
    if (this.args.animated) {
      classes.push('progress-bar-animated');
    }
    return classes.join(' ');
  }
  get label() {
    const {
      label,
      progress
    } = this.args;
    return label ?? `${progress}%`;
  }
  get widthStyle() {
    return htmlSafe(`width: ${this.args.progress}%`);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div aria-label={{@title}} aria-valuemin=\"0\" aria-valuemax=\"100\" aria-valuenow={{@progress}} class=\"progress\" role=\"progressbar\" style={{if @multiple this.widthStyle}} title={{@title}}>\n      <div class={{this.classList}} style={{unless @multiple this.widthStyle}} ...attributes>\n        {{#unless @hideLabel}}\n          {{this.label}}\n        {{/unless}}\n      </div>\n    </div>\n  ", {
      strictMode: true
    }), this);
  }
}
const ProgressComponent = setComponentTemplate(precompileTemplate("\n  {{#if @stacked}}\n    <div class=\"progress-stacked\" ...attributes>\n      {{yield (component Segment animated=@animated hideLabel=@hideLabel multiple=true striped=@striped)}}\n    </div>\n  {{else}}\n    <Segment @animated={{@animated}} @hideLabel={{@hideLabel}} @label={{@label}} @multiple={{false}} @progress={{@progress}} @striped={{@striped}} @title={{@title}} ...attributes />\n  {{/if}}\n", {
  strictMode: true,
  scope: () => ({
    Segment
  })
}), templateOnly());

export { ProgressComponent as default };
//# sourceMappingURL=progress.js.map

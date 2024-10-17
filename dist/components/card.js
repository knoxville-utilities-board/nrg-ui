import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class Card extends Component {
  get hasBorder() {
    return this.args.hasBorder ?? true;
  }
  get hasHorizontalDivider() {
    return this.args.hasHorizontalDivider ?? true;
  }
  onClick(evt1) {
    evt1?.preventDefault();
    evt1?.stopPropagation();
    this.args.onClick?.(evt1);
  }
  static {
    n(this.prototype, "onClick", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div class=\"card p-2 p-md-4 shadow-sm {{unless this.hasBorder \"border-0\"}}\" role={{if @isClickable \"button\"}} {{!-- waiting for this issue to be resolved https://github.com/typed-ember/glint/issues/661 --}} {{!-- @glint-expect-error --}} {{(if @isClickable (modifier on \"click\" this.onClick))}} ...attributes>\n      {{#if (has-block \"header\")}}\n        {{#if this.hasHorizontalDivider}}\n          <div class=\"card-header bg-white\">\n            {{yield to=\"header\"}}\n          </div>\n        {{else}}\n          <div class=\"card-body\">\n            {{yield to=\"header\"}}\n          </div>\n        {{/if}}\n      {{/if}}\n      {{#if (has-block \"body\")}}\n        <div class=\"card-body\">\n          {{yield to=\"body\"}}\n        </div>\n      {{/if}}\n    </div>\n  ", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { Card as default };
//# sourceMappingURL=card.js.map

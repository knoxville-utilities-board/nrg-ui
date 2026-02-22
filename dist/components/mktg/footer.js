import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

class MktgFooterSection extends Component {
  get isCollapsible() {
    return this.args.isCollapsible ?? true;
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"col row\n    {{if this.isCollapsible \"row-cols-1 row-cols-md-auto\" \"row-cols-auto\"}}\n    align-items-center gy-4 my-0\" ...attributes>\n  {{yield}}\n</div>", {
      strictMode: true
    }), this);
  }
}
const MktgFooter = setComponentTemplate(precompileTemplate("<footer class=\"mt-auto p-2\" ...attributes>\n  <div class=\"container pt-0 mb-4\">\n    <div class=\"row row-cols-1 row-cols-md-auto justify-content-between align-items-center\">\n      {{#if (has-block \"nav\")}}\n        <MktgFooterSection>\n          {{yield to=\"nav\"}}\n        </MktgFooterSection>\n      {{/if}}\n      {{#if (has-block \"social-media\")}}\n        <MktgFooterSection @isCollapsible={{false}} class={{unless (has-block \"nav\") \"ms-md-auto\"}}>\n          {{yield to=\"social-media\"}}\n        </MktgFooterSection>\n      {{/if}}\n    </div>\n    {{#if @hasDivider}}\n      <hr class=\"mb-0 mt-4\" />\n    {{/if}}\n    {{#if (or (has-block \"brand\") (has-block \"legal\"))}}\n      <div class=\"row row-cols-1 row-cols-md-auto justify-content-between align-items-center\">\n        {{#if (has-block \"brand\")}}\n          <MktgFooterSection>\n            {{yield to=\"brand\"}}\n          </MktgFooterSection>\n        {{/if}}\n        {{#if (has-block \"legal\")}}\n          <MktgFooterSection class={{unless (has-block \"nav\") \"ms-md-auto\"}}>\n            {{yield to=\"legal\"}}\n          </MktgFooterSection>\n        {{/if}}\n      </div>\n    {{/if}}\n  </div>\n</footer>", {
  strictMode: true,
  scope: () => ({
    MktgFooterSection,
    or
  })
}), templateOnly());

export { MktgFooter as default };
//# sourceMappingURL=footer.js.map

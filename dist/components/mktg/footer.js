import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

class FooterSection extends Component {
  get isCollapsible() {
    return this.args.isCollapsible ?? true;
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div class=\"col row\n        {{if this.isCollapsible \"row-cols-1 row-cols-md-auto\" \"row-cols-auto\"}}\n        align-items-center gy-4 my-0\" ...attributes>\n      {{yield}}\n    </div>\n  ", {
      strictMode: true
    }), this);
  }
}
const MarketingFooterComponent = setComponentTemplate(precompileTemplate("\n  <footer class=\"mt-auto p-2\" ...attributes>\n    <div class=\"container pt-0 mb-4\">\n      <div class=\"row row-cols-1 row-cols-md-auto justify-content-between align-items-center\">\n        {{#if (has-block \"nav\")}}\n          <FooterSection>\n            {{yield to=\"nav\"}}\n          </FooterSection>\n        {{/if}}\n        {{#if (has-block \"social-media\")}}\n          <FooterSection @isCollapsible={{false}} class={{unless (has-block \"nav\") \"ms-md-auto\"}}>\n            {{yield to=\"social-media\"}}\n          </FooterSection>\n        {{/if}}\n      </div>\n      {{#if @hasDivider}}\n        <hr class=\"mb-0 mt-4\" />\n      {{/if}}\n      {{#if (or (has-block \"brand\") (has-block \"legal\"))}}\n        <div class=\"row row-cols-1 row-cols-md-auto justify-content-between align-items-center\">\n          {{#if (has-block \"brand\")}}\n            <FooterSection>\n              {{yield to=\"brand\"}}\n            </FooterSection>\n          {{/if}}\n          {{#if (has-block \"legal\")}}\n            <FooterSection class={{unless (has-block \"nav\") \"ms-md-auto\"}}>\n              {{yield to=\"legal\"}}\n            </FooterSection>\n          {{/if}}\n        </div>\n      {{/if}}\n    </div>\n  </footer>\n", {
  strictMode: true,
  scope: () => ({
    FooterSection,
    or
  })
}), templateOnly());

export { MarketingFooterComponent as default };
//# sourceMappingURL=footer.js.map

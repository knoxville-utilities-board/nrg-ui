import Card from '../card.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const MktgCard = setComponentTemplate(precompileTemplate("{{#if @horizontal}}\n  <Card @hasBorder={{@hasBorder}} ...attributes>\n    <:body>\n      <div class=\"row-md d-flex flex-column flex-md-row p-md-3\">\n        <div class=\"col-md d-flex flex-column justify-content-start pb-2\">\n          <div class=\"d-flex flex-column justify-content-between w-100 m-0\">\n            {{#if @title}}\n              <p class=\"fw-bold fs-5 m-0\">{{@title}}</p>\n            {{/if}}\n            {{yield to=\"callout\"}}\n            {{yield to=\"start\"}}\n          </div>\n        </div>\n        {{#if (has-block \"end\")}}\n          <div class=\"col-md-1 d-flex justify-content-center\">\n            <div class=\"vr d-none d-md-flex text-body-secondary\"></div>\n          </div>\n          <hr class=\"d-flex d-md-none text-body-secondary\" />\n          <div class=\"col-md\">\n            {{yield to=\"end\"}}\n          </div>\n        {{/if}}\n      </div>\n    </:body>\n  </Card>\n{{else}}\n  <Card @hasBorder={{@hasBorder}} @hasHorizontalDivider={{@hasHorizontalDivider}} ...attributes>\n    <:header>\n      <div class=\"d-flex flex-column justify-content-start align-items-center bg-body mb-2\">\n        {{#if @leftAlignCallout}}\n          <div class=\"d-flex flex-column justify-content-start w-100 m-0\">\n            {{yield to=\"callout\"}}\n            <p class=\"fw-bold fs-4 mt-2\">{{@title}}</p>\n          </div>\n        {{else}}\n          <div class=\"d-flex flex-row justify-content-between w-100 m-0\">\n            <p class=\"fw-bold fs-4 mt-2\">{{@title}}</p>\n            {{yield to=\"callout\"}}\n          </div>\n        {{/if}}\n        <div class=\"align-self-start\">\n          <p class=\"m-0 mb-2 text-body-secondary\">{{@subtitle}}</p>\n        </div>\n        {{yield to=\"start\"}}\n      </div>\n    </:header>\n    <:body>\n      {{yield to=\"end\"}}\n    </:body>\n  </Card>\n{{/if}}", {
  strictMode: true,
  scope: () => ({
    Card
  })
}), templateOnly());

export { MktgCard as default };
//# sourceMappingURL=card.js.map

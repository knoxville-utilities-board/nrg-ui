import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const MktgPromo = setComponentTemplate(precompileTemplate("{{#if @vertical}}\n  <div ...attributes>\n    <div class=\"d-flex justify-content-center mb-5\">\n      <div class=\"col-12 col-md-10 justify-content-center\">\n        {{yield to=\"img\"}}\n        <div class=\"ms-md-4\">\n          <p class=\"fw-semibold fs-3 my-2\">{{@productName}}</p>\n          {{yield to=\"description\"}}\n        </div>\n      </div>\n    </div>\n  </div>\n{{else}}\n  <div class=\"row\" ...attributes>\n    <div class=\"col-12 col-md-6 d-flex flex-column justify-content-center\">\n      <div class=\"p-3 p-md-5\">\n        <p class=\"text-uppercase p-0 my-2 fw-semibold\">{{@productName}}</p>\n        <div class=\"mb-3 fs-1 fw-semibold lh-sm\">{{yield to=\"header\"}}</div>\n        {{yield to=\"description\"}}\n      </div>\n    </div>\n    <div class=\"col-12 col-md-6 p-0 d-flex flex-column\">\n      {{yield to=\"img\"}}\n    </div>\n  </div>\n{{/if}}", {
  strictMode: true
}), templateOnly());

export { MktgPromo as default };
//# sourceMappingURL=promo.js.map

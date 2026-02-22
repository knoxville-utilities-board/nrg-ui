import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const Footer = setComponentTemplate(precompileTemplate("<footer class=\"border-top border-1 border-dark-subtle mt-auto fs-6\" ...attributes>\n  <div class=\"container-fluid py-2 px-2 px-sm-4\">\n    <div class=\"row row-cols-auto justify-content-between align-content-center m-0\">\n      {{#if (has-block \"left\")}}\n        <div class=\"col row row-cols-auto align-content-center small ms-0 me-auto\">\n          {{yield to=\"left\"}}\n        </div>\n      {{/if}}\n      {{#if (has-block \"right\")}}\n        <div class=\"col row row-cols-auto align-content-center small me-0 ms-auto\">\n          {{yield to=\"right\"}}\n        </div>\n      {{/if}}\n    </div>\n  </div>\n</footer>", {
  strictMode: true
}), templateOnly());

export { Footer as default };
//# sourceMappingURL=footer.js.map

import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const MktgSectionHeader = setComponentTemplate(precompileTemplate("<div class=\"col-12 d-flex flex-column align-items-center\">\n  <div class=\"text-center\" ...attributes>\n    <p class=\"text-uppercase p-0 m-0 fw-semibold\">{{@subject}}</p>\n    <p class=\"mx-0 mb-2 fw-semibold fs-1\">{{@title}}</p>\n    {{yield to=\"subheader\"}}\n  </div>\n</div>", {
  strictMode: true
}), templateOnly());

export { MktgSectionHeader as default };
//# sourceMappingURL=section-header.js.map

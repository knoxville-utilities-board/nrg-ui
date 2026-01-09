import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const MktgWorkflowTray = setComponentTemplate(precompileTemplate("<div class=\"col-12 col-md-5 col-lg-4 py-0 py-md-5 px-4 px-md-3 order-2 order-md-1 bg-body\" ...attributes>\n  <div class=\"m-2\">\n    {{yield}}\n  </div>\n</div>", {
  strictMode: true
}), templateOnly());

export { MktgWorkflowTray as default };
//# sourceMappingURL=workflow-tray.js.map

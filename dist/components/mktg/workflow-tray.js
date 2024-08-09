import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const MktgWorkflowTray = setComponentTemplate(precompileTemplate("\n  <div class=\"col-12 col-md-5 col-lg-4 py-5 px-4 px-md-3 bg-light order-2 order-md-1\" ...attributes>\n    <div class=\"m-2\">\n      {{yield}}\n    </div>\n  </div>\n", {
  strictMode: true
}), templateOnly());

export { MktgWorkflowTray as default };
//# sourceMappingURL=workflow-tray.js.map

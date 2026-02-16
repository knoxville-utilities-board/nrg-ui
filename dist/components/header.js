import { classes } from '../helpers/classes.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const Header = setComponentTemplate(precompileTemplate("<div class={{classes \"row row-cols-12 p-1 justify-content-between align-items-center\" (unless @flexCollapse \"flex-nowrap\")}} ...attributes>\n  <div class={{classes \"col d-flex align-items-center app-bar-left\" (if @flexCollapse \"flex-grow-0 text-nowrap\" \"justify-content-start\")}}>\n    {{yield to=\"left\"}}\n  </div>\n  {{#if (has-block \"center\")}}\n    <div class={{classes \"col d-flex align-items-center app-bar-center\" (if @flexCollapse \"flex-grow-0 text-nowrap\" \"justify-content-center\")}}>\n      {{yield to=\"center\"}}\n    </div>\n  {{/if}}\n  <div class={{classes \"col d-flex align-items-center app-bar-right\" (if @flexCollapse \"flex-grow-0 text-nowrap\" \"justify-content-end\")}}>\n    {{yield to=\"right\"}}\n  </div>\n  {{#if (has-block \"mobile-drop-section\")}}\n    <div class=\"d-flex col-12 d-md-none order-last justify-content-center\">\n      <div class=\"d-flex flex-row text-nowrap align-items-center\">\n        {{yield to=\"mobile-drop-section\"}}\n      </div>\n    </div>\n  {{/if}}\n</div>", {
  strictMode: true,
  scope: () => ({
    classes
  })
}), templateOnly());

export { Header as default };
//# sourceMappingURL=header.js.map

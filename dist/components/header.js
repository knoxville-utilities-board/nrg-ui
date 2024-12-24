import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const HeaderComponent = setComponentTemplate(precompileTemplate("\n  <div class=\"row row-cols-12 p-1 align-items-center justify-content-evenly\" ...attributes>\n    <div class=\"col d-flex justify-content-start\">\n      {{yield to=\"left\"}}\n    </div>\n    {{#if (has-block \"center\")}}\n      <div class=\"col d-flex justify-content-center flex-row flex-no-wrap\">\n        {{yield to=\"center\"}}\n      </div>\n    {{/if}}\n    <div class=\"col d-flex justify-content-end\">\n      {{yield to=\"right\"}}\n    </div>\n    {{#if (has-block \"mobile-drop-section\")}}\n      <div class=\"d-flex col-12 d-md-none order-last justify-content-center\">\n        <div class=\"d-flex flex-row text-nowrap\">\n          {{yield to=\"mobile-drop-section\"}}\n        </div>\n      </div>\n    {{/if}}\n  </div>\n", {
  strictMode: true
}), templateOnly());

export { HeaderComponent as default };
//# sourceMappingURL=header.js.map

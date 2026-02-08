import Header from '../header.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const MktgHeader = setComponentTemplate(precompileTemplate("<Header class=\"bg-body top-0 sticky-top w-100 gx-0 border border-bottom\" @flexCollapse={{@flexCollapse}} ...attributes>\n  <:left>\n    {{yield to=\"brand\"}}\n  </:left>\n  <:center>\n    {{#if (has-block \"title\")}}\n      <div class=\"justify-content-center align-items-center text-center text-nowrap fw-bold m-0 fs-4\">\n        {{yield to=\"title\"}}\n      </div>\n    {{/if}}\n    <div class=\"d-none d-md-flex\">\n      <div class=\"d-flex flex-row mt-2 mx-2 text-nowrap\">\n        {{yield to=\"options\"}}\n      </div>\n    </div>\n  </:center>\n  <:right>\n    <div class=\"col d-flex justify-content-end\">\n      {{yield to=\"nav\"}}\n    </div>\n  </:right>\n  <:mobile-drop-section>\n    {{#if @dropSection}}\n      <div class=\"d-flex flex-row mt-2 mx-2 text-nowrap\">\n        {{yield to=\"options\"}}\n      </div>\n    {{/if}}\n  </:mobile-drop-section>\n</Header>", {
  strictMode: true,
  scope: () => ({
    Header
  })
}), templateOnly());

export { MktgHeader as default };
//# sourceMappingURL=header.js.map

import { t } from 'ember-intl';
import Button from './button.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const PageNotFound = setComponentTemplate(precompileTemplate("<div class=\"p-5 d-flex flex-column bg-body\" ...attributes>\n  <p class=\"fw-bold fs-1 m-0\">\n    {{t \"nrg.page-not-found.title\"}}\n  </p>\n  <hr class=\"w-100\" />\n  <p class=\"fw-semibold fs-5 m-0 mb-3\">\n    {{t \"nrg.page-not-found.message\"}}\n  </p>\n  {{#if @url}}\n    <a href={{@url}}>\n      <Button class=\"btn-primary\" @text=\"Back to Home\" />\n    </a>\n  {{/if}}\n</div>", {
  strictMode: true,
  scope: () => ({
    t,
    Button
  })
}), templateOnly());

export { PageNotFound as default };
//# sourceMappingURL=page-not-found.js.map

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
export default <template>{{pageTitle "Components"}}
<div class="row g-0">
  <div class="col px-md-0 py-3">
    {{outlet}}
  </div>
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
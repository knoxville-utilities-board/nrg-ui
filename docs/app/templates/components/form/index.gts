import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Form from "../../../components/f/components/form/index.gts";
export default <template>{{pageTitle "Form"}}

<div class="mx-3 me-md-4">
  <Form />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
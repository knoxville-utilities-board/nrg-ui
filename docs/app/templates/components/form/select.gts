import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Select from "../../../components/f/components/form/select.gts";
export default <template>{{pageTitle "Select"}}

<div class="container mx-auto">
  <Select />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
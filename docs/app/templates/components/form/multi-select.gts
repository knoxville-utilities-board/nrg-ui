import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import MultiSelect from "../../../components/f/components/form/multi-select.gts";
export default <template>{{pageTitle "Multi Select"}}

<div class="container mx-auto">
  <MultiSelect />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
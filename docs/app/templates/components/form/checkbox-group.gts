import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import CheckboxGroup from "../../../components/f/components/form/checkbox-group.gts";
export default <template>{{pageTitle "Checkbox Group"}}

<div class="container mx-auto">
  <CheckboxGroup />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
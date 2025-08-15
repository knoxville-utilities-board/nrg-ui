import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Checkbox from "../../../components/f/components/form/checkbox.gts";
export default <template>{{pageTitle "Checkbox"}}

<div class="container mx-auto">
  <Checkbox />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
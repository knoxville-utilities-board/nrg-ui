import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Datetime from "../../../components/f/components/form/datetime.gts";
export default <template>{{pageTitle "Datetime"}}

<div class="container mx-auto">
  <Datetime />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
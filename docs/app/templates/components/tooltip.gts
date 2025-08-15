import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Tooltip from "../../components/f/components/tooltip.gts";
export default <template>{{pageTitle "Tooltip"}}

<div class="container mx-auto">
  <Tooltip />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
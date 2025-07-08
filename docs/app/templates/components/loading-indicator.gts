import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import LoadingIndicator from "../../components/f/components/loading-indicator.gts";
export default <template>{{pageTitle "Loading Indicator"}}

<div class="container mx-auto">
  <LoadingIndicator />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import ServicePricing from "../../components/f/mktg-components/service-pricing.gts";
export default <template>{{pageTitle "ServicePricing"}}

<div class="container mx-auto">
  <ServicePricing />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import PromoContainer from "../../components/f/mktg-components/promo-container.gts";
export default <template>{{pageTitle "Promo Container"}}

<div class="container mx-auto">
  <PromoContainer />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
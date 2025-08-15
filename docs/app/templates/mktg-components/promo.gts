import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Promo from "../../components/f/mktg-components/promo.gts";
export default <template>{{pageTitle "Promo"}}

<div class="container mx-auto">
  <Promo />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Faq from "../../components/f/mktg-components/faq.gts";
export default <template>{{pageTitle "FAQ"}}

<div class="container mx-auto">
  <Faq />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
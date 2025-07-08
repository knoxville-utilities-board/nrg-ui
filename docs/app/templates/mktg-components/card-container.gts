import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import CardContainer from "../../components/f/mktg-components/card-container.gts";
export default <template>{{pageTitle "Card Container"}}

<div class="container mx-auto">
  <CardContainer />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Card from "../../components/f/mktg-components/card.gts";
export default <template>{{pageTitle "Card"}}

<div class="container mx-auto">
  <Card />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Header from "../../components/f/components/header.gts";
export default <template>{{pageTitle "Header"}}

<div class="container mx-auto">
  <Header />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
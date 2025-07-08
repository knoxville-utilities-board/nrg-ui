import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Footer from "../../components/f/mktg-components/footer.gts";
export default <template>{{pageTitle "Footer"}}

<div class="container mx-auto">
  <Footer />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
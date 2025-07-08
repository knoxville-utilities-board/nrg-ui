import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Navbar from "../../components/f/components/navbar.gts";
export default <template>{{pageTitle "Navbar"}}

<div class="container mx-auto">
  <Navbar />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
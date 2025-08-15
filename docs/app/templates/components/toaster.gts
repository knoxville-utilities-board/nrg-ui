import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Toaster from "../../components/f/components/toaster.gts";
export default <template>{{pageTitle "Toaster"}}

<div class="container mx-auto">
  <Toaster />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
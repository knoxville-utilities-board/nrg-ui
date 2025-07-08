import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Button from "../../components/f/components/button.gts";
export default <template>{{pageTitle "Button"}}

<div class="container mx-auto">
  <Button />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
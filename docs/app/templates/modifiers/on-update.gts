import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import OnUpdate from "../../components/f/modifiers/on-update.gts";
export default <template>{{pageTitle "on-update"}}

<div class="container mx-auto">
  <OnUpdate />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
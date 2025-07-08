import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import OnDestroy from "../../components/f/modifiers/on-destroy.gts";
export default <template>{{pageTitle "on-destroy"}}

<div class="container mx-auto">
  <OnDestroy />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import OnClickOutside from "../../components/f/modifiers/on-click-outside.gts";
export default <template>{{pageTitle "on-click-outside"}}

<div class="container mx-auto">
  <OnClickOutside />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import OnInsert from "../../components/f/modifiers/on-insert.gts";
export default <template>{{pageTitle "on-insert"}}

<div class="container mx-auto">
  <OnInsert />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
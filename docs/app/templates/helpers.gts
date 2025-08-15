import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
export default <template>{{pageTitle "Helpers"}}
{{outlet}}</template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
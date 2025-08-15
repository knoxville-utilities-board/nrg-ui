import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import ThemePage from "../components/theme-page.gts";
export default <template>{{pageTitle "theme"}}

<ThemePage /></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import SectionHeader from "../../components/f/mktg-components/section-header.gts";
export default <template>{{pageTitle "Section Header"}}

<div class="container mx-auto">
  <SectionHeader />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
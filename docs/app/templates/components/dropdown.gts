import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Dropdown from "../../components/f/components/dropdown.gts";
export default <template>{{pageTitle "Dropdown"}}

<div class="container mx-auto">
  <Dropdown />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
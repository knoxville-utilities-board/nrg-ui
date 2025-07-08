import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Popover from "../../components/f/components/popover.gts";
export default <template>{{pageTitle "Popover"}}

<div class="container mx-auto">
  <Popover />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
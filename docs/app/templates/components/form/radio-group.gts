import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import RadioGroup from "../../../components/f/components/form/radio-group.gts";
export default <template>{{pageTitle "Radio Group"}}

<div class="container mx-auto">
  <RadioGroup />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
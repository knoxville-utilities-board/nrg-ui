import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import TextInput from "../../../components/f/components/form/text-input.gts";
export default <template>{{pageTitle "Text Input"}}

<div class="container mx-auto">
  <TextInput />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
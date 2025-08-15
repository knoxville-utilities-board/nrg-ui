import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import PhoneInput from "../../../components/f/components/form/phone-input.gts";
export default <template>{{pageTitle "Phone Input"}}

<div class="container mx-auto">
  <PhoneInput />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import TextArea from "../../../components/f/components/form/text-area.gts";
export default <template>{{pageTitle "Text Area"}}

<div class="container mx-auto">
  <TextArea />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
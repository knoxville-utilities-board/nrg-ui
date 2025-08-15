import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Modal from "../../components/f/components/modal.gts";
export default <template>{{pageTitle "Modal"}}

<div class="container mx-auto">
  <Modal />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
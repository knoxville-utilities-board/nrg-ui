import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import FileUpload from "../../../components/f/components/form/file-upload.gts";
export default <template>{{pageTitle "File Upload"}}

<div class="container mx-auto">
  <FileUpload />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
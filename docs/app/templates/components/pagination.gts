import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Pagination from "../../components/f/components/pagination.gts";
export default <template>{{pageTitle "Pagination"}}

<div class="container mx-auto">
  <Pagination />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
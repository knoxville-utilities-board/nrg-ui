import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Search from "../../../components/f/components/form/search.gts";
export default <template>{{pageTitle "Search"}}

<div class="container mx-auto">
  <Search />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import ContextMenu from "../../components/f/components/context-menu.gts";
export default <template>{{pageTitle "Context Menu"}}

<div class="container mx-auto">
  <ContextMenu />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Icon from "../../components/f/components/icon.gts";
export default <template>{{pageTitle "Icon"}}

<div class="container mx-auto">
  <Icon />
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
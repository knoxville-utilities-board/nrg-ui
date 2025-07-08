import type { TemplateOnlyComponent } from '@ember/component/template-only';
import StackedPane from "@nrg-ui/core/components/stacked-pane";
export default <template><StackedPane @placeholder={{true}}>
  Select an item
</StackedPane></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import Sidebar from "@nrg-ui/core/components/sidebar";
export default <template>{{pageTitle "Modifiers"}}

<div class="row g-0">
  <Sidebar as |Sidebar|>
    <Sidebar.Group @header="Modifiers">
      <:group as |Item|>
        <Item @route="modifiers.on-click-outside">
          on-click-outside
        </Item>
        <Item @route="modifiers.on-destroy">
          on-destroy
        </Item>
        <Item @route="modifiers.on-insert">
          on-insert
        </Item>
        <Item @route="modifiers.on-update">
          on-update
        </Item>
      </:group>
    </Sidebar.Group>
  </Sidebar>
  <div class="col px-md-0 py-3">
    {{outlet}}
  </div>
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
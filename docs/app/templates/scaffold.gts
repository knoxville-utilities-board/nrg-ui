import type { TemplateOnlyComponent } from '@ember/component/template-only';
import pageTitle from "ember-page-title/helpers/page-title";
import getCodeSnippet from "ember-code-snippet/helpers/get-code-snippet";
import CodeBlock from "../components/code-block.gts";
export default <template>{{pageTitle "Scaffold"}}

<div class="row g-0">
  <div class="col px-md-0 py-3">
    <div class="container mx-auto">
      {{#let (getCodeSnippet "scaffold-component.hbs") as |snippet|}}
        <CodeBlock class="border rounded simple p-3" @lang={{snippet.language}} @code={{snippet.source}} />
      {{/let}}
    </div>
  </div>
</div></template> satisfies TemplateOnlyComponent<{ Args: { model: unknown, controller: unknown } }>
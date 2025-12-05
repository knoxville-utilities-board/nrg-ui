import { getSnippet } from '@nrg-ui/code-snippets/helper';
import CodeBlock from '@nrg-ui/showcase/components/code-block';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "Scaffold"}}

  <div class="row g-0">
    <div class="col px-md-0 py-3">
      <div class="container mx-auto">
        {{#let (getSnippet "scaffold-component") as |snippet|}}
          <CodeBlock
            @code={{snippet.code}}
            @lang="glimmer-template"
            @showLineNumbers={{true}}
          >
            <:name>
              <strong>
                Docs App
              </strong>
            </:name>
          </CodeBlock>
        {{/let}}
      </div>
    </div>
  </div>
</template>

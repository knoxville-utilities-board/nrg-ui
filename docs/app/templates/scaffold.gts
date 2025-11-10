import CodeBlock from '@nrg-ui/showcase/components/code-block';
import getCodeSnippet from 'ember-code-snippet/helpers/get-code-snippet';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "Scaffold"}}

  <div class="row g-0">
    <div class="col px-md-0 py-3">
      <div class="container mx-auto">
        {{#let (getCodeSnippet "scaffold-component.gts") as |snippet|}}
          <CodeBlock @lang={{snippet.language}} @code={{snippet.source}} />
        {{/let}}
      </div>
    </div>
  </div>
</template>

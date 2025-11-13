import { codeSnippet } from '@nrg-ui/core/helpers/code-snippet';
import CodeBlock from '@nrg-ui/showcase/components/code-block';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "Scaffold"}}

  <div class="row g-0">
    <div class="col px-md-0 py-3">
      <div class="container mx-auto">
        {{#let (codeSnippet "scaffold-component") as |snippet|}}
          <CodeBlock @lang="glimmer-template" @code={{snippet.code}} />
        {{/let}}
      </div>
    </div>
  </div>
</template>

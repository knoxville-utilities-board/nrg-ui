import { LinkTo } from '@ember/routing';
import StackedPane from '@nrg-ui/core/components/stacked-pane';
import Container from '@nrg-ui/core/components/stacked-pane/container';
import CodeBlock from '@nrg-ui/showcase/components/code-block';
import getCodeSnippet from 'ember-code-snippet/helpers/get-code-snippet';

<template>
  {{! template-lint-disable no-inline-styles }}
  {{! BEGIN-SNIPPET side-by-side-component }}
  <Container style="min-height: fit-content;">
    <StackedPane>
      <ul class="list-group">
        <LinkTo
          class="list-group-item"
          @route="side-by-side.detail"
          @model={{1}}
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Person Name 1</h5>
            <small>Employee Number</small>
          </div>
          <p class="mb-1">Mail - Department</p>
          <small>Phone</small>
        </LinkTo>
        <LinkTo
          class="list-group-item"
          @route="side-by-side.detail"
          @model={{2}}
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Person Name 2</h5>
            <small>Employee Number</small>
          </div>
          <p class="mb-1">Mail - Department</p>
          <small>Phone</small></LinkTo>
        <LinkTo
          class="list-group-item"
          @route="side-by-side.detail"
          @model={{3}}
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Person Name 3</h5>
            <small>Employee Number</small>
          </div>
          <p class="mb-1">Mail - Department</p>
          <small>Phone</small></LinkTo>
        <LinkTo
          class="list-group-item"
          @route="side-by-side.detail"
          @model={{4}}
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Person Name 4</h5>
            <small>Employee Number</small>
          </div>
          <p class="mb-1">Mail - Department</p>
          <small>Phone</small></LinkTo>
        <LinkTo
          class="list-group-item"
          @route="side-by-side.detail"
          @model={{5}}
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Person Name 5</h5>
            <small>Employee Number</small>
          </div>
          <p class="mb-1">Mail - Department</p>
          <small>Phone</small></LinkTo>
      </ul>
    </StackedPane>
    {{outlet}}
  </Container>
  {{! END-SNIPPET }}

  <div class="row g-0">
    <div class="col px-md-0 py-3">
      <div class="container mx-auto">
        {{#let (getCodeSnippet "side-by-side-component.gts") as |snippet|}}
          <CodeBlock @lang="glimmer-template" @code={{snippet.source}} />
        {{/let}}
      </div>
    </div>
  </div>
</template>

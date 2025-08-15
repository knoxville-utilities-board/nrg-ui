import { fn } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import Pagination from '@nrg-ui/core/components/pagination';
import StackedPane, {
  Container as StackedPaneContainer,
} from '@nrg-ui/core/components/stacked-pane';
import { getCodeSnippet } from 'ember-code-snippet';

import CodeBlock from '../components/code-block';

<template>
  {{! template-lint-disable no-inline-styles }}
  <div class="row g-0">
    <div class="col px-md-0 py-3">
      <div class="container mx-auto">
        <h2>Stacked Pane</h2>
      </div>
    </div>
  </div>
  {{! BEGIN-SNIPPET stacked-pane-component }}
  <StackedPaneContainer style="min-height: fit-content;">
    <StackedPane>
      <ul class="list-group">
        {{#each this.shortRange as |item|}}
          <LinkTo
            class="list-group-item"
            @route="stacked-pane.selected-item"
            @model={{item}}
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Account {{item}}</h5>
              <small>Person Name</small>
            </div>
            <p class="mb-1">Email</p>
            <small>Phone</small>
          </LinkTo>
        {{/each}}
      </ul>
    </StackedPane>
    {{outlet}}
  </StackedPaneContainer>
  {{! END-SNIPPET }}

  <div class="row g-0">
    <div class="col px-md-0 py-3">
      <div class="container mx-auto">
        {{#let (getCodeSnippet "stacked-pane-component.hbs") as |snippet|}}
          <CodeBlock
            class="border rounded simple p-3"
            @lang={{snippet.language}}
            @code={{snippet.source}}
          />
        {{/let}}
      </div>
    </div>
  </div>

  <div class="row g-0">
    <div class="col px-md-0 py-3">
      <div class="container mx-auto">
        <h2>Stacked Pane with Pagination</h2>
        {{! BEGIN-SNIPPET stacked-pane-pagination-component }}

        <StackedPaneContainer style="min-height: fit-content;">
          <StackedPane>
            <Pagination
              class="pagination-container"
              @compact={{true}}
              @meta={{this.meta}}
              @onChangePage={{fn this.update "start"}}
            />
            <ul class="list-group">
              {{#each this.longRange as |item|}}
                <LinkTo
                  class="list-group-item"
                  @route="stacked-pane.selected-item"
                  @model={{item}}
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Account {{item}}</h5>
                    <small>Person Name</small>
                  </div>
                  <p class="mb-1">Email</p>
                  <small>Phone</small>
                </LinkTo>
              {{/each}}
            </ul>
            <Pagination
              class="pagination-container"
              @compact={{true}}
              @meta={{this.meta}}
              @onChangePage={{fn this.update "start"}}
            />
          </StackedPane>
          {{outlet}}
        </StackedPaneContainer>
        {{! END-SNIPPET }}
      </div>
    </div>
  </div>

  <div class="row g-0">
    <div class="col px-md-0 py-3">
      <div class="container mx-auto">
        {{#let (getCodeSnippet "stacked-pane-controller.ts") as |snippet|}}
          <CodeBlock
            class="border rounded simple p-3"
            @lang={{snippet.language}}
            @code={{snippet.source}}
          />
        {{/let}}
        {{#let
          (getCodeSnippet "stacked-pane-pagination-component.hbs")
          as |snippet|
        }}
          <CodeBlock
            class="border rounded simple p-3"
            @lang={{snippet.language}}
            @code={{snippet.source}}
          />
        {{/let}}
      </div>
    </div>
  </div>
</template>

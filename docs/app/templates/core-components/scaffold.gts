import { getSnippet } from '@nrg-ui/code-snippets/helper';
import CodeBlock from '@nrg-ui/showcase/components/code-block';
import Section from '@nrg-ui/showcase/components/section';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "Scaffold"}}
  <div class="container mx-auto">
    <Section @name="Scaffold" @importSlug="base" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="allowThemes"
              @hideControl={{true}}
              @defaultValue={{true}}
              @description="When true, the scaffold will allow theme switching."
            />
            <Args.String
              @name="contextMenuId"
              @hideControl={{true}}
              @defaultValue="application"
              @description="The id of the context menu to use for this scaffold. This should correspond to the id of a ContextMenu component rendered within the scaffold's context-menu block."
            />
            <Args.String
              @name="environment"
              @hideControl={{true}}
              @defaultValue="prod"
              @description="The current environment rendered as <AppBar.Environment />"
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
    </Section>

    {{#let (getSnippet "scaffold-component") as |snippet|}}
      <CodeBlock @lang="typescript" @code={{snippet.code}} />
    {{/let}}
  </div>
</template>

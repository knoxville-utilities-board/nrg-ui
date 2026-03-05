import MktgCardContainer from '@nrg-ui/core/components/mktg/card-container';
import Section from '@nrg-ui/showcase/components/section';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "Card Container"}}

  <div class="container mx-auto">
    <Section @name="Card Container" @importSlug="mktg" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example>
          <MktgCardContainer as |Container|>
            <Container.Card class="g-col-12 g-col-md-6">
              <:header>
                <p class="m-0">Header</p>
              </:header>
              <:body>
                <p class="m-0">Body</p>
              </:body>
            </Container.Card>
            <Container.MktgCard class="g-col-12 g-col-md-6" @title="Title" @subtitle="Subtitle">
              <:callout>
                <p class="m-0 fw-semibold fs-2">Callout</p>
              </:callout>
              <:end>
                <p class="m-0">End section</p>
              </:end>
            </Container.MktgCard>
          </MktgCardContainer>
        </:example>
      </Section.Subsection>
    </Section>
  </div>
</template>

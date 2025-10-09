import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { MktgCardContainer } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class CardContainerDemo extends Component {
  @tracked
  class = '';

  <template>
    {{! @glint-expect-error - Freestyle doesn't have great types }}
    <FreestyleSection @name="Card Container" as |Section|>
      <Section.subsection @name="Basics">
        {{! @glint-expect-error - Freestyle doesn't have great types }}
        <FreestyleUsage>
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
              <Container.MktgCard
                class="g-col-12 g-col-md-6"
                @title="Title"
                @subtitle="Subtitle"
              >
                <:callout>
                  <p class="m-0 fw-semibold fs-2">Callout</p>
                </:callout>
                <:end>
                  <p class="m-0">End section</p>
                </:end>
              </Container.MktgCard>
            </MktgCardContainer>
          </:example>
          <:description>
            <p>This component acts as a container for the base card and the
              marketing name-spaced card components. Note that the container
              implements Bootstrap's CSS grid, so to determine organization, a
              class of 'g-col-{number}' needs to be passed to each child card of
              the container.
              <br />Note that the cards within the container must be implemented
              using dot notation.</p>
          </:description>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

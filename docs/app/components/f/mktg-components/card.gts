import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import MktgCard from '@nrg-ui/core/components/mktg/card';
import Section from '@nrg-ui/showcase/components/section';

export default class CardDemo extends Component {
  @tracked
  title = 'Title';

  @tracked
  subtitle = 'Subtitle';

  @tracked
  leftAlignCallout = false;

  @tracked
  horizontal = false;

  @tracked
  hasBorder = true;

  @tracked
  hasHorizontalDivider = true;

  <template>
    <Section @name="Card" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <MktgCard
            class="col-12 col-md-6"
            @hasBorder={{model.hasBorder}}
            @hasHorizontalDivider={{model.hasHorizontalDivider}}
            @horizontal={{model.horizontal}}
            @leftAlignCallout={{model.leftAlignCallout}}
            @subtitle={{model.subtitle}}
            @title={{model.title}}
          >
            <:callout>
              <p class="m-0 fw-semibold fs-2">$20/mo</p>
            </:callout>
            <:start>
              <p class="d-flex align-self-start m-0">Start section</p>
            </:start>
            <:end>
              <p class="m-0">End section</p>
            </:end>
          </MktgCard>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="hasBorder"
              @description="When false, the card's border is removed."
              @defaultValue={{true}}
            />
            <Args.Boolean
              @name="hasHorizontalDivider"
              @description="When false, the card's horizontal divider is removed."
              @defaultValue={{true}}
            />
            <Args.Boolean
              @name="horizontal"
              @description="When true, the card's layout will be horizontal. Note that the default layout is vertical."
              @defaultValue={{false}}
            />
            <Args.Boolean
              @name="leftAlignCallout"
              @description="When true, callout will render on the left side of the card. Note that this only affects layout when @horizontal is false."
              @defaultValue={{false}}
            />
            <Args.String @name="subtitle" @description="The subtitle for the card" />
            <Args.String @name="title" @description="The title for the card" />
          </Api.Arguments>
          <Api.Blocks as |Block|>
            <Block
              @name="callout"
              @description="Named yield block to render a callout in the card."
            />
            <Block
              @name="end"
              @description="Named yield block to render content at the end of the card. This refers to the bottom of the card in vertical orientation and the right of the card in horizontal orientation."
            />
            <Block
              @name="start"
              @description="Named yield block to render content at the start of the card. This refers to the top of the card in vertical orientation and the left of the card in horizontal orientation."
            />
          </Api.Blocks>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

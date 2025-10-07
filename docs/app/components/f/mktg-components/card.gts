// @ts-nocheck - TODO

import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { MktgCard } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class CardDemo extends Component {
  @tracked
  class = 'col-12 col-md-6';

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

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Card" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <MktgCard
              class={{this.class}}
              @hasBorder={{this.hasBorder}}
              @hasHorizontalDivider={{this.hasHorizontalDivider}}
              @horizontal={{this.horizontal}}
              @leftAlignCallout={{this.leftAlignCallout}}
              @subtitle={{this.subtitle}}
              @title={{this.title}}
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
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the card. Note that this is not an argument but rather a class applied directly to the card."
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Bool
              @name="hasBorder"
              @description="When false, the card's border is removed."
              @value={{this.hasBorder}}
              @defaultValue={{true}}
              @onInput={{fn this.update "hasBorder"}}
            />
            <Args.Bool
              @name="hasHorizontalDivider"
              @description="When false, the card's horizontal divider is removed."
              @value={{this.hasHorizontalDivider}}
              @defaultValue={{true}}
              @onInput={{fn this.update "hasHorizontalDivider"}}
            />
            <Args.Bool
              @name="horizontal"
              @description="When true, the card's layout will be horizontal. Note that the default layout is vertical."
              @defaultValue={{false}}
              @value={{this.horizontal}}
              @onInput={{fn this.update "horizontal"}}
            />
            <Args.Bool
              @name="leftAlignCallout"
              @description="When true, callout will render on the left side of the card. Note that this only affects layout when @horizontal is false."
              @defaultValue={{false}}
              @value={{this.leftAlignCallout}}
              @onInput={{fn this.update "leftAlignCallout"}}
            />
            <Args.String
              @name="subtitle"
              @description="The subtitle for the card"
              @value={{this.subtitle}}
              @onInput={{fn this.update "subtitle"}}
            />
            <Args.String
              @name="title"
              @description="The title for the card"
              @value={{this.title}}
              @onInput={{fn this.update "title"}}
            />
            <Args.Yield
              @name="callout"
              @description="Named yield block to render a callout in the card."
            />
            <Args.Yield
              @name="end"
              @description="Named yield block to render content at the end of the card. This refers to the bottom of the card in vertical orientation and the right of the card in horizontal orientation."
            />
            <Args.Yield
              @name="start"
              @description="Named yield block to render content at the start of the card. This refers to the top of the card in vertical orientation and the left of the card in horizontal orientation."
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

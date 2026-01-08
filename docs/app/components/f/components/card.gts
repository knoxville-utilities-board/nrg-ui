import { array } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Card from '@nrg-ui/core/components/card';
import Section from '@nrg-ui/showcase/components/section';

export default class CardDemo extends Component {
  @tracked
  isClickable = false;

  @tracked
  hasBorder = true;

  @tracked
  hasHorizontalDivider = true;

  <template>
    <Section @name="Card" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <Card
            @hasBorder={{model.hasBorder}}
            @hasHorizontalDivider={{model.hasHorizontalDivider}}
            @isClickable={{model.isClickable}}
          >
            <:header>
              <p>Card header</p>
            </:header>
            <:body>
              <p>Card body</p>
            </:body>
          </Card>
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
              @name="isClickable"
              @description="When true, the card is given a role of button and allows for an onClick method parameter to be passed."
              @defaultValue={{false}}
            />
          </Api.Arguments>
          <Api.Actions as |Action p|>
            <Action
              @name="onClick"
              @description="The action to be called when the card is clicked."
              @parameters={{array
                (p "event" type="MouseEvent" description="The click event object")
              }}
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

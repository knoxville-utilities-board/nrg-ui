import { array } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Button } from '@nrg-ui/core';
import Section from '@nrg-ui/showcase/components/section';

export default class ButtonDemo extends Component {
  @tracked
  disabled = false;

  @tracked
  loading = false;

  @tracked
  text = 'Click me!';

  @tracked
  icon = 'bi-arrow-right';

  @tracked
  iconLabel?: string;

  @tracked
  iconPosition = 'left';

  <template>
    <Section @name="Button" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="button">
        <:example as |model|>
          <Button
            class="btn-primary"
            @disabled={{model.disabled}}
            @loading={{model.loading}}
            @text={{model.text}}
            @type={{model.type}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, the button will be disabled"
            />
            <Args.Boolean
              @name="loading"
              @defaultValue={{false}}
              @description="When true, the text will be replaced with a loading spinner"
            />
            <Args.String
              @name="text"
              @description="The text to display on the button"
            />
            <Args.String
              @name="type"
              @defaultValue="button"
              @description="The type of button"
              @options={{array "button" "submit"}}
            />
          </Api.Arguments>
          <Api.Actions as |Action p|>
            <Action
              @name="onClick"
              @parameters={{array (p "event" type="MouseEvent")}}
            />
          </Api.Actions>
          <Api.Blocks as |Block|>
            <Block
              @name="default"
              @description="The content to display inside the button"
            />
          </Api.Blocks>
        </:api>
      </Section.Subsection>

      <Section.Subsection @name="Icon" @model={{this}} @elementTag="button">
        <:example as |model|>
          <Button
            class="btn-primary"
            @icon={{model.icon}}
            @iconLabel={{model.iconLabel}}
            @iconPosition={{model.iconPosition}}
          >
            Go now
          </Button>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String @name="icon" @description="The icon to display" />
            <Args.String
              @name="iconLabel"
              @description="The label for the icon (for accessibility)"
            />
            <Args.String
              @name="iconPosition"
              @defaultValue="left"
              @description="The position of the icon relative to the text"
              @options={{array "left" "right"}}
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>

      <Section.Subsection
        @name="Icon-Only Button"
        @model={{this}}
        @elementTag="button"
      >
        <:example as |model|>
          <Button
            class="btn-primary"
            @icon={{model.icon}}
            @iconLabel={{model.iconLabel}}
            @iconPosition="center"
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String @name="icon" @description="The icon to display" />
            <Args.String
              @name="iconLabel"
              @description="The label for the icon (for accessibility)"
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

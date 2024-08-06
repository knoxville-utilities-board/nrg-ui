import Component from '@glimmer/component';
import Card from '@nrg-ui/ember/components/card';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import { fn } from '@ember/helper';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked
  isClickable = false;

  @tracked
  hasBorder = true;

  @tracked
  class = 'col-6';

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Card" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Card
              class={{this.class}}
              @hasBorder={{this.hasBorder}}
              @isClickable={{this.isClickable}}
              @onClick={{this.onClick}}
            >
              <:header>
                <p>Card header</p>
              </:header>
              <:body>
                <p>Card body</p>
              </:body>
            </Card>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the card. Note that this is not an argument but rather a class applied directly to the card and should be implemented for organiziation, utilizing Bootstrap flexbox grid using 'col-{number}'"
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
              @name="isClickable"
              @description="When true, the card is given a role of button and allows for an onClick method parameter to be passed."
              @value={{this.isClickable}}
              @defaultValue={{false}}
              @onInput={{fn this.update "isClickable"}}
            />
            <Args.Action
              @name="onClick"
              @description="The action to be called when the card is clicked."
              @hideControls={{true}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

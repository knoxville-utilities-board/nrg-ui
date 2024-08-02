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
  onClick?: (evt: MouseEvent) => unknown;

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
              @isClickable={{this.isClickable}}
              @onClick={{this.onClick}}
              @hasBorder={{this.hasBorder}}
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
              @defaultValue="none"
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

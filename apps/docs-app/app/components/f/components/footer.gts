import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Footer } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class extends Component {
  @tracked
  class = 'bg-body-secondary';

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Footer" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Footer class={{this.class}}>
              <:left>
                Left section
              </:left>
              <:right>
                Right Section
              </:right>
            </Footer>
          </:example>
          <:api as |Args|>
            <Args.String
              @description="The class to apply to the footer. Note that this is not an argument but rather a class applied directly to the footer"
              @name="class"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Yield
              @description="Named yield block that renders content in the left of the footer"
              @name="left"
            />
            <Args.Yield
              @description="Named yield block that renders content on the right side of the footer"
              @name="right"
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

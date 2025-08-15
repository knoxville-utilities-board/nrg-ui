import { fn } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Footer } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class FooterDemo extends Component {
  @tracked
  class = 'bg-body-secondary';

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  <template>
    {{! @glint-expect-error - Freestyle doesn't have great types }}
    <FreestyleSection @name="Footer" as |Section|>
      <Section.subsection @name="Basics">
        {{! @glint-expect-error - Freestyle doesn't have great types }}
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Footer': typeof FooterDemo;
  }
}

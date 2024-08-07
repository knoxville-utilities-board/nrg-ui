import Component from '@glimmer/component';
import Header from '@nrg-ui/ember/components/header';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import { fn } from '@ember/helper';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked
  class = 'bg-primary';

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Header" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <div class="container-fluid">
              <Header class={{this.class}}>
                <:left>
                  <p class="m-0">Left section</p>
                </:left>
                <:center>
                  <p class="m-0">Center Section</p>
                </:center>
                <:right>
                  <p class="m-0">Right Section</p>
                </:right>
                <:mobile-drop-section>
                  <p class="m-0">Visible on small screens</p>
                </:mobile-drop-section>
              </Header>
            </div>
          </:example>
          <:api as |Args|>
            <Args.String
              @description="The class to apply to the header. Note that this is not an argument but rather a class applied directly to the header"
              @name="class"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Yield
              @description="Named yield block that renders content in the center of the header"
              @name="center"
            />
            <Args.Yield
              @description="Named yield block that renders content on the left side of the header"
              @name="left"
            />
            <Args.Yield
              @description="Named yield block that renders content in a row below the header when on smaller screen sizes"
              @name="mobile-drop-section"
            />
            <Args.Yield
              @description="Named yield block that renders content on the right side of the header"
              @name="right"
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

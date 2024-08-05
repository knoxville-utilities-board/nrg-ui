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
                  <p class="m-0">Left Section</p>
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
              @name="class"
              @description="The class to apply to the header. Note that this is not an argument but rather a class applied directly to the header"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

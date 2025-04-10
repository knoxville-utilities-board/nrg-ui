// @ts-nocheck - TODO

import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Header } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class HeaderDemo extends Component {
  @tracked
  class = 'text-primary';

  @tracked
  flexCollapse = false;

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
              <Header class={{this.class}} @flexCollapse={{this.flexCollapse}}>
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
            <Args.Bool
              @name="flexCollapse"
              @description="Each of the sections of the flexbox container shrink to fit the content. Each section is also evenly spaced. This is most useful when one of the header sections contains more content than the others."
              @value={{this.flexCollapse}}
              @onInput={{fn this.update "flexCollapse"}}
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Header': typeof HeaderDemo;
  }
}

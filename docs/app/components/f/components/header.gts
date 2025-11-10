import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Header from '@nrg-ui/core/components/header';
import Section from '@nrg-ui/showcase/components/section';

export default class HeaderDemo extends Component {
  @tracked
  flexCollapse = false;

  <template>
    <Section @name="Header" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <div class="container-fluid">
            <Header @flexCollapse={{model.flexCollapse}}>
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
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="flexCollapse"
              @description="Each of the sections of the flexbox container shrink to fit the content. Each section is also evenly spaced. This is most useful when one of the header sections contains more content than the others."
            />
          </Api.Arguments>
          <Api.Blocks as |Block|>
            <Block
              @description="Named yield block that renders content in the center of the header"
              @name="center"
            />
            <Block
              @description="Named yield block that renders content on the left side of the header"
              @name="left"
            />
            <Block
              @description="Named yield block that renders content in a row below the header when on smaller screen sizes"
              @name="mobile-drop-section"
            />
            <Block
              @description="Named yield block that renders content on the right side of the header"
              @name="right"
            />
          </Api.Blocks>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

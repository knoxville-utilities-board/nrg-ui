import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Accordion from '@nrg-ui/core/components/accordion';
import Section from '@nrg-ui/showcase/components/section';

export default class AccordionDemo extends Component {
  @tracked
  title = 'Accordion Title';

  <template>
    <Section @name="Accordion" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <Accordion @title={{model.title}}>
            <:content>
              <p>Your content goes here</p>
            </:content>
          </Accordion>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="defaultOpen"
              @description="When true, the Accordion will default to being open on render"
              @defaultValue={{false}}
              @hideControl={{true}}
            />
            <Args.String
              @name="title"
              @description="The title for each Accordion"
              @required={{true}}
            />
          </Api.Arguments>
          <Api.Blocks as |Block|>
            <Block @description="Named yield block to render the hidden content" @name="content" />
          </Api.Blocks>
          <Api.Blocks as |Block|>
            <Block @description="Named yield block to render the title content" @name="title" />
          </Api.Blocks>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

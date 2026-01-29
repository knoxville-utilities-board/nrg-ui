import { array } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Accordion from '@nrg-ui/core/components/accordion';
import Section from '@nrg-ui/showcase/components/section';

export default class AccordionDemo extends Component {
  @tracked
  isOpen = false;

  @tracked
  title = 'Accordion Title';

  @action
  onToggle(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  @action
  onOpen() {}

  @action
  onClose() {}

  <template>
    <Section @name="Accordion" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <Accordion
            @title={{model.title}}
            @isOpen={{model.isOpen}}
            @onToggle={{model.onToggle}}
            @onOpen={{model.onOpen}}
            @onClose={{model.onClose}}
          >
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
          <Api.Actions as |Action p|>
            <Action
              @name="onOpen"
              @description="This action will be called when the whenever the accordion being opened. This gets called before onToggle."
              @returnType="Promise<void>"
            />
            <Action
              @name="onClose"
              @description="This action will be called when the whenever the accordion being closed. This gets called before onToggle."
              @returnType="Promise<void>"
            />
            <Action
              @name="onToggle"
              @parameters={{array
                (p "isOpen" type="boolean" description="isOpen is the new open state")
              }}
              @description="This action will be called when the whenever the accordion is open or closed. It is the responsibility of the parent component to change the isOpen property in response."
            />
          </Api.Actions>
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

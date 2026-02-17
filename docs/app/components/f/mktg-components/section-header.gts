import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import MktgSectionHeader from '@nrg-ui/core/components/mktg/section-header';
import Section from '@nrg-ui/showcase/components/section';

export default class SectionHeaderDemo extends Component {
  @tracked
  subject = 'Subject';

  @tracked
  title = 'Title';

  <template>
    <Section @name="Section Header" @parentName="mktg-components" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <MktgSectionHeader class="col-12" @subject={{model.subject}} @title={{model.title}}>
            <:subheader>
              <p class="m-0">
                Here's some content to give context and summarize this section.
              </p>
              <div class="d-flex justify-content-center mb-4">
                <Button type="button" class="mx-2 mt-2 btn btn-primary">
                  Contact Us
                </Button>
                <Button type="button" class="mx-2 mt-2 btn btn-link">
                  Or call (865) 111-2323
                </Button>
              </div>
            </:subheader>
          </MktgSectionHeader>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String
              @description="The subject text to display in the section header."
              @name="subject"
            />
            <Args.String
              @description="The title text to display in the section header."
              @name="title"
            />
          </Api.Arguments>
          <Api.Blocks as |Block|>
            <Block
              @description="Named yield block to render subheader content such as a description and actionable items."
              @name="subheader"
            />
          </Api.Blocks>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

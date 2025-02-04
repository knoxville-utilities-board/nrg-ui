// @ts-nocheck - TODO

import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Button, MktgSectionHeader } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class SectionHeaderDemo extends Component {
  @tracked
  class = 'col-12';

  @tracked
  subject = 'Subject';

  @tracked
  title = 'Title';

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Section Header" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <MktgSectionHeader
              @subject="Subject"
              @title="Section Title"
              class={{this.class}}
            >
              <:subheader>
                <p class="m-0">Here's some content to give context and summarize
                  this section.</p>
                <div class="d-flex justify-content-center mb-4">
                  <Button
                    type="button"
                    class="mx-2 mt-2 btn btn-primary"
                  >Contact Us</Button>
                  <Button type="button" class="mx-2 mt-2 btn text-primary">Or
                    call (865)111-2323</Button>
                </div>
              </:subheader>
            </MktgSectionHeader>
          </:example>
          <:api as |Args|>
            <Args.String
              @description="The class to apply to the section header. Note that this is not an argument but rather a class applied directly to the section header."
              @name="class"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Yield
              @description="Named yield block to render subheader content such as a description and actionable items."
              @name="subheader"
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::MktgComponents::SectionHeader': typeof SectionHeaderDemo;
  }
}

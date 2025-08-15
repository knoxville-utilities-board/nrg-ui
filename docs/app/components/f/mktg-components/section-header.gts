import { Button, MktgSectionHeader } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

const SectionHeaderDemo = <template>
  {{! @glint-expect-error - Freestyle doesn't have great types }}
  <FreestyleSection @name="Section Header" as |Section|>
    <Section.subsection @name="Basics">
      {{! @glint-expect-error - Freestyle doesn't have great types }}
      <FreestyleUsage>
        <:example>
          <MktgSectionHeader @subject="Subject" @title="Section Title">
            <:subheader>
              <p class="m-0">Here's some content to give context and summarize
                this section.</p>
              <div class="d-flex justify-content-center mb-4">
                <Button type="button" class="mx-2 mt-2 btn btn-primary">Contact
                  Us</Button>
                <Button type="button" class="mx-2 mt-2 btn text-primary">Or call
                  (865)111-2323</Button>
              </div>
            </:subheader>
          </MktgSectionHeader>
        </:example>
        <:api as |Args|>
          <Args.Yield
            @description="Named yield block to render subheader content such as a description and actionable items."
            @name="subheader"
          />
        </:api>
      </FreestyleUsage>
    </Section.subsection>
  </FreestyleSection>
</template>;

export default SectionHeaderDemo;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::MktgComponents::SectionHeader': typeof SectionHeaderDemo;
  }
}

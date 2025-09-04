// @ts-nocheck - TODO

import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Accordion } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class AccordionDemo extends Component {
  @tracked
  class = 'border';

  @tracked
  question = 'What is your question?';

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Accordion" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Accordion
              class={{this.class}}
              @defaultOpen={{this.defaultOpen}}
              @question={{this.question}}
            >
              <:answer>
                <p>Your answer goes here</p>
              </:answer>
            </Accordion>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the Accordion. Note that this is not an argument but rather a class applied directly to the Accordion."
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Bool
              @name="defaultOpen"
              @description="When true, the Accordion will default to being open on render"
              @defaultValue={{false}}
              @hideControls={{true}}
            />
            <Args.String
              @name="question"
              @description="The question for each Accordion"
              @value={{this.question}}
              @onInput={{fn this.update "question"}}
              @required={{true}}
            />
            <Args.Yield
              @description="Named yield block to render the answer to the question"
              @name="answer"
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Accordion': typeof AccordionDemo;
  }
}

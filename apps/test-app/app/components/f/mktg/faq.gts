import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Faq from '@nrg-ui/core/components/mktg/faq';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class extends Component {
  @tracked
  class = 'border';

  @tracked
  question = 'What is your question?';

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="FAQ" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Faq
              class={{this.class}}
              @defaultOpen={{this.defaultOpen}}
              @question={{this.question}}
            >
              <:answer>
                <p>Your answer goes here</p>
              </:answer>
            </Faq>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the FAQ. Note that this is not an argument but rather a class applied directly to the FAQ."
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Bool
              @name="defaultOpen"
              @description="When true, the FAQ will default to being open on render"
              @defaultValue={{false}}
              @hideControls={{true}}
            />
            <Args.String
              @name="question"
              @description="The question for each FAQ"
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

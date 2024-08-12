import { fn } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import RadioGroup from '@nrg-ui/ember/components/form/radio-group';
import bind from '@nrg-ui/ember/helpers/bind';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../code-block';

// TypeScript doesn't recognize that this function is used in the template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function log(...msg: string[]) {
  console.log(msg.join(' '));
}

class Model {
  @tracked
  property = '';
}

export default class extends Component {
  @tracked
  class = '';

  model = new Model();

  @tracked
  name = 'radio';

  @tracked
  options = [
    { option: '1', label: 'One' },
    { option: '2', label: 'Two' },
    { option: '3', label: 'Three' },
  ];

  @tracked
  disabled = false;

  @tracked
  basic = false;

  @tracked
  value = '';

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  <template>
    <FreestyleSection @name="Text Field" as |Section|>
      <Section.subsection @name="Basic">
        <FreestyleUsage>
          <:example>
            <RadioGroup
              class={{this.class}}
              @name={{this.name}}
              @options={{this.options}}
              @binding={{bind this.model "property"}}
              @basic={{this.basic}}
              @disabled={{this.disabled}}
              @onChange={{fn log "The value changed to"}}
              as |Group|
            >
              {{#each this.options as |choice|}}
                <Group.Radio
                  @option={{choice.option}}
                  @label={{choice.label}}
                />
              {{/each}}
            </RadioGroup>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the group <div>. Note that this is not an argument but rather a class applied directly to the group"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
              @options={{this.classOptions}}
            />
            <Args.Bool
              @name="basic"
              @defaultValue={{false}}
              @description="When true, the border will be removed"
              @value={{this.basic}}
              @onInput={{fn this.update "basic"}}
            />
            <Args.String
              @name="name"
              @description="the shared name used for the input value, must be unique for the group"
              @value={{this.name}}
              @onInput={{fn this.update "name"}}
            />
            <Args.String
              @name="binding"
              @description="Create a two-way binding with the value"
              @value={{this.model.property}}
              @onInput={{fn this.update "model.property"}}
            />
            <Args.Bool
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, the input will be disabled"
              @value={{this.disabled}}
              @onInput={{fn this.update "disabled"}}
            />
            <Args.Action
              @name="onChange"
              @description="The action to call when the value changes"
            >
              <CodeBlock
                @lang="typescript"
                @code="(newValue: string) => unknown"
              />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

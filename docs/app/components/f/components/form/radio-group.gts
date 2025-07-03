import { fn, hash } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { RadioGroup, bind } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../../code-block';

class Model {
  @tracked
  property = '';
}

export default class RadioGroupDemo extends Component {
  log(...msg: string[]) {
    console.log(msg.join(' '));
  }

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

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  <template>
    {{! @glint-expect-error - Freestyle doesn't have great types }}
    <FreestyleSection @name="Radio Group" as |Section|>
      <Section.subsection @name="Basic">
        {{! @glint-expect-error - Freestyle doesn't have great types }}
        <FreestyleUsage>
          <:example>
            <RadioGroup
              @name={{this.name}}
              @binding={{bind this.model "property"}}
              @basic={{this.basic}}
              @fieldOptions={{hash disabled=this.disabled}}
              @onChange={{fn this.log "The value changed to"}}
              as |Group|
            >
              <Group.Radio @option="1" @label="One" />
              <Group.Radio @option="2" @label="Two" />
              <Group.Radio @option="3" @label="Three" />
            </RadioGroup>
          </:example>
          <:api as |Args|>
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
              @name="fieldOptions.disabled"
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Form::RadioGroup': typeof RadioGroupDemo;
  }
}

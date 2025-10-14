// @ts-nocheck - TODO

import { fn, hash } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { RadioGroup, bind } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../../code-block';

// TypeScript doesn't recognize that this function is used in the template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function log(...msg: string[]) {
  console.log(msg.join(' '));
}

class Model {
  @tracked
  property = '';
}

export default class RadioGroupDemo extends Component {
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

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  <template>
    <FreestyleSection @name="Radio Group" as |Section|>
      <Section.subsection @name="Basic">
        <FreestyleUsage>
          <:description>
            <div class="alert alert-info" role="alert">
              This component supports all attributes supported by the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/radio" class="alert-link">radio</a> component in addition to the arguments listed below.
            </div>
          </:description>
          <:example>
            <RadioGroup
              class={{this.class}}
              @name={{this.name}}
              @binding={{bind this.model "property"}}
              @basic={{this.basic}}
              @fieldOptions={{hash disabled=this.disabled}}
              @onChange={{fn log "The value changed to"}}
              as |Group|
            >
              <Group.Radio @option="1" @label="One" />
              <Group.Radio @option="2" @label="Two" />
              <Group.Radio @option="3" @label="Three" />
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

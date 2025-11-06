// @ts-nocheck - TODO

import { array, fn, hash } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Checkbox, bind } from '@nrg-ui/core';
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

export default class CheckboxDemo extends Component {
  model = new Model();

  @tracked
  class = '';

  @tracked
  disabled = false;

  @tracked
  inline;

  @tracked
  label = 'Checkbox label';

  @tracked
  reverse = false;

  @tracked
  type = 'checkbox';

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  <template>
    <FreestyleSection @name="Checkbox" as |Section|>
      <Section.subsection @name="Basic">
        <FreestyleUsage>
          <:description>
            <div class="alert alert-info" role="alert">
              This component supports all attributes supported by the
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox"
                class="alert-link"
              >checkbox</a>
              component in addition to the arguments listed below.
            </div>
          </:description>
          <:example>
            <Checkbox
              class={{this.class}}
              @binding={{bind this.model "property"}}
              @fieldOptions={{hash disabled=this.disabled}}
              @inline={{this.inline}}
              @label={{this.label}}
              @reverse={{this.reverse}}
              @type={{this.type}}
              @onChange={{fn log "The value changed to"}}
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the group input. Note that this is not an argument but rather a class applied directly to the input"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
              @options={{this.classOptions}}
            />
            <Args.Bool
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
            <Args.Bool
              @name="inline"
              @defaultValue={{false}}
              @description="When true, the input will be displayed inline"
              @value={{this.inline}}
              @onInput={{fn this.update "inline"}}
            />
            <Args.String
              @name="label"
              @description="The label to display next to the checkbox"
              @value={{this.label}}
              @onInput={{fn this.update "label"}}
            />
            <Args.Bool
              @name="reverse"
              @defaultValue={{false}}
              @description="When true, the input will be displayed on the reverse side of the container"
              @value={{this.reverse}}
              @onInput={{fn this.update "reverse"}}
            />
            <Args.String
              @defaultValue="checkbox"
              @name="type"
              @description="The type of checkbox to render"
              @options={{array "checkbox" "switch"}}
              @value={{this.type}}
              @onInput={{fn this.update "type"}}
            />
            <Args.Action
              @name="onChange"
              @description="The action to call when the value changes"
            >
              <CodeBlock
                @lang="typescript"
                @code="(newValue: boolean) => unknown"
              />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

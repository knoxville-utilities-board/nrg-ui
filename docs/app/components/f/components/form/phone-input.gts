// @ts-nocheck - TODO

import { fn, hash } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { PhoneInput, bind } from '@nrg-ui/core';
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

export default class PhoneInputDemo extends Component {
  @tracked
  class = '';

  model = new Model();

  @tracked
  basic = false;

  @tracked
  disabled = false;

  @tracked
  readonly = false;

  @tracked
  value = '';

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  <template>
    <FreestyleSection @name="Phone Input" as |Section|>
      <Section.subsection @name="Basic">
        <FreestyleUsage>
          <:description>
            <div class="alert alert-info" role="alert">
              This component supports all attributes supported by the
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/tel"
                class="alert-link"
              >phone</a>
              component in addition to the arguments listed below.
            </div>
          </:description>
          <:example>
            <PhoneInput
              class={{this.class}}
              @basic={{this.basic}}
              @binding={{bind this.model "property"}}
              @fieldOptions={{hash disabled=this.disabled}}
              @readonly={{this.readonly}}
              @onChange={{fn log "The value changed to"}}
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the input. Note that this is not an argument but rather a class applied directly to the input"
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
              @name="readonly"
              @defaultValue={{false}}
              @description="When true, the input will be readonly"
              @value={{this.readonly}}
              @onInput={{fn this.update "readonly"}}
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

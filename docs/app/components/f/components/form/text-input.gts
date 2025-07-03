import { fn, hash } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TextInput, bind } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../../code-block';

class Model {
  @tracked
  property = '';
}

export default class TextInputDemo extends Component {
  log(...msg: string[]) {
    console.log(msg.join(' '));
  }

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
    {{! @glint-expect-error - Freestyle doesn't have great types }}
    <FreestyleSection @name="Text Input" as |Section|>
      <Section.subsection @name="Basic">
        {{! @glint-expect-error - Freestyle doesn't have great types }}
        <FreestyleUsage>
          <:example>
            <TextInput
              @basic={{this.basic}}
              @binding={{bind this.model "property"}}
              @fieldOptions={{hash disabled=this.disabled}}
              @readonly={{this.readonly}}
              @onChange={{fn this.log "The value changed to"}}
            />
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Form::TextInput': typeof TextInputDemo;
  }
}

import { array, fn } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Checkbox from '@nrg-ui/ember/components/form/checkbox';
import bind from '@nrg-ui/ember/helpers/bind';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../code-block';

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
  type = 'checkbox';

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  <template>
    <FreestyleSection @name="Checkbox" as |Section|>
      <Section.subsection @name="Basic">
        <FreestyleUsage>
          <:example>
            <Checkbox
              class={{this.class}}
              @binding={{bind this.model "property"}}
              @disabled={{this.disabled}}
              @inline={{this.inline}}
              @label={{this.label}}
              @type={{this.type}}
              @onChange={{fn log "The value changed to"}}
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the group <div>. Note that this is not an argument but rather a class applied directly to the input"
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
              @name="disabled"
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

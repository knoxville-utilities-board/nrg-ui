import { array, fn, hash } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Checkbox from '@nrg-ui/core/components/form/checkbox';
import { bind } from '@nrg-ui/core/helpers/bind';
import Section from '@nrg-ui/showcase/components/section';

function print(...msg: unknown[]) {
  console.log(msg.join(' '));
}

export default class CheckboxDemo extends Component {
  @tracked
  disabled = false;

  @tracked
  inline = false;

  @tracked
  label = 'Checkbox label';

  @tracked
  reverse = false;

  @tracked
  type = 'checkbox';

  @tracked
  value = false;

  <template>
    <Section @name="Checkbox" as |Section|>
      <Section.Subsection @name="Basic" @model={{this}} @elementTag="input">
        <:example as |model|>
          <Checkbox
            @binding={{bind model "value"}}
            @fieldOptions={{hash disabled=model.disabled}}
            @inline={{model.inline}}
            @label={{model.label}}
            @reverse={{model.reverse}}
            @type={{model.type}}
            @onChange={{fn print "The value changed to"}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, the input will be disabled"
            />
            <Args.Boolean
              @name="inline"
              @defaultValue={{false}}
              @description="When true, the input will be displayed inline"
            />
            <Args.String
              @name="label"
              @description="The label to display next to the checkbox"
            />
            <Args.Boolean
              @name="reverse"
              @defaultValue={{false}}
              @description="When true, the input will be displayed on the reverse side of the container"
            />
            <Args.String
              @defaultValue="checkbox"
              @name="type"
              @description="The type of checkbox to render"
              @options={{array "checkbox" "switch"}}
            />
          </Api.Arguments>
          <Api.Actions as |Action p|>
            <Action
              @name="onChange"
              @description="The action to call when the value changes"
              @parameters={{array
                (p
                  "newValue"
                  description="The new value of the checkbox"
                  type="Boolean"
                )
              }}
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

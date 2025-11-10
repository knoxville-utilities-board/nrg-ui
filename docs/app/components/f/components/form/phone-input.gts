import { array, fn, hash } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { PhoneInput, bind } from '@nrg-ui/core';
import Section from '@nrg-ui/showcase/components/section';

function print(...msg: string[]) {
  console.log(msg.join(' '));
}

export default class PhoneInputDemo extends Component {
  @tracked
  basic = false;

  @tracked
  disabled = false;

  @tracked
  readonly = false;

  @tracked
  value = '';

  <template>
    <Section @name="Phone Input" as |Section|>
      <Section.Subsection @name="Basic" @model={{this}} @elementTag="input">
        <:example as |model|>
          <PhoneInput
            @basic={{model.basic}}
            @binding={{bind model "value"}}
            @fieldOptions={{hash disabled=model.disabled}}
            @readonly={{model.readonly}}
            @onChange={{fn print "The value changed to"}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="basic"
              @defaultValue={{false}}
              @description="When true, the border will be removed"
            />
            <Args.Boolean
              @name="fieldOptions.disabled"
              @defaultValue={{false}}
              @description="When true, the input will be disabled"
            />
            <Args.Boolean
              @name="readonly"
              @defaultValue={{false}}
              @description="When true, the input will be readonly"
            />
          </Api.Arguments>
          <Api.Actions as |Action p|>
            <Action
              @name="onChange"
              @description="The action to call when the value changes"
              @parameters={{array (p "newValue" type="string")}}
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

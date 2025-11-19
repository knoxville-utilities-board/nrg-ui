import { array, fn, hash } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TextInput from '@nrg-ui/core/components/form/text-input';
import { bind } from '@nrg-ui/core/helpers/bind';
import Section from '@nrg-ui/showcase/components/section';

function print(...msg: unknown[]) {
  console.log(...msg);
}

export default class TextInputDemo extends Component {
  @tracked
  basic = false;

  @tracked
  disabled = false;

  @tracked
  placeholder = 'Enter text...';

  @tracked
  readonly = false;

  @tracked
  value = '';

  <template>
    <Section @name="Text Input" as |Section|>
      <Section.Subsection @name="Basic" @model={{this}} @elementTag="input">
        <:example as |model|>
          <TextInput
            @basic={{model.basic}}
            @binding={{bind model "property"}}
            @fieldOptions={{hash disabled=model.disabled}}
            @readonly={{model.readonly}}
            @onChange={{fn print "The value changed to"}}
            placeholder={{model.placeholder}}
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
              @name="disabled"
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

import { array, fn, hash } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import RadioGroup from '@nrg-ui/core/components/form/radio-group';
import { bind } from '@nrg-ui/core/helpers/bind';
import Section from '@nrg-ui/showcase/components/section';

function print(...msg: unknown[]) {
  console.log(msg.join(' '));
}

export default class RadioGroupDemo extends Component {
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
  value = '2';

  <template>
    <Section @name="Radio Group" as |Section|>
      <Section.Subsection @name="Basic" @model={{this}} @elementTag="div">
        <:example as |model|>
          <RadioGroup
            class={{model.class}}
            @name={{model.name}}
            @binding={{bind model "property"}}
            @basic={{model.basic}}
            @fieldOptions={{hash disabled=model.disabled}}
            @onChange={{fn print "The value changed to"}}
            as |Group|
          >
            <Group.Radio @option="1" @label="One" />
            <Group.Radio @option="2" @label="Two" />
            <Group.Radio @option="3" @label="Three" />
          </RadioGroup>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="basic"
              @defaultValue={{false}}
              @description="When true, the border will be removed"
            />
            <Args.String
              @name="name"
              @description="The shared name used for the input value, must be unique for the group"
            />
            <Args.Boolean
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, the input will be disabled"
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

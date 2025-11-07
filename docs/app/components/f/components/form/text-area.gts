import { array, fn, hash } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TextArea from '@nrg-ui/core/components/form/text-area';
import { bind } from '@nrg-ui/core/helpers/bind';
import Section from '@nrg-ui/showcase/components/section';

function print(...msg: unknown[]) {
  console.log(msg.join(' '));
}

export default class TextAreaDemo extends Component {
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
    <Section @name="Text Area" as |Section|>
      <Section.Subsection @name="Basic" @model={{this}} @elementTag="textarea">
        <:example as |model|>
          <TextArea
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
              @description="When true, the textarea will be disabled"
            />
            <Args.Boolean
              @name="readonly"
              @defaultValue={{false}}
              @description="When true, the textarea will be readonly"
            />
          </Api.Arguments>
          <Api.Actions as |Action p|>
            <Action
              @name="onChange"
              @description="The action to call when the value changes"
              @parameters={{array
                (p
                  "newValue"
                  type="string"
                  description="The new value of the textarea"
                )
              }}
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

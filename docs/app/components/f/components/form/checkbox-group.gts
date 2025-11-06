import { array, hash } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import CheckboxGroup from '@nrg-ui/core/components/form/checkbox-group';
import { bind } from '@nrg-ui/core/helpers/bind';
import Section from '@nrg-ui/showcase/components/section';

export default class CheckboxGroupDemo extends Component {
  @tracked
  basic = false;

  @tracked
  disabled = false;

  @tracked
  inline = false;

  @tracked
  reverse = false;

  @tracked
  label = 'Checkbox label';

  @tracked
  type = 'checkbox';

  @tracked
  option1 = false;

  @tracked
  option2 = false;

  @tracked
  option3 = false;

  <template>
    <Section @name="Checkbox Group" as |Section|>
      <Section.Subsection @name="Basic" @model={{this}} @elementTag="div">
        <:example as |model|>
          <CheckboxGroup
            @basic={{model.basic}}
            @fieldOptions={{hash disabled=model.disabled}}
            @inline={{model.inline}}
            @reverse={{model.reverse}}
            @type={{model.type}}
            as |Item|
          >
            <Item @binding={{bind this "option1"}} @label="Option 1" />
            <Item @binding={{bind this "option2"}} @label="Option 2" />
            <Item @binding={{bind this "option3"}} @label="Option 3" />
          </CheckboxGroup>
        </:example>

        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="basic"
              @defaultValue={{false}}
              @description="When true, the border will be removed"
            />
            <Args.String
              @defaultValue="checkbox"
              @name="type"
              @description="All checkboxes in this group will use this type"
              @options={{array "checkbox" "switch"}}
            />
            <Args.Boolean
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, all checkboxes in this group will be disabled"
            />
            <Args.Boolean
              @name="inline"
              @defaultValue={{false}}
              @description="When true, all checkboxes in this group will be displayed inline"
            />
            <Args.String
              @name="label"
              @description="The label for the checkbox group"
            />
            <Args.Boolean
              @name="reverse"
              @defaultValue={{false}}
              @description="When true, all checkboxes in this group will be on the reverse side of the container"
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

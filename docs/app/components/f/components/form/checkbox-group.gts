// @ts-nocheck - TODO

import { array, fn, hash } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { CheckboxGroup, bind } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

class Model {
  @tracked
  property = '';
}

export default class CheckboxGroupDemo extends Component {
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

  @tracked
  option1 = false;

  @tracked
  option2 = false;

  @tracked
  option3 = false;

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  <template>
    <FreestyleSection @name="Checkbox Group" as |Section|>
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
            <CheckboxGroup
              class={{this.class}}
              @basic={{this.basic}}
              @fieldOptions={{hash disabled=this.disabled}}
              @inline={{this.inline}}
              @label={{this.label}}
              @reverse={{this.reverse}}
              @type={{this.type}}
              as |Item|
            >
              <Item @binding={{bind this "option1"}} @label="Option 1" />
              <Item @binding={{bind this "option2"}} @label="Option 2" />
              <Item @binding={{bind this "option3"}} @label="Option 3" />
            </CheckboxGroup>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the group <div>. Note that this is not an argument but rather a class applied directly to the <div>"
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
            <Args.Bool
              @name="fieldOptions.disabled"
              @defaultValue={{false}}
              @description="When true, all checkboxes in this group will be disabled"
              @value={{this.disabled}}
              @onInput={{fn this.update "disabled"}}
            />
            <Args.Bool
              @name="inline"
              @defaultValue={{false}}
              @description="When true, all checkboxes in this group will be displayed inline"
              @value={{this.inline}}
              @onInput={{fn this.update "inline"}}
            />
            <Args.Bool
              @name="reverse"
              @defaultValue={{false}}
              @description="When true, all checkboxes in this group will be on the reverse side of the container"
              @value={{this.reverse}}
              @onInput={{fn this.update "reverse"}}
            />
            <Args.String
              @defaultValue="checkbox"
              @name="type"
              @description="All checkboxes in this group will use this type"
              @options={{array "checkbox" "switch"}}
              @value={{this.type}}
              @onInput={{fn this.update "type"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

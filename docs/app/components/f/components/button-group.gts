import { array, fn } from '@ember/helper';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { getSnippet } from '@nrg-ui/code-snippets/helper';
import ButtonGroup from '@nrg-ui/core/components/button-group';
import CodeBlock from '@nrg-ui/showcase/components/code-block';
import Section from '@nrg-ui/showcase/components/section';

import type ToastService from '@nrg-ui/core/services/toast';

export default class ButtonGroupDemo extends Component {
  // BEGIN-SNIPPET button-group-implementation
  @service
  declare toast: ToastService;

  @tracked
  activeButton: string = 'Option 1';

  @tracked
  disabled = false;

  @tracked
  label = 'Label';

  @tracked
  toolbar = false;

  @tracked
  vertical = false;

  @action
  onButtonClick(label: string) {
    this.activeButton = label;
    this.toast.info(`${label} clicked`);
  }

  @action
  buttonClass(label: string) {
    if (this.activeButton === label) {
      return 'btn-primary';
    }
    return 'btn-secondary';
  }

  // END-SNIPPET

  <template>
    <Section @name="Button Group" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="button">
        <:example as |model|>
          <ButtonGroup
            class="btn-primary"
            @disabled={{model.disabled}}
            @label={{model.label}}
            @toolbar={{model.toolbar}}
            @vertical={{model.vertical}}
            as |Group|
          >
            <Group.Button
              class={{this.buttonClass "Option 1"}}
              @disabled={{model.disabled}}
              @text="Option 1"
              @onClick={{fn this.onButtonClick "Option 1"}}
            />
            <Group.Button
              class={{this.buttonClass "Option 2"}}
              @disabled={{model.disabled}}
              @text="Option 2"
              @onClick={{fn this.onButtonClick "Option 2"}}
            />
            <Group.Button
              class={{this.buttonClass "Option 3"}}
              @disabled={{model.disabled}}
              @text="Option 3"
              @onClick={{fn this.onButtonClick "Option 3"}}
            />
          </ButtonGroup>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, the button will be disabled"
            />
            <Args.String @name="label" @description="The accessible label for the button group" />
            <Args.Boolean
              @name="toolbar"
              @defaultValue={{false}}
              @description="When true, styles the button group as a toolbar"
            />
            <Args.Boolean
              @name="vertical"
              @defaultValue={{false}}
              @description="When true, styles the button group vertically"
            />
          </Api.Arguments>
          <Api.Actions as |Action p|>
            <Action @name="onClick" @parameters={{array (p "event" type="MouseEvent")}} />
          </Api.Actions>
        </:api>
      </Section.Subsection>

      <h5>Implementation</h5>
      <CodeBlock @lang="gts" @code={{get (getSnippet "button-group-implementation") "code"}} />
    </Section>
  </template>
}

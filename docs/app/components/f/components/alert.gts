import { array } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Alert from '@nrg-ui/core/components/alert';
import Section from '@nrg-ui/showcase/components/section';

export default class AlertDemo extends Component {
  @tracked
  dismissible = true;

  @tracked
  icon = 'bi-exclamation-triangle-fill';

  @tracked
  text = 'This is an alert message!';

  @tracked
  type = 'danger';

  <template>
    <Section @name="Alert" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="button">
        <:example as |model|>
          <Alert
            @dismissible={{model.dismissible}}
            @icon={{model.icon}}
            @text={{model.text}}
            @type={{model.type}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="dismissible"
              @defaultValue="false"
              @description="Whether the alert can be dismissed"
            />
            <Args.String @name="icon" @description="The icon to display in the alert" />
            <Args.String @name="text" @description="The text to display in the alert" />
            <Args.String
              @name="type"
              @defaultValue="danger"
              @description="The type of alert"
              @options={{array "danger" "warning" "info" "success"}}
            />
          </Api.Arguments>
          <Api.Actions as |Action|>
            <Action
              @name="onDismiss"
              @description="This action will be called whenever the alert is dismissed."
              @returnType="Promise<void>"
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

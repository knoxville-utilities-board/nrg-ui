import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Alert, { alertTypes } from '@nrg-ui/core/components/alert';
import Section from '@nrg-ui/showcase/components/section';

export default class AlertDemo extends Component {
  @tracked
  dismissible = true;

  @tracked
  icon = 'bi-exclamation-triangle-fill';

  @tracked
  text = 'This is an alert message!';

  @tracked
  type = 'primary';

  @tracked
  content =
    '<p>This is an alert with <strong>custom content</strong>.</p>\n<hr />\n<p class="m-0">It can include HTML</p>';

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
              @defaultValue="primary"
              @description="The type of alert"
              @options={{alertTypes}}
            />
          </Api.Arguments>
          <Api.Actions as |Action|>
            <Action
              @name="onDismiss"
              @description="This action will be called whenever the alert is dismissed."
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>

      <Section.Subsection @name="Alert with a link" @model={{this}} @elementTag="button">
        <:example as |model|>
          <Alert @dismissible={{model.dismissible}} @icon={{model.icon}} @type={{model.type}}>
            This is an alert with a link.
            <a href="#" class="alert-link">This is a link</a>
          </Alert>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="dismissible"
              @defaultValue="false"
              @description="Whether the alert can be dismissed"
            />
            <Args.String @name="icon" @description="The icon to display in the alert" />
            <Args.String
              @name="type"
              @defaultValue="primary"
              @description="The type of alert"
              @options={{alertTypes}}
            />
          </Api.Arguments>
          <Api.Actions as |Action|>
            <Action
              @name="onDismiss"
              @description="This action will be called whenever the alert is dismissed."
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>

      <Section.Subsection @name="Alert with content" @model={{this}} @elementTag="button">
        <:example as |model|>
          <Alert @dismissible={{model.dismissible}} @type={{model.type}}>
            {{htmlSafe model.content}}
          </Alert>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="dismissible"
              @defaultValue="false"
              @description="Whether the alert can be dismissed"
            />
            <Args.String
              @name="type"
              @defaultValue="primary"
              @description="The type of alert"
              @options={{alertTypes}}
            />
            <Args.TextArea @name="content" @description="The content of the alert" />
          </Api.Arguments>
          <Api.Actions as |Action|>
            <Action
              @name="onDismiss"
              @description="This action will be called whenever the alert is dismissed."
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import AppBar from '@nrg-ui/core/components/app-bar';
import Section from '@nrg-ui/showcase/components/section';
import pageTitle from 'ember-page-title/helpers/page-title';

export default class AppBarDemo extends Component {
  @tracked
  environment = 'dev';

  @tracked
  leftContent = htmlSafe('<p class="d-none d-md-block m-0 ps-3 fs-5">Left Content</p>');

  @tracked
  rightContent = htmlSafe('<p class="m-0">Right Content</p>');

  <template>
    {{pageTitle "App Bar"}}
    <div class="container mx-auto">
      <Section @name="App Bar" as |Section|>
        <Section.Subsection @name="Basics" @model={{this}} @elementTag="button">
          <:example as |model|>
            <AppBar @environment={{model.environment}}>
              <:left as |AppBar|>
                {{htmlSafe model.leftContent}}
                <AppBar.Environment />
              </:left>
              <:right>
                {{htmlSafe model.rightContent}}
              </:right>
            </AppBar>
          </:example>
          <:api as |Api|>
            <Api.Arguments as |Args|>
              <Args.String
                @name="environment"
                @description="The environment to display in the app bar component. If it is 'prod', or 'production', it will not be displayed."
              />
              <Args.TextArea
                @name="leftContent"
                @description="The content to display in the left slot of the app bar. Can be set to any HTML string. AppBar.Environment can be used to display the environment in the left slot as well."
              />
              <Args.TextArea
                @name="rightContent"
                @description="The content to display in the right slot of the app bar. Can be set to any HTML string."
              />
            </Api.Arguments>
          </:api>
        </Section.Subsection>
      </Section>
    </div>
  </template>
}

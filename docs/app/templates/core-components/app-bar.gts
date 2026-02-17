import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import AppBar from '@nrg-ui/core/components/app-bar';
import Section from '@nrg-ui/showcase/components/section';
import { t } from 'ember-intl';
import pageTitle from 'ember-page-title/helpers/page-title';

export default class AppBarDemo extends Component {
  @tracked
  environment = 'dev';

  <template>
    {{pageTitle "App Bar"}}
    <div class="container mx-auto">
      <Section @name="App Bar" as |Section|>
        <Section.Subsection @name="Basics" @model={{this}} @elementTag="button">
          <:example as |model|>
            <AppBar @environment={{model.environment}}>
              <:left as |AppBar|>
                <p class="d-none d-md-block m-0 ps-3 fs-5">Docs | @nrg-ui/core</p>
                <AppBar.Environment />
              </:left>
              <:right>
                <i
                  class="bi bi-three-dots-vertical p-1"
                  role="button"
                  title={{t "nrg.navbar.toggleContextMenu"}}
                />
              </:right>
            </AppBar>
          </:example>
          <:api as |Api|>
            <Api.Arguments as |Args|>
              <Args.String
                @name="environment"
                @description="The environment to display in the app bar component. If it is 'prod', or 'production', it will not be displayed."
              />
            </Api.Arguments>
            <Api.Blocks as |Block|>
              <Block
                @description="Named yield block to display in the left slot of the app bar. <AppBar.Environment /> can be used to display the environment in the left slot as well."
                @name="leftContent"
              />
            </Api.Blocks>
            <Api.Blocks as |Block|>
              <Block
                @description="Named yield block to display in the right slot of the app bar."
                @name="rightContent"
              />
            </Api.Blocks>
          </:api>
        </Section.Subsection>
      </Section>
    </div>
  </template>
}

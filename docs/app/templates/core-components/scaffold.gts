import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Scaffold from '@nrg-ui/core/components/scaffold';
import Section from '@nrg-ui/showcase/components/section';
import pageTitle from 'ember-page-title/helpers/page-title';

import type ToastService from '@nrg-ui/core/services/toast';

export default class ScaffoldDemo extends Component {
  @service
  declare toast: ToastService;

  @tracked
  allowThemes = true;

  @tracked
  contextMenuId = 'scaffold-context-menu';

  @tracked
  environment = 'development';

  @action
  toggleSidebar(open: boolean) {
    this.toast.info(`Sidebar is now ${open ? 'open' : 'closed'}`);
  }

  <template>
    {{pageTitle "Scaffold"}}
    <div class="container mx-auto">
      <Section @name="Scaffold" @importSlug="base" as |Section|>
        <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
          <:example as |model|>
            <Scaffold
              @allowThemes={{model.allowThemes}}
              @contextMenuId={{model.contextMenuId}}
              @environment={{model.environment}}
            >
              <:app-bar-left as |AppBar|>
                <p class="d-none d-md-block m-0 ps-3 fs-5">
                  Docs | @nrg-ui/core
                </p>
                <AppBar.Environment />
              </:app-bar-left>
            </Scaffold>
          </:example>
          <:api as |Api|>
            <Api.Arguments as |Args|>
              <Args.Boolean
                @name="allowThemes"
                @defaultValue={{true}}
                @description="When true, the scaffold will allow theme switching."
              />
              <Args.String
                @name="contextMenuId"
                @defaultValue="application"
                @description="The id of the context menu to use for this scaffold. This should correspond to the id of a ContextMenu component rendered within the scaffold's context-menu block."
              />
              <Args.String @name="environment" @description="The current environment rendered as <AppBar.Environment />" />
            </Api.Arguments>
          </:api>
        </Section.Subsection>
      </Section>
    </div>
  </template>
}

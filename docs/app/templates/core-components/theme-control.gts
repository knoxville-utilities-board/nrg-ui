import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ThemeControl from '@nrg-ui/core/components/theme-control';
import Section from '@nrg-ui/showcase/components/section';
import pageTitle from 'ember-page-title/helpers/page-title';

import type ToastService from '@nrg-ui/core/services/toast';

export default class ThemeControlDemo extends Component {
  @service
  declare toast: ToastService;

  @action
  onChange(theme: string) {
    this.toast.info(`Theme changed to ${theme}`);
  }

  <template>
    {{pageTitle "Theme Control"}}
    <div class="container mx-auto">
      <Section @name="Theme Control" as |Section|>
        <Section.Subsection @name="Basics" @model={{this}} @elementTag="theme-control">
          <:example as |model|>
            <ThemeControl @onChange={{model.onChange}} />
          </:example>
          <:api as |Api|>
            <Api.Actions as |Action|>
              <Action
                @name="onChange"
                @description="This action will be called whenever the theme is changed."
              />
            </Api.Actions>
          </:api>
        </Section.Subsection>
      </Section>
    </div>
  </template>
}

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import PageNotFound from '@nrg-ui/core/components/page-not-found';
import Section from '@nrg-ui/showcase/components/section';
import pageTitle from 'ember-page-title/helpers/page-title';

export default class PageNotFoundDemo extends Component {
  @tracked
  url = '/';

  <template>
    {{pageTitle "Page Not Found"}}

    <div class="container mx-auto">
      <Section @name="Page Not Found" @importSlug="base" as |Section|>
        <Section.Subsection @name="Basics" @model={{this}} @elementTag="button">
          <:example as |model|>
            <PageNotFound @url={{model.url}} />
          </:example>
          <:api as |Api|>
            <Api.Arguments as |Args|>
              <Args.String
                @name="url"
                @description="The URL to display in the page not found component"
              />
            </Api.Arguments>
          </:api>
        </Section.Subsection>
      </Section>
    </div>
  </template>
}

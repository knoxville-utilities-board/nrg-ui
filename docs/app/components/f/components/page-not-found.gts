import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import PageNotFound from '@nrg-ui/core/components/page-not-found';
import Section from '@nrg-ui/showcase/components/section';

export default class PageNotFoundDemo extends Component {
  @tracked
  url = '/';

  <template>
    <Section @name="Page Not Found" as |Section|>
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
  </template>
}

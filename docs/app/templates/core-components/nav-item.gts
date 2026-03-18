import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import NavItem from '@nrg-ui/core/components/nav-item';
import Section from '@nrg-ui/showcase/components/section';
import pageTitle from 'ember-page-title/helpers/page-title';

export default class NavItemDemo extends Component {
  @tracked
  label = 'Nav Item';

  @tracked
  url = 'https://example.com/non-existent-page';

  @tracked
  route = 'core-components.accordion';

  <template>
    {{pageTitle "Nav Item"}}

    <div class="container mx-auto">
      <Section @name="Nav Item" @importSlug="base" as |Section|>
        <Section.Subsection @name="Basics" @model={{this}} @elementTag="button">
          <:example as |model|>
            <NavItem @url={{model.url}} @label={{model.label}} />
          </:example>
          <:api as |Api|>
            <Api.Arguments as |Args|>
              <Args.String
                @name="url"
                @description="The URL to link to in the page not found component"
              />
              <Args.String @name="label" @description="The label for the nav item" />
            </Api.Arguments>
          </:api>
        </Section.Subsection>

        <Section.Subsection @name="Nav Item with Route" @model={{this}} @elementTag="button">
          <:example as |model|>
            <NavItem @route={{model.route}} @label={{model.label}} />
          </:example>
          <:api as |Api|>
            <Api.Arguments as |Args|>
              <Args.String @name="route" @description="The route to route to in the nav item" />
              <Args.String @name="label" @description="The label for the nav item" />
            </Api.Arguments>
          </:api>
        </Section.Subsection>
      </Section>
    </div>
  </template>
}

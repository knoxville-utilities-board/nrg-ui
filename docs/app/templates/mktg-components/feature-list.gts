import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import MktgFeatureList, { columnMap } from '@nrg-ui/core/components/mktg/feature-list';
import Section from '@nrg-ui/showcase/components/section';
import pageTitle from 'ember-page-title/helpers/page-title';

export default class FeatureListDemo extends Component {
  @tracked
  iconOne: string = 'bi-check';

  @tracked
  iconTwo: string = 'bi-check';

  @tracked
  featureTextOne: string = 'Feature Text 1';

  @tracked
  featureTextTwo: string = 'Feature Text 2';

  @tracked
  metaOne: string = 'Meta 1';

  @tracked
  metaTwo: string = 'Meta 2';

  @tracked
  columns: number = 2;

  get columnMapKeys() {
    return Object.keys(columnMap);
  }

  <template>
    {{pageTitle "Feature List"}}

    <div class="container mx-auto">
      <Section @name="Feature List" @importSlug="mktg" as |Section|>
        <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
          <:example as |model|>
            <MktgFeatureList @columns={{model.columns}}>
              <:features as |Feature|>
                <Feature
                  @icon={{model.iconOne}}
                  @text={{model.featureTextOne}}
                  @meta={{model.metaOne}}
                />
                <Feature
                  @icon={{model.iconTwo}}
                  @text={{model.featureTextTwo}}
                  @meta={{model.metaTwo}}
                />
              </:features>
            </MktgFeatureList>
          </:example>
          <:api as |Api|>
            <Api.Arguments as |Args|>
              <Args.String
                @name="featureTextOne"
                @description="The text to display for the first feature"
              />
              <Args.String
                @name="featureTextTwo"
                @description="The text to display for the second feature"
              />
              <Args.String
                @name="iconOne"
                @description="The bootstrap icon class to display for the first feature."
              />
              <Args.String
                @name="iconTwo"
                @description="The bootstrap icon class to display for the second feature."
              />
              <Args.String
                @name="metaOne"
                @description="The meta text to display for the first feature."
              />
              <Args.String
                @name="metaTwo"
                @description="The meta text to display for the second feature."
              />
              <Args.String
                @name="columns"
                @options={{this.columnMapKeys}}
                @description="The number of columns to display the features in. The number corresponds to the Bootstrap grid column classes."
              />
            </Api.Arguments>
          </:api>
        </Section.Subsection>
      </Section>
    </div>
  </template>
}

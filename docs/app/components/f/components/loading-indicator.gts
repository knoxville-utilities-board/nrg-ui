import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import LoadingIndicator, {
  typeBorder,
  typeGrow,
} from '@nrg-ui/core/components/loading-indicator';
import Section from '@nrg-ui/showcase/components/section';

const typeOptions = [typeBorder, typeGrow];

export default class LoadingIndicatorDemo extends Component {
  @tracked
  type = typeBorder;

  @tracked
  showLabel = false;

  @tracked
  label = 'Loading...';

  <template>
    <Section @name="Loading Indicator" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <LoadingIndicator
            @label={{model.label}}
            @showLabel={{model.showLabel}}
            @type={{model.type}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String
              @name="label"
              @defaultValue="Loading..."
              @description="The label to display in the loading indicator if showLabel is true."
            />
            <Args.Boolean
              @name="showLabel"
              @defaultValue={{false}}
              @description="When true, the loading indicator will display a label."
            />
            <Args.String
              @name="type"
              @defaultValue="border"
              @description="The type of loading indicator to display. Can be either 'border', 'grow', or 'undefined'."
              @options={{typeOptions}}
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}

// @ts-nocheck - TODO
import { array, fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { LoadingIndicator } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export const typeBorder = 'border';
export const typeGrow = 'grow';

export default class LoadingIndicatorDemo extends Component {
  @tracked
  type?: typeof typeBorder | typeof typeGrow;

  @tracked
  showLabel?: boolean;

  @tracked
  label?: string;

  @tracked
  size?: string;

  typeOptions = ['border', 'grow'];

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Loading Indicator" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <LoadingIndicator
              class={{this.size}}
              @label={{this.label}}
              @showLabel={{this.showLabel}}
              @type={{this.type}}
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @defaultValue={{null}}
              @description="This class determines the size of the loading indicator."
              @name="class"
              @options={{array null "spinner-sm" "spinner-lg"}}
              @value={{this.size}}
              @onInput={{fn this.update "size"}}
            />
            <Args.String
              @name="label"
              @defaultValue="Loading..."
              @description="The label to display in the loading indicator if showLabel is true."
              @value={{this.label}}
              @onInput={{fn this.update "label"}}
            />
            <Args.Bool
              @name="showLabel"
              @defaultValue={{false}}
              @description="When true, the loading indicator will display a label."
              @value={{this.showLabel}}
              @onInput={{fn this.update "showLabel"}}
            />
            <Args.String
              @name="type"
              @defaultValue="border"
              @description="The type of loading indicator to display. Can be either 'border', 'grow', or 'undefined'."
              @value={{this.type}}
              @options={{this.typeOptions}}
              @onInput={{fn this.update "type"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::LoadingIndicator': typeof LoadingIndicatorDemo;
  }
}

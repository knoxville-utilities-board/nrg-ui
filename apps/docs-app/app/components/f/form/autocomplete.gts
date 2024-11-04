import { array, fn } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Autocomplete } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class extends Component {
  @tracked
  loading = false;

  @tracked
  searchIconPosition = 'left';

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  <template>
    <FreestyleSection @name="Checkbox Group" as |Section|>
      <Section.subsection @name="Basic">
        <FreestyleUsage>
          <:example>
            <Autocomplete
              @loading={{this.loading}}
              @searchIconPosition={{this.searchIconPosition}}
            />
          </:example>
          <:api as |Args|>
            <Args.Bool
              @name="loading"
              @defaultValue={{false}}
              @description="When true, the text will be replaced with a loading spinner"
              @value={{this.loading}}
              @onInput={{fn this.update "loading"}}
            />
            <Args.String
              @name="searchIconPosition"
              @description="The position of the search icon relative to the text"
              @value={{this.searchIconPosition}}
              @options={{array  '' "left" "right"}}
              @onInput={{fn this.update "searchIconPosition"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

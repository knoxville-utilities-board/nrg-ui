import { fn } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Autocomplete } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class extends Component {
  @tracked
  loading = false;

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
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

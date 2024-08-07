import Component from '@glimmer/component';
import Select from '@nrg-ui/ember/components/form/select';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import { fn } from '@ember/helper';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import bind from '@nrg-ui/ember/helpers/bind';

export default class extends Component {
  @tracked
  disabled = false;

  @tracked
  loading = false;

  @tracked
  selectValue;

  @tracked
  stringOptions = ['Option 1', 'Option 2', 'Option 3'];

  @tracked
  objectOptions = [
    { key: 'Option 1', id: 'option-1' },
    { key: 'Option 2', id: 'option-2' },
    { key: 'Option 3', id: 'option-3' },
  ];

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  get stringOptionsSource() {
    return JSON.stringify(this.stringOptions, null, 2);
  }

  get objectOptionsSource() {
    return JSON.stringify(this.objectOptions, null, 2);
  }

  <template>
    <FreestyleSection @name="Select" as |Section|>
      <Section.subsection @name="String Options">
        <FreestyleUsage>
          <:example>
            <Select
              @binding={{bind this "selectValue"}}
              @disabled={{this.disabled}}
              @loading={{this.loading}}
              @options={{this.stringOptions}}
            />
          </:example>
          <:api as |Args|>
            <Args.Bool
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, the button will be disabled"
              @value={{this.disabled}}
              @onInput={{fn this.update "disabled"}}
            />
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

      <Section.subsection @name="Object Options">
        <FreestyleUsage>
          <:example>
            <Select
              @binding={{bind this "selectValue"}}
              @disabled={{this.disabled}}
              @loading={{this.loading}}
              @options={{this.objectOptions}}
              @displayPath="key"
              @serializationPath="key"
            />
          </:example>
        </FreestyleUsage>
      </Section.subsection>

      <Section.subsection @name="Yielded Options">
        <FreestyleUsage>
          <:example>
            <Select
              @binding={{bind this "selectValue"}}
              @disabled={{this.disabled}}
              @loading={{this.loading}}
              @options={{this.objectOptions}}
              @serializationPath="key"
            >
              <:empty>
                <span>Nothing to see here</span>
              </:empty>
              <:display as |option|>
                <span>{{option.id}}</span>
                <span>=</span>
                <span>{{option.key}}</span>
              </:display>
              <:option as |option|>
                <span>{{option.key}}</span>
                <span>-</span>
                <span>{{option.id}}</span>
              </:option>
            </Select>
          </:example>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>

    <div class="grid">
      <div class="g-col-4 border p-3">
        <h3>String Options</h3>
        <pre>{{this.stringOptionsSource}}</pre>
      </div>
      <div class="g-col-4 border p-3">
        <h3>Object Options</h3>
        <pre>{{this.objectOptionsSource}}</pre>
      </div>
      <div class="g-col-4 border p-3">
        <h3>Selected</h3>
        {{this.selectValue}}
      </div>
    </div>
  </template>
}

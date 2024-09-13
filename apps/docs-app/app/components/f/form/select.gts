import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Select from '@nrg-ui/core/components/form/select';
import bind from '@nrg-ui/core/helpers/bind';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../code-block';

export default class extends Component {
  @tracked
  disabled = false;

  @tracked
  loading = false;

  @tracked
  scrollable = true;

  @tracked
  selectValue;

  @tracked
  stringOptions = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
  ];

  @tracked
  objectOptions = [
    { key: 'Option 1', id: '1', searchableDisplay: 'Lorem' },
    { key: 'Option 2', id: '2', searchableDisplay: 'ipsum' },
    { key: 'Option 3', id: '3', searchableDisplay: 'incididunt' },
    { key: 'Option 4', id: '4', searchableDisplay: 'labore' },
    { key: 'Option 5', id: '5', searchableDisplay: 'AMET' },
    { key: 'Option 6', id: '6', searchableDisplay: 'consectetur' },
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
              @scrollable={{this.scrollable}}
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
            <Args.Bool
              @name="scrollable"
              @defaultValue={{false}}
              @description="Unless false, the dropdown will be scrollable"
              @value={{this.scrollable}}
              @onInput={{fn this.update "scrollable"}}
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
              @scrollable={{this.scrollable}}
              @options={{this.objectOptions}}
              @displayPath="searchableDisplay"
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
              @scrollable={{this.scrollable}}
              @options={{this.objectOptions}}
              @serializationPath="key"
            >
              <:empty>
                <span>Nothing to see here</span>
              </:empty>
              <:display as |option|>
                <span>Custom Display {{option.id}}</span>
              </:display>
              <:option as |option|>
                <span>Custom Option {{option.id}}</span>
              </:option>
            </Select>
          </:example>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>

    <div class="grid">
      <div class="g-col-4">
        <h3>String Options</h3>
        <CodeBlock
          class="border rounded p-3"
          @lang="json"
          @code={{this.stringOptionsSource}}
        />
      </div>
      <div class="g-col-4">
        <h3>Object Options</h3>
        <CodeBlock
          class="border rounded p-3"
          @lang="json"
          @code={{this.objectOptionsSource}}
        />
      </div>
      <div class="g-col-4">
        <h3>Selected</h3>
        <div class="border rounded p-3">
          {{this.selectValue}}
        </div>
      </div>
    </div>
  </template>
}

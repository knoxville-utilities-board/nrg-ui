import { hash } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Select from '@nrg-ui/core/components/form/select';
import { bind } from '@nrg-ui/core/helpers/bind';
import CodeBlock from '@nrg-ui/showcase/components/code-block';
import Section from '@nrg-ui/showcase/components/section';

// Types aren't inferred correctly
function getId(value: unknown) {
  return (value as { id: string }).id;
}

export default class extends Component {
  @tracked
  closeOnSelect = true;

  @tracked
  disabled = false;

  @tracked
  loading = false;

  @tracked
  scrollable = true;

  @tracked
  selectValue?: string;

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

  get stringOptionsSource() {
    return JSON.stringify(this.stringOptions, null, 2);
  }

  get objectOptionsSource() {
    return JSON.stringify(this.objectOptions, null, 2);
  }

  <template>
    <Section @name="Select" as |Section|>
      <Section.Subsection
        @name="String Options"
        @model={{this}}
        @elementTag="button"
      >
        <:example as |model|>
          <Select
            @binding={{bind model "selectValue"}}
            @closeOnSelect={{model.closeOnSelect}}
            @fieldOptions={{hash disabled=model.disabled}}
            @loading={{model.loading}}
            @scrollable={{model.scrollable}}
            @options={{model.stringOptions}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="closeOnSelect"
              @defaultValue={{true}}
              @description="When true, the dropdown will close after selecting an option"
            />
            <Args.Boolean
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, the button will be disabled"
            />
            <Args.Boolean
              @name="loading"
              @defaultValue={{false}}
              @description="When true, the text will be replaced with a loading spinner"
            />
            <Args.Boolean
              @name="scrollable"
              @defaultValue={{false}}
              @description="Unless false, the dropdown will be scrollable"
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>

      <Section.Subsection
        @name="Object Options"
        @model={{this}}
        @elementTag="button"
      >
        <:example as |model|>
          <Select
            @binding={{bind model "selectValue"}}
            @fieldOptions={{hash disabled=model.disabled}}
            @loading={{model.loading}}
            @scrollable={{model.scrollable}}
            @options={{model.objectOptions}}
            @displayPath="searchableDisplay"
            @serializationPath="key"
          />
        </:example>
      </Section.Subsection>

      <Section.Subsection
        @name="Yielded Options"
        @model={{this}}
        @elementTag="button"
      >
        <:example as |model|>
          <Select
            @binding={{bind model "selectValue"}}
            @fieldOptions={{hash disabled=model.disabled}}
            @loading={{model.loading}}
            @scrollable={{model.scrollable}}
            @options={{model.objectOptions}}
            @serializationPath="key"
          >
            <:empty>
              <span>Nothing to see here</span>
            </:empty>
            <:display as |option|>
              <span>Custom Display {{getId option}}</span>
            </:display>
            <:option as |option|>
              <span>Custom Option {{getId option}}</span>
            </:option>
          </Select>
        </:example>
      </Section.Subsection>
    </Section>

    <div class="grid">
      <div class="g-col-4">
        <h3>String Options</h3>
        <CodeBlock
          @lang="json"
          @code={{this.stringOptionsSource}}
          @showCopyButton={{false}}
        />
      </div>
      <div class="g-col-4">
        <h3>Object Options</h3>
        <CodeBlock
          @lang="json"
          @code={{this.objectOptionsSource}}
          @showCopyButton={{false}}
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

import { array, hash } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import MultiSelect from '@nrg-ui/core/components/form/multi-select';
import { bind } from '@nrg-ui/core/helpers/bind';
import CodeBlock from '@nrg-ui/showcase/components/code-block';
import Section from '@nrg-ui/showcase/components/section';

const stringOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
];

const objectOptions = [
  { key: 'Option 1', id: '1', searchableDisplay: 'Lorem' },
  { key: 'Option 2', id: '2', searchableDisplay: 'ipsum' },
  { key: 'Option 3', id: '3', searchableDisplay: 'incididunt' },
  { key: 'Option 4', id: '4', searchableDisplay: 'labore' },
  { key: 'Option 5', id: '5', searchableDisplay: 'AMET' },
  { key: 'Option 6', id: '6', searchableDisplay: 'consectetur' },
];

export default class MultiSelectDemo extends Component {
  @tracked
  closeOnSelect = false;

  @tracked
  disabled = false;

  @tracked
  displayPath = 'searchableDisplay';

  @tracked
  loading = false;

  @tracked
  scrollable = false;

  @tracked
  serializationPath = 'key';

  @tracked
  value = ['Option 2'];

  get stringOptionsSource() {
    return JSON.stringify(stringOptions, null, 2);
  }

  get objectOptionsSource() {
    return JSON.stringify(objectOptions, null, 2);
  }

  <template>
    <Section @name="Multi Select" as |Section|>
      <Section.Subsection
        @name="String Options"
        @model={{this}}
        @elementTag="button"
      >
        <:example as |model|>
          <MultiSelect
            @binding={{bind model "value"}}
            @closeOnSelect={{model.closeOnSelect}}
            @fieldOptions={{hash disabled=model.disabled}}
            @loading={{model.loading}}
            @scrollable={{model.scrollable}}
            @options={{stringOptions}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="closeOnSelect"
              @defaultValue={{false}}
              @description="When true, the dropdown will close after selecting an option"
            />
            <Args.Boolean
              @name="fieldOptions.disabled"
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
          <Api.Actions as |Action p|>
            <Action
              @name="onAdd"
              @description="Callback when an option is added"
              @parameters={{array
                (p "value" type="T" description="The added value")
              }}
            />
            <Action
              @name="onRemove"
              @description="Callback when an option is removed"
              @parameters={{array
                (p "value" type="T" description="The removed value")
              }}
            />
            <Action
              @name="onShow"
              @description="Fired when the dropdown is shown"
              @returnType="Promise<void>"
            />
            <Action
              @name="onHide"
              @description="Fired when the dropdown is hidden"
              @returnType="Promise<void>"
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>

      <Section.Subsection
        @name="Object Options"
        @model={{this}}
        @elementTag="button"
      >
        <:example as |model|>
          <MultiSelect
            @binding={{bind model "value"}}
            @fieldOptions={{hash disabled=model.disabled}}
            @displayPath={{model.displayPath}}
            @loading={{model.loading}}
            @scrollable={{model.scrollable}}
            @options={{objectOptions}}
            @serializationPath={{model.serializationPath}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String
              @name="displayPath"
              @defaultValue="label"
              @description="The path to the property to display in the dropdown"
              @options={{array "key" "id" "searchableDisplay"}}
            />
            <Args.String
              @name="serializationPath"
              @defaultValue="value"
              @description="The path to the property to serialize"
              @options={{array "key" "id" "searchableDisplay"}}
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>

      <Section.Subsection
        @name="Yielded Options"
        @model={{this}}
        @elementTag="button"
      >
        <:example as |model|>
          <MultiSelect
            @binding={{bind model "value"}}
            @fieldOptions={{hash disabled=model.disabled}}
            @loading={{model.loading}}
            @scrollable={{model.scrollable}}
            @options={{objectOptions}}
            @serializationPath="key"
          >
            <:empty>
              Nothing to see here
            </:empty>
            <:display as |valueArray|>
              {{#each valueArray as |value|}}
                {{! @glint-expect-error - This is actually a string since the serializationPath is not null }}
                {{value}}
              {{/each}}
            </:display>
            <:option as |option|>
              <span>Custom Option {{option.key}}</span>
            </:option>
            <:selection as |Option|>
              <span
                class="badge text-bg-primary d-inline-flex align-items-center"
              >
                <span class="me-2">
                  {{Option.value.key}}
                  ({{Option.value.id}})
                </span>
                <Option.Remove />
              </span>
            </:selection>
          </MultiSelect>
        </:example>
      </Section.Subsection>
    </Section>

    <div class="grid">
      <div class="g-col-4">
        <h3>String Options</h3>
        <CodeBlock
          @showCopyButton={{false}}
          @lang="json"
          @code={{this.stringOptionsSource}}
        />
      </div>
      <div class="g-col-4">
        <h3>Object Options</h3>
        <CodeBlock
          @showCopyButton={{false}}
          @lang="json"
          @code={{this.objectOptionsSource}}
        />
      </div>
      <div class="g-col-4">
        <h3>Selected</h3>
        <div class="border rounded p-3">
          {{#if this.value}}
            <ul>
              {{#each this.value as |option|}}
                <li>{{option}}</li>
              {{/each}}
            </ul>
          {{else}}
            <span>Nothing selected</span>
          {{/if}}
        </div>
      </div>
    </div>
  </template>
}

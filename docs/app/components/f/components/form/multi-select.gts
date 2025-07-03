import { array, fn } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import MultiSelect from '@nrg-ui/core/components/form/multi-select';
import { bind } from '@nrg-ui/core/helpers/bind';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../../code-block';

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

  update = (key: keyof MultiSelectDemo, value: unknown) => {
    // @ts-expect-error - Don't need type safety here
    this[key] = value;
  };

  <template>
    {{! @glint-expect-error - Freestyle doesn't have great types }}
    <FreestyleSection @name="Multi Select" as |Section|>
      <Section.subsection @name="String Options">
        {{! @glint-expect-error - Freestyle doesn't have great types }}
        <FreestyleUsage>
          <:example>
            <MultiSelect
              {{! @glint-expect-error - Need to improve types for this }}
              @binding={{bind this "value"}}
              @closeOnSelect={{this.closeOnSelect}}
              @disabled={{this.disabled}}
              @loading={{this.loading}}
              @scrollable={{this.scrollable}}
              @options={{stringOptions}}
            />
          </:example>
          <:api as |Args|>
            <Args.Bool
              @name="closeOnSelect"
              @defaultValue={{false}}
              @description="When true, the dropdown will close after selecting an option"
              @value={{this.closeOnSelect}}
              @onInput={{fn this.update "closeOnSelect"}}
            />
            <Args.Bool
              @name="disabled"
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
            <Args.Action
              @name="onAdd"
              @description="Callback when an option is added"
            >
              <CodeBlock @lang="typescript" @code="(value: T) => unknown" />
            </Args.Action>
            <Args.Action
              @name="onRemove"
              @description="Callback when an option is remove"
            >
              <CodeBlock @lang="typescript" @code="(value: T) => unknown" />
            </Args.Action>
            <Args.Action
              @name="onShow"
              @description="Fired when the dropdown is shown"
            >
              <CodeBlock @lang="typescript" @code="() => Promise<void>" />
            </Args.Action>
            <Args.Action
              @name="onHide"
              @description="Fired when the dropdown is hidden"
            >
              <CodeBlock @lang="typescript" @code="() => Promise<void>" />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>

      <Section.subsection @name="Object Options">
        {{! @glint-expect-error - Freestyle doesn't have great types }}
        <FreestyleUsage>
          <:example>
            <MultiSelect
              {{! @glint-expect-error - Need to improve types for this }}
              @binding={{bind this "value"}}
              @disabled={{this.disabled}}
              @displayPath={{this.displayPath}}
              @loading={{this.loading}}
              @scrollable={{this.scrollable}}
              @options={{objectOptions}}
              @serializationPath={{this.serializationPath}}
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @name="displayPath"
              @defaultValue="label"
              @description="The path to the property to display in the dropdown"
              @options={{array "key" "id" "searchableDisplay"}}
              @onInput={{fn this.update "displayPath"}}
            />
            <Args.String
              @name="serializationPath"
              @defaultValue="value"
              @description="The path to the property to serialize"
              @options={{array "key" "id" "searchableDisplay"}}
              @onInput={{fn this.update "serializationPath"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>

      <Section.subsection @name="Yielded Options">
        {{! @glint-expect-error - Freestyle doesn't have great types }}
        <FreestyleUsage>
          <:example>
            <MultiSelect
              {{! @glint-expect-error - Need to improve types for this }}
              @binding={{bind this "value"}}
              @disabled={{this.disabled}}
              @loading={{this.loading}}
              @scrollable={{this.scrollable}}
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Form::MultiSelect': typeof MultiSelectDemo;
  }
}

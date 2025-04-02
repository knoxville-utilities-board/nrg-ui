// @ts-nocheck - TODO

import { fn } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Search, bind } from '@nrg-ui/core';
import { timeout } from 'ember-concurrency';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../../code-block';

// TypeScript doesn't recognize that this function is used in the template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function log(...msg: string[]) {
  console.log(msg.join(' '));
}

class Model {
  @tracked
  property = 'Apple';
}

export default class SearchDemo extends Component {
  model = new Model();

  @tracked
  class = '';

  @tracked
  basic = false;

  @tracked
  clearable = false;

  @tracked
  disabled = false;

  @tracked
  hideSearchIcon = false;

  @tracked
  stringOptions = [
    'Apple',
    'Pear',
    'Orange',
    'Banana',
    'Grape',
    'Strawberry',
    'Mango',
    'Pineapple',
    'Peach',
    'Cherry',
    'Blueberry',
    'Watermelon',
    'Papaya',
    'Kiwi',
    'Plum',
    'Apricot',
    'Pomegranate',
    'Lemon',
    'Lime',
    'Raspberry',
    'Blackberry',
    'Coconut',
    'Dragon fruit',
    'Lychee',
    'Fig',
    'Tangerine',
  ];

  @tracked
  objectOptions = [
    { key: 'Option 1', fruit: 'Apple' },
    { key: 'Option 2', fruit: 'Pear' },
    { key: 'Option 3', fruit: 'Orange' },
    { key: 'Option 4', fruit: 'Banana' },
    { key: 'Option 5', fruit: 'Grape' },
    { key: 'Option 6', fruit: 'Strawberry' },
    { key: 'Option 7', fruit: 'Mango' },
    { key: 'Option 8', fruit: 'Pineapple' },
    { key: 'Option 9', fruit: 'Peach' },
    { key: 'Option 10', fruit: 'Cherry' },
    { key: 'Option 11', fruit: 'Blueberry' },
    { key: 'Option 12', fruit: 'Watermelon' },
    { key: 'Option 13', fruit: 'Papaya' },
    { key: 'Option 14', fruit: 'Kiwi' },
    { key: 'Option 15', fruit: 'Plum' },
    { key: 'Option 16', fruit: 'Apricot' },
    { key: 'Option 17', fruit: 'Pomegranate' },
    { key: 'Option 18', fruit: 'Lemon' },
    { key: 'Option 19', fruit: 'Lime' },
    { key: 'Option 20', fruit: 'Raspberry' },
    { key: 'Option 21', fruit: 'Blackberry' },
    { key: 'Option 22', fruit: 'Coconut' },
    { key: 'Option 23', fruit: 'Dragon fruit' },
    { key: 'Option 24', fruit: 'Lychee' },
    { key: 'Option 25', fruit: 'Fig' },
    { key: 'Option 26', fruit: 'Tangerine' },
  ];

  @tracked
  loading = false;

  @tracked
  minCharacters = 1;

  @tracked
  noResultsLabel;

  @tracked
  placeholder;

  @tracked
  readonly = false;

  @tracked
  scrollable = true;

  @tracked
  searchTimeout = 300;

  @tracked
  value = '';

  @action
  async stringQuery(searchString: string) {
    await timeout(1000);
    return this.stringOptions.filter((item) =>
      item.toLowerCase().includes(searchString.toLowerCase()),
    );
  }

  @action
  async objectQuery(searchString: string) {
    await timeout(1000);

    const things = this.objectOptions.filter((item) =>
      item.fruit.toLowerCase().includes(searchString.toLowerCase()),
    );
    return things;
  }

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  get stringOptionsSource() {
    return JSON.stringify(this.stringOptions, null, 2);
  }

  get objectOptionsSource() {
    return JSON.stringify(this.objectOptions, null, 2);
  }

  <template>
    <FreestyleSection @name="Search" as |Section|>
      <Section.subsection @name="Basic">
        <FreestyleUsage>
          <:example>
            <Search
              class={{this.class}}
              @basic={{this.basic}}
              @binding={{bind this.model "property"}}
              @clearable={{this.clearable}}
              @disabled={{this.disabled}}
              @hideSearchIcon={{this.hideSearchIcon}}
              @loading={{this.loading}}
              @minCharacters={{this.minCharacters}}
              @noResultsLabel={{this.noResultsLabel}}
              @placeholder={{this.placeholder}}
              @readonly={{this.readonly}}
              @scrollable={{this.scrollable}}
              @searchTimeout={{this.searchTimeout}}
              @onChange={{fn log "The value changed to"}}
              @onQuery={{this.stringQuery}}
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the input. Note that this is not an argument but rather a class applied directly to the input"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
              @options={{this.classOptions}}
            />
            <Args.Bool
              @name="basic"
              @defaultValue={{false}}
              @description="When true, the border will be removed"
              @value={{this.basic}}
              @onInput={{fn this.update "basic"}}
            />
            <Args.String
              @name="binding"
              @description="Create a two-way binding with the value"
              @value={{this.model.property}}
              @onInput={{fn this.update "model.property"}}
            />
            <Args.Bool
              @name="clearable"
              @defaultValue={{false}}
              @description="When true, adds a clear button"
              @value={{this.clearable}}
              @onInput={{fn this.update "clearable"}}
            />
            <Args.Bool
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, the input will be disabled"
              @value={{this.disabled}}
              @onInput={{fn this.update "disabled"}}
            />
            <Args.Bool
              @name="hideSearchIcon"
              @defaultValue={{false}}
              @description="When true, the search icon will be hidden"
              @value={{this.hideSearchIcon}}
              @onInput={{fn this.update "hideSearchIcon"}}
            />
            <Args.Bool
              @name="loading"
              @defaultValue={{false}}
              @description="When true, the icon will be replaced with a loading spinner. Note: the loading indicator will not be displayed if the basic option is set to true"
              @value={{this.loading}}
              @onInput={{fn this.update "loading"}}
            />
            <Args.Number
              @name="minCharacters"
              @defaultValue={{1}}
              @description="The minimum number of characters needed to start a search"
              @value={{this.minCharacters}}
              @onInput={{fn this.update "minCharacters"}}
            />
            <Args.String
              @name="noResultsLabel"
              @defaultValue="No results found"
              @description="The label to display when no results are found"
              @value={{this.noResultsLabel}}
              @onInput={{fn this.update "noResultsLabel"}}
            />
            <Args.String
              @name="placeholder"
              @defaultValue="Search"
              @description="The placeholder text"
              @value={{this.placeholder}}
              @onInput={{fn this.update "placeholder"}}
            />
            <Args.Bool
              @name="readonly"
              @defaultValue={{false}}
              @description="When true, the input will be readonly"
              @value={{this.readonly}}
              @onInput={{fn this.update "readonly"}}
            />
            <Args.Bool
              @name="scrollable"
              @defaultValue={{true}}
              @description="Unless false, the dropdown will be scrollable"
              @value={{this.scrollable}}
              @onInput={{fn this.update "scrollable"}}
            />
            <Args.Number
              @name="searchTimeout"
              @defaultValue={{300}}
              @description="The amount of time to wait before searching"
              @value={{this.searchTimeout}}
              @onInput={{fn this.update "searchTimeout"}}
            />
            <Args.Action
              @name="onQuery"
              @description="A function that return an array of string or object options"
            >
              <CodeBlock
                @lang="typescript"
                @code="(string: searchString) => T[]"
              />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>

      <Section.subsection @name="Object Options">
        <FreestyleUsage>
          <:example>
            <Search
              class={{this.class}}
              @basic={{this.basic}}
              @binding={{bind this.model "property"}}
              @clearable={{this.clearable}}
              @disabled={{this.disabled}}
              @displayPath="fruit"
              @hideSearchIcon={{this.hideSearchIcon}}
              @loading={{this.loading}}
              @minCharacters={{this.minCharacters}}
              @noResultsLabel={{this.noResultsLabel}}
              @placeholder={{this.placeholder}}
              @readonly={{this.readonly}}
              @scrollable={{this.scrollable}}
              @searchTimeout={{this.searchTimeout}}
              @serializationPath="key"
              @onChange={{fn log "The value changed to"}}
              @onQuery={{this.objectQuery}}
            />
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
          class="border rounded p-3 scrollable"
          @lang="json"
          @code={{this.objectOptionsSource}}
        />
      </div>
      <div class="g-col-4">
        <h3>Selected</h3>
        <div class="border rounded p-3">
          {{this.model.property}}
        </div>
      </div>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Form::Search': typeof SearchDemo;
  }
}

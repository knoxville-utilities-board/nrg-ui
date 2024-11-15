import { fn } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Autocomplete, bind } from '@nrg-ui/core';
import { timeout } from 'ember-concurrency';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../code-block';

// TypeScript doesn't recognize that this function is used in the template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function log(...msg: string[]) {
  console.log(msg.join(' '));
}

class Model {
  @tracked
  property = '';
}

export default class extends Component {
  @tracked
  class = '';

  model = new Model();

  @tracked
  basic = false;

  @tracked
  disabled = false;

  @tracked
  hideSearchIcon = false;

  @tracked
  loading = false;

  @tracked
  minCharacters = 1;

  @tracked
  noResultsLabel = "No results found";

  @tracked
  placeholder = "Search";

  @tracked
  searchTimeout = 300;

  @tracked
  readonly = false;

  @tracked
  value = '';

  @tracked
  items = ["Apple", "Pear", "Orange", "Banana", "Grape", "Strawberry", "Mango", "Pineapple", "Peach", "Cherry", "Blueberry"];

  @action
  async query(searchString: string) {
    await timeout(1000);
    return this.items.filter((item) => item.toLowerCase().includes(searchString.toLowerCase()));
  }

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  <template>
    <FreestyleSection @name="Autocomplete" as |Section|>
      <Section.subsection @name="Basic">
        <FreestyleUsage>
          <:example>
            <Autocomplete
              class={{this.class}}
              @basic={{this.basic}}
              @binding={{bind this.model "property"}}
              @disabled={{this.disabled}}
              @hideSearchIcon={{this.hideSearchIcon}}
              @loading={{this.loading}}
              @noResultsLabel={{this.noResultsLabel}}
              @minCharacters={{this.minCharacters}}
              @placeholder={{this.placeholder}}
              @searchTimeout={{this.searchTimeout}}
              @readonly={{this.readonly}}
              @onChange={{fn log "The value changed to"}}
              @query={{this.query}}
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
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, the input will be disabled"
              @value={{this.disabled}}
              @onInput={{fn this.update "disabled"}}
            />
            <Args.Bool
              @name="hideSearchIcon"
              @defaultValue={{false}}
              @description="When true, the text will be replaced with a hideSearchIcon spinner"
              @value={{this.hideSearchIcon}}
              @onInput={{fn this.update "hideSearchIcon"}}
            />
            <Args.Bool
              @name="loading"
              @defaultValue={{false}}
              @description="When true, the text will be replaced with a loading spinner"
              @value={{this.loading}}
              @onInput={{fn this.update "loading"}}
            />
            <Args.Number
              @name="minCharacters"
              @defaultValue={{1}}
              @description="The minimum number of characters needed to search"
              @value={{this.minCharacters}}
              @onInput={{fn this.update "minCharacters"}}
            />
            <Args.String
              @name="noResultsLabel"
              @description="The label to display when no results are found"
              @value={{this.noResultsLabel}}
              @onInput={{fn this.update "noResultsLabel"}}
            />
            <Args.String
              @name="placeholder"
              @description="The placeholder text"
              @value={{this.placeholder}}
              @onInput={{fn this.update "placeholder"}}
            />
            <Args.Number
              @name="searchTimeout"
              @description="The amount of time to wait before searching"
              @value={{this.searchTimeout}}
              @onInput={{fn this.update "searchTimeout"}}
            />
            <Args.Bool
              @name="readonly"
              @defaultValue={{false}}
              @description="When true, the input will be readonly"
              @value={{this.readonly}}
              @onInput={{fn this.update "readonly"}}
            />
            <Args.Action
              @name="isDateDisabled"
              @description="A function that receives a date and returns whether it should be disabled"
            >
              <CodeBlock
                @lang="typescript"
                @code="(string: searchString) => string[]"
              />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

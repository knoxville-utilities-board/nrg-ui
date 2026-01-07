import { array, fn, hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Search from '@nrg-ui/core/components/form/search';
import { bind } from '@nrg-ui/core/helpers/bind';
import CodeBlock from '@nrg-ui/showcase/components/code-block';
import Section from '@nrg-ui/showcase/components/section';
import { timeout } from 'ember-concurrency';

function print(...msg: unknown[]) {
  console.log(msg.join(' '));
}

export default class SearchDemo extends Component {
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
  noResultsLabel = 'No results found';

  // TODO: This is an HTML attribute, it should be removed
  @tracked
  placeholder = 'Search';

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

  get stringOptionsSource() {
    return JSON.stringify(this.stringOptions, null, 2);
  }

  get objectOptionsSource() {
    return JSON.stringify(this.objectOptions, null, 2);
  }

  <template>
    <Section @name="Search" as |Section|>
      <Section.Subsection @name="Basic" @model={{this}} @elementTag="div">
        <:example as |model|>
          <Search
            @basic={{model.basic}}
            @binding={{bind model "property"}}
            @clearable={{model.clearable}}
            @fieldOptions={{hash disabled=model.disabled}}
            @hideSearchIcon={{model.hideSearchIcon}}
            @loading={{model.loading}}
            @minCharacters={{model.minCharacters}}
            @noResultsLabel={{model.noResultsLabel}}
            @placeholder={{model.placeholder}}
            @readonly={{model.readonly}}
            @scrollable={{model.scrollable}}
            @searchTimeout={{model.searchTimeout}}
            @onChange={{fn print "The value changed to"}}
            @onQuery={{model.stringQuery}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="basic"
              @defaultValue={{false}}
              @description="When true, the border will be removed"
            />
            <Args.Boolean
              @name="clearable"
              @defaultValue={{false}}
              @description="When true, adds a clear button"
            />
            <Args.Boolean
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, the input will be disabled"
            />
            <Args.Boolean
              @name="hideSearchIcon"
              @defaultValue={{false}}
              @description="When true, the search icon will be hidden"
            />
            <Args.Boolean
              @name="loading"
              @defaultValue={{false}}
              @description="When true, the icon will be replaced with a loading spinner. Note: the loading indicator will not be displayed if the basic option is set to true"
            />
            <Args.Number
              @name="minCharacters"
              @defaultValue={{1}}
              @description="The minimum number of characters needed to start a search"
            />
            <Args.String
              @name="noResultsLabel"
              @defaultValue="No results found"
              @description="The label to display when no results are found"
            />
            <Args.String
              @name="placeholder"
              @defaultValue="Search"
              @description="The placeholder text"
            />
            <Args.Boolean
              @name="readonly"
              @defaultValue={{false}}
              @description="When true, the input will be readonly"
            />
            <Args.Boolean
              @name="scrollable"
              @defaultValue={{true}}
              @description="Unless false, the dropdown will be scrollable"
            />
            <Args.Number
              @name="searchTimeout"
              @defaultValue={{300}}
              @description="The amount of time to wait before searching"
            />
          </Api.Arguments>
          <Api.Actions as |Action p|>
            <Action
              @name="onQuery"
              @description="A function that return an array of string or object options"
              @parameters={{array (p "searchString" type="string")}}
              @returnType="Promise<T[]>"
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>

      <Section.Subsection @name="Object Options" @model={{this}} @elementTag="div">
        <:example as |model|>
          <Search
            @basic={{model.basic}}
            @binding={{bind model "property"}}
            @clearable={{model.clearable}}
            @displayPath="fruit"
            @fieldOptions={{hash disabled=model.disabled}}
            @hideSearchIcon={{model.hideSearchIcon}}
            @loading={{model.loading}}
            @minCharacters={{model.minCharacters}}
            @noResultsLabel={{model.noResultsLabel}}
            @placeholder={{model.placeholder}}
            @readonly={{model.readonly}}
            @scrollable={{model.scrollable}}
            @searchTimeout={{model.searchTimeout}}
            @serializationPath="key"
            @onChange={{fn print "The value changed to"}}
            @onQuery={{model.objectQuery}}
          />
        </:example>
      </Section.Subsection>
    </Section>

    <div class="grid">
      <div class="g-col-4">
        <h3>String Options</h3>
        <CodeBlock @lang="json" @code={{this.stringOptionsSource}} @showCopyButton={{false}} />
      </div>
      <div class="g-col-4">
        <h3>Object Options</h3>
        <CodeBlock @lang="json" @code={{this.objectOptionsSource}} @showCopyButton={{false}} />
      </div>
      <div class="g-col-4">
        <h3>Selected</h3>
        <div class="border border-secondary rounded p-3">
          {{this.value}}
        </div>
      </div>
    </div>
  </template>
}

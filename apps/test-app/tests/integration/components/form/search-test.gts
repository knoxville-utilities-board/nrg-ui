import { click, fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { Search, bind } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

class Model {
  @tracked
  value: string = '';
}

module('Integration | Component | form/search', function (hooks) {
  setupRenderingTest(hooks);

  const actionHandler = (text: string) => {
    const fruits = [
      'Apple',
      'Banana',
      'Orange',
      'Strawberry',
      'Mango',
      'Pineapple',
      'Grapes',
      'Kiwi',
      'Pear',
      'Watermelon',
    ];

    const filteredFruits = fruits.filter((fruit) =>
      fruit.toLowerCase().includes(text.toLowerCase()),
    );

    console.log(filteredFruits);

    return filteredFruits;
  };

  test('it renders', async function (assert) {
    assert.expect(12);

    const model = new Model();

    await render(<template>
      <Search @binding={{bind model "value"}} @query={{actionHandler}} />
    </template>);

    assert.dom('div > input').hasClass('form-control').hasValue('');

    await fillIn('div > input', 'an');

    assert.dom('div > input').hasValue('an');

    assert.dom('div > ul > li:first-child').hasText('Banana');
    assert.dom('div > ul > li:nth-child(2)').hasText('Orange');
    assert.dom('div > ul > li:nth-child(3)').hasText('Mango');

    await click('div > ul > li:nth-child(2)');

    assert.dom('div > input').hasValue('Orange');

    await fillIn('div > input', 'ap');

    assert.dom('div > input').hasValue('ap');

    assert.dom('div > ul > li:first-child').hasText('Apple');
    assert.dom('div > ul > li:nth-child(2)').hasText('Pineapple');
    assert.dom('div > ul > li:nth-child(3)').hasText('Grapes');

    await click('div > ul > li:nth-child(3)');

    assert.dom('div > input').hasValue('Grapes');
  });

  test('it shows no results', async function (assert) {
    assert.expect(5);

    const model = new Model();

    await render(<template>
      <Search @binding={{bind model "value"}} @query={{actionHandler}} />
    </template>);

    assert.dom('div > input').hasClass('form-control').hasValue('');

    await fillIn('div > input', 'test string');

    assert.dom('div > input').hasValue('test string');

    assert
      .dom('div > ul > li:first-child')
      .hasClass('disabled')
      .hasText('No results found');
  });

  test('it shows an icon and loading', async function (assert) {
    assert.expect(4);

    const model = new Model();

    await render(<template>
      <Search @binding={{bind model "value"}} @query={{actionHandler}} />
    </template>);

    assert.dom('.spinner-border').doesNotExist();
    assert.dom('.bi-search').exists();

    await render(<template>
      <Search
        @binding={{bind model "value"}}
        @query={{actionHandler}}
        @loading={{true}}
      />
    </template>);

    assert.dom('.spinner-border').exists();
    assert.dom('.bi-search').doesNotExist();
  });

  test('it shows basic', async function (assert) {
    assert.expect(3);

    const model = new Model();

    await render(<template>
      <Search
        @binding={{bind model "value"}}
        @query={{actionHandler}}
        @basic={{true}}
      />
    </template>);

    assert.dom('.spinner-border').doesNotExist();
    assert.dom('.bi-search').doesNotExist();
    assert.dom('button').doesNotExist();
  });

  test('it shows clear button', async function (assert) {
    assert.expect(5);

    const model = new Model();

    await render(<template>
      <Search
        @binding={{bind model "value"}}
        @query={{actionHandler}}
        @clearable={{true}}
      />
    </template>);

    assert.dom('div > input').hasClass('form-control').hasValue('');

    await fillIn('div > input', 'an');

    assert.dom('div > input').hasValue('an');

    assert.dom('button').exists();

    await click('button');

    assert.dom('div > input').hasValue('');
  });
});

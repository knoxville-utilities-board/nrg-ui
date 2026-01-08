import { fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { TextArea, bind } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

import type { Optional } from '@nrg-ui/core';

class Model {
  @tracked
  value: string = 'Hello, world!';
}

module('Integration | Component | form/text-area', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders (inline)', async function (assert) {
    assert.expect(5);

    const model = new Model();
    const actionHandler = (text: Optional<string>) => {
      assert.strictEqual(text, 'Foo bar');
    };

    await render(
      <template><TextArea @binding={{bind model "value"}} @onChange={{actionHandler}} /></template>,
    );

    assert.dom('textarea').hasClass('form-control').hasValue('Hello, world!');

    await fillIn('div > textarea', 'Foo bar');

    assert.dom('div > textarea').hasValue('Foo bar');

    await render(
      <template>
        <TextArea @binding={{bind model "value"}} @basic={{true}} @onChange={{actionHandler}} />
      </template>,
    );

    assert.dom('div > textarea').hasClass('form-control-plaintext');
  });
});

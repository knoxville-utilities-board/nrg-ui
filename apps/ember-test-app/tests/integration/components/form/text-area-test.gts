import { fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import TextArea from '@nrg-ui/ember/components/form/text-area';
import bind from '@nrg-ui/ember/helpers/bind';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

class Model {
  @tracked
  value: string = 'Hello, world!';
}

module('Integration | Component | form/text-area', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders (inline)', async function (assert) {
    assert.expect(5);

    const model = new Model();
    const actionHandler = (text) => {
      assert.strictEqual(text, 'Foo bar');
    };

    await render(<template>
      <TextArea @binding={{bind model "value"}} @onChange={{actionHandler}} />
    </template>);

    assert.dom('textarea').hasClass('form-control').hasValue('Hello, world!');

    await fillIn('div > textarea', 'Foo bar');

    assert.dom('div > textarea').hasValue('Foo bar');

    await render(<template>
      <TextArea
        @binding={{bind model "value"}}
        @basic={{true}}
        @onChange={{actionHandler}}
      />
    </template>);

    assert.dom('div > textarea').hasClass('form-control-plaintext');
  });
});

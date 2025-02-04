import { collapseWhitespace } from '@nrg-ui/core/utils/string';
import { module, test } from 'qunit';

module('Unit | Utility | string', function () {
  test('collapseWhitespace works', function (assert) {
    assert.strictEqual(
      collapseWhitespace('  foo bar'),
      'foo bar',
      'removes leading whitespace',
    );
    assert.strictEqual(
      collapseWhitespace('foo bar  '),
      'foo bar',
      'removes trailing whitespace',
    );
    assert.strictEqual(
      collapseWhitespace(' foo  bar '),
      'foo bar',
      'removes leading and trailing whitespace',
    );
    assert.strictEqual(
      collapseWhitespace('\t\n\r foo \t bar \n'),
      'foo bar',
      'removes all kinds of whitespace',
    );
  });
});

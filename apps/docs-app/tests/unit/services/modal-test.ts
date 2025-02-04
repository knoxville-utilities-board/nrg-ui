import { setupTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

import type Modal from '@nrg-ui/core/services/modal';

const modalId1 = 'modal1';
const modalId2 = 'modal2';
const modalId3 = 'modal3';

module('Unit | Service | modal', function (hooks) {
  setupTest(hooks);

  test('openModal adds modal id to modalIds', function (assert) {
    const service = this.owner.lookup('service:modal') as Modal;

    service.openModal(modalId1);

    assert.true(
      service.modalIds.includes(modalId1),
      'Modal id should be added to modalIds',
    );
    assert.strictEqual(
      service.activeModal,
      modalId1,
      'Most recently opened modal should be active',
    );
    assert.strictEqual(
      service.modalIds.length,
      1,
      'Only one modal should be open',
    );

    service.openModal(modalId1);
    assert.strictEqual(
      service.modalIds.length,
      1,
      'Modal should not be added twice',
    );
  });

  test('closeModal removes modal id from modalIds', function (assert) {
    const service = this.owner.lookup('service:modal') as Modal;

    service.openModal(modalId1);
    assert.strictEqual(
      service.modalIds.length,
      1,
      'Only one modal should be open',
    );

    service.closeModal(modalId1);
    assert.strictEqual(service.modalIds.length, 0, 'No modals should be open');
  });

  test('closeModal does not break when modalId is not present', function (assert) {
    const service = this.owner.lookup('service:modal') as Modal;

    assert.strictEqual(service.modalIds.length, 0, 'No modals should be open');
    service.closeModal(modalId1);
    assert.strictEqual(service.modalIds.length, 0, 'No modals should be open');
  });

  test('multiple modals can be opened and closed', function (assert) {
    const service = this.owner.lookup('service:modal') as Modal;

    service.openModal(modalId1);
    service.openModal(modalId2);
    service.openModal(modalId3);

    assert.strictEqual(
      service.modalIds.length,
      3,
      'Three modals should be open',
    );
    assert.strictEqual(
      service.activeModal,
      modalId3,
      'Most recently opened modal should be active',
    );

    service.closeModal(modalId2);
    assert.strictEqual(service.modalIds.length, 2, 'Two modals should be open');
    assert.strictEqual(
      service.activeModal,
      modalId3,
      'Most recently opened modal should still be active',
    );

    service.closeModal(modalId3);
    assert.strictEqual(service.modalIds.length, 1, 'One modal should be open');
    assert.strictEqual(
      service.activeModal,
      modalId1,
      'First modal should now be active',
    );

    service.closeModal(modalId1);
    assert.strictEqual(service.modalIds.length, 0, 'No modals should be open');
    assert.strictEqual(
      service.activeModal,
      undefined,
      'No modals should be active',
    );
  });
});

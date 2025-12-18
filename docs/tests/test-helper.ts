import { setApplication } from '@ember/test-helpers';
import Application from 'docs/app';
import config from 'docs/config/environment';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

export function start() {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);
  setupEmberOnerrorValidation();

  qunitStart();
}

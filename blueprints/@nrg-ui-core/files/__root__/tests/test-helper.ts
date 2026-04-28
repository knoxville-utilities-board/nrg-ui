import { setApplication } from '@ember/test-helpers';
import { configure as configureNrg } from '@nrg-ui/core';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import Application from '<%= modulePrefix %>/app';
import config from '<%= modulePrefix %>/config/environment';

export function start() {
  setApplication(Application.create(config.APP));
  configureNrg();

  setup(QUnit.assert);
  setupEmberOnerrorValidation();

  qunitStart();
}

import { setApplication } from '@ember/test-helpers';
import Application from 'docs/app';
import config from 'docs/config/environment';
import { setupEmberOnerrorValidation, start } from 'ember-qunit';
import { loadTests } from 'ember-qunit/test-loader';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

setupEmberOnerrorValidation();
loadTests();
start();

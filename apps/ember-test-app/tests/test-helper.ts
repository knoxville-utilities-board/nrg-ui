import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import Application from 'ember-test-app/app';
import config from 'ember-test-app/config/environment';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();

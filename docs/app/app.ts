import Application from '@ember/application';
import setupInspector from '@embroider/legacy-inspector-support/ember-source-4.12';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';
import config from 'docs/config/environment';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

import '@nrg-ui/css/main.css';
import 'docs/assets/css/app.css';

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow.ts');
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  inspector = setupInspector(this);
}

loadInitializers(App, config.modulePrefix);

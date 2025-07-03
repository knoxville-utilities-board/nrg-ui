import Application from '@ember/application';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';
import compatModules from '@embroider/virtual/compat-modules';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

import config from './config/environment';

import '@nrg-ui/css/main.css';
import 'docs/assets/css/app.css';

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow.ts');
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver.withModules(compatModules);
}

loadInitializers(App, config.modulePrefix, compatModules);

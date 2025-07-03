import Application from '@ember/application';
import config from "./config/environment";
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

import '@nrg-ui/css/main.css';
import 'docs/assets/css/app.css';

import compatModules from "@embroider/virtual/compat-modules";

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver.withModules(compatModules);
}

loadInitializers(App, config.modulePrefix, compatModules);

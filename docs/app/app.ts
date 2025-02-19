import Application from '@ember/application';
import config from 'docs/config/environment';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

import '@nrg-ui/css/main.css';
import 'docs/assets/css/app.css';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

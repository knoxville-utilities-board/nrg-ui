import { isDevelopingApp, isTesting, macroCondition } from '@embroider/macros';
import Component from '@glimmer/component';
import Scaffold from '@nrg-ui/core/components/scaffold';
import version from '@nrg-ui/core/helpers/version';
import pageTitle from 'ember-page-title/helpers/page-title';

import logo from '#app/assets/images/logo.svg';

function generateComponentMap(fileGlobs: Record<string, unknown>, baseRoute = '') {
  let baseRoutePrefix = './';
  if (baseRoute) {
    // Handle nested routes
    baseRoutePrefix += `${baseRoute.replace(/\./g, '/')}/`;
  }
  return Object.keys(fileGlobs)
    .map((path) => path.replace(baseRoutePrefix, '').replace('.gts', ''))
    .filter((routeName) => routeName !== 'index')
    .map((routeName) => ({
      route: baseRoute ? `${baseRoute}.${routeName}` : routeName,
      label: routeName
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' '),
    }));
}

export default class Application extends Component {
  get coreComponentMap() {
    return generateComponentMap(import.meta.glob('./core-components/*.gts'), 'core-components');
  }

  get formComponentMap() {
    return generateComponentMap(
      import.meta.glob('./core-components/form/*.gts'),
      'core-components.form',
    );
  }

  get marketingComponentMap() {
    return generateComponentMap(import.meta.glob('./mktg-components/*.gts'), 'mktg-components');
  }

  get rootComponentMap() {
    // TODO: Implement services and helpers files
    const excludedComponents = ['services', 'helpers'];

    // Component files with the same name as a directory should not be shown
    const rootComponentGlobsWithoutDirectory = Object.fromEntries(
      Object.entries(import.meta.glob('./*.gts')).filter(([path]) => {
        const name = path.replace('./', '').replace('.gts', '');
        return !this.templateDirectories.includes(name) && !excludedComponents.includes(name);
      }),
    );

    return generateComponentMap(rootComponentGlobsWithoutDirectory);
  }

  get templateDirectories() {
    return Array.from(
      new Set(
        Object.keys(import.meta.glob('./**/*.gts'))
          .map((p) => p.replace('./', ''))
          .filter((p) => p.includes('/'))
          .map((p) => p.split('/')[0]),
      ),
    );
  }

  get environment() {
    if (macroCondition(isTesting())) {
      return 'test';
    }
    if (macroCondition(isDevelopingApp())) {
      return 'dev';
    }
    return 'prod';
  }

  <template>
    {{pageTitle "@nrg-ui/core"}}

    {{! BEGIN-SNIPPET scaffold-component }}
    <Scaffold @environment={{this.environment}}>
      <:app-bar-left as |AppBar|>
        <p class="d-none d-md-block m-0 ps-3 fs-5">
          Docs | @nrg-ui/core
        </p>
        <AppBar.Environment />
      </:app-bar-left>
      <:sidebar as |Menu|>
        {{#each this.rootComponentMap as |rootComponent|}}
          <Menu.Item @route={{rootComponent.route}}>
            {{rootComponent.label}}
          </Menu.Item>
        {{/each}}
        <Menu.Group @route="core-components.index">
          <:badge>
            {{this.coreComponentMap.length}}
          </:badge>
          <:header>
            Components
          </:header>
          <:items as |Item|>
            {{#each this.coreComponentMap as |coreComponent|}}
              <Item @route={{coreComponent.route}}>
                {{coreComponent.label}}
              </Item>
            {{/each}}
          </:items>
        </Menu.Group>
        <Menu.Group @route="core-components.form.index">
          <:badge>
            {{this.formComponentMap.length}}
          </:badge>
          <:header>
            Forms
          </:header>
          <:items as |Item|>
            {{#each this.formComponentMap as |formComponent|}}
              <Item @route={{formComponent.route}}>
                {{formComponent.label}}
              </Item>
            {{/each}}
          </:items>
        </Menu.Group>
        <Menu.Group @route="mktg-components.index">
          <:badge>
            {{this.marketingComponentMap.length}}
          </:badge>
          <:header>
            Marketing Components
          </:header>
          <:items as |Item|>
            {{#each this.marketingComponentMap as |marketingComponent|}}
              <Item @route={{marketingComponent.route}}>
                {{marketingComponent.label}}
              </Item>
            {{/each}}
          </:items>
        </Menu.Group>
        <Menu.Item @url="https://example.com">
          <:default>
            External Link
          </:default>
          <:badge>
            9+
          </:badge>
        </Menu.Item>
      </:sidebar>
      <:sidebar-footer as |Item|>
        <Item target="_blank" @url="https://github.com/knoxville-utilities-board/nrg-ui">
          {{version}}
        </Item>
      </:sidebar-footer>
      <:default>
        {{outlet}}
      </:default>
      <:footer-left>
        <a
          aria-label="Knoxville Utilities Board"
          class="p-0 d-none d-md-block"
          href="https://www.kub.org/"
        >
          <img src={{logo}} alt="Knoxville Utilities Board" />
        </a>
        <span class="mb-0 p-0 px-md-3 align-content-center">
          &copy; Knoxville Utilities Board
        </span>
      </:footer-left>
    </Scaffold>
    {{! END-SNIPPET }}
  </template>
}

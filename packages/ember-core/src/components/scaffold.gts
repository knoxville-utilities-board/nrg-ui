import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { and, or } from 'ember-truth-helpers';

import AppBar from './app-bar.gts';
import Footer from './footer.gts';
import Sidebar from './sidebar.gts';
import ThemeSwitcher from './theme-switcher.gts';
import Toaster from './toaster.gts';

import type { AppBarSignature } from './app-bar.gts';
import type { GroupSignature, ItemSignature } from './sidebar.gts';
import type ResponsiveService from '../services/responsive.ts';
import type { ComponentLike } from '@glint/template';

type AppBarYieldType = AppBarSignature['Blocks']['center'][0];

export interface ScaffoldSignature {
  Element: HTMLDivElement;
  Args: {
    allowThemes?: boolean;
    environment?: string;
  };
  Blocks: {
    'app-bar-left': [];
    'app-bar-center': [AppBarYieldType];
    'app-bar-right': [];
    'app-bar-mobile-drop-section': [];
    default: [];
    'footer-left': [];
    'footer-right': [];
    sidebar: [
      {
        Item: ComponentLike<ItemSignature>;
        Group: ComponentLike<GroupSignature>;
      },
    ];
    'sidebar-footer': [ComponentLike<ItemSignature>];
  };
}

export default class Scaffold extends Component<ScaffoldSignature> {
  @service
  declare responsive: ResponsiveService;

  @tracked
  _showSidebar?: boolean;

  get showSidebar() {
    return this._showSidebar ?? !this.responsive.isMobileDevice;
  }

  set showSidebar(value: boolean) {
    this._showSidebar = value;
  }

  get allowThemes() {
    return this.args.allowThemes ?? true;
  }

  get sidebarIcon() {
    if (!this.showSidebar) {
      return 'list';
    }
    return this.responsive.isMobileDevice ? 'x-lg' : 'list';
  }

  toggleSidebar = () => {
    this.showSidebar = !this.showSidebar;
  };

  <template>
    {{#let
      (or (has-block "sidebar") (has-block "sidebar-footer"))
      as |hasSidebar|
    }}
      <div class="min-vh-100 d-flex flex-column">
        <AppBar @environment={{@environment}}>
          <:left>
            {{#if hasSidebar}}
              <i
                class="bi-{{this.sidebarIcon}} fs-4 px-3"
                role="button"
                {{on "click" this.toggleSidebar}}
              />
            {{/if}}
            {{yield to="app-bar-left"}}
          </:left>
          <:center as |AppBar|>
            {{yield AppBar to="app-bar-center"}}
            {{#unless (has-block-params "app-bar-center")}}
              <AppBar.Environment />
            {{/unless}}
          </:center>
          <:right>
            {{yield to="app-bar-right"}}
            {{#if this.allowThemes}}
              <ThemeSwitcher />
            {{/if}}
          </:right>
          <:mobile-drop-section>
            {{yield to="app-bar-mobile-drop-section"}}
          </:mobile-drop-section>
        </AppBar>
        <div class="application" ...attributes>
          <Toaster />
          {{#if (and hasSidebar this.showSidebar)}}
            <div
              class="col-12 col-md-2 d-flex flex-column sticky-top overflow-auto"
            >
              <Sidebar>
                <:default as |Menu|>
                  {{yield Menu to="sidebar"}}
                </:default>
                <:footer as |Item|>
                  {{yield Item to="sidebar-footer"}}
                </:footer>
              </Sidebar>
            </div>
          {{/if}}
          <div
            class="col flex-grow-1 justify-content-between overflow-auto px-md-0 d-flex flex-column"
          >
            <main class="col">
              {{yield}}
            </main>
            {{#if (or (has-block "footer-left") (has-block "footer-right"))}}
              <Footer>
                <:left>
                  {{yield to="footer-left"}}
                </:left>
                <:right>
                  {{yield to="footer-right"}}
                </:right>
              </Footer>
            {{/if}}
          </div>
        </div>
      </div>
    {{/let}}
  </template>
}

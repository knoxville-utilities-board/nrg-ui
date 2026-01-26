import { fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { getOwner } from '@ember/owner';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import { runTask } from 'ember-lifeline';
import { and, or } from 'ember-truth-helpers';

import AppBar from './app-bar.gts';
import ContextMenu, { ContextMenuItem } from './context-menu.gts';
import Footer from './footer.gts';
import Modal from './modal.gts';
import Sidebar from './sidebar.gts';
import ThemeControl from './theme-control.gts';
import Toaster from './toaster.gts';
import version from '../helpers/version.ts';

import type { AppBarBlock } from './app-bar.gts';
import type { Group, Item } from './sidebar.gts';
import type { Dropdown as ContextMenuType } from '../services/context-menu.ts';
import type ResponsiveService from '../services/responsive.ts';
import type ThemeService from '../services/theme.ts';
import type { WithBoundArgs } from '@glint/template';
import type { IntlService } from 'ember-intl';

type EnvironmentConfig = Record<string, string> & {
  modulePrefix: string;
};

export interface ScaffoldOptions {
  contextMenuId: string;
}

export interface ScaffoldSignature {
  Element: HTMLDivElement;
  Args: {
    allowThemes?: boolean;
    contextMenuId?: string;
    environment?: string;
    onSidebarToggle?: (open: boolean) => void;
  };
  Blocks: {
    'app-bar-left': [AppBarBlock];
    'app-bar-right': [AppBarBlock];
    'context-menu': [ContextMenuType, string];
    default: [ScaffoldOptions];
    'footer-left': [];
    'footer-right': [];
    about: [];
    sidebar: [
      {
        Item: WithBoundArgs<typeof Item, 'header' | 'onClickInternal'>;
        Group: WithBoundArgs<typeof Group, 'onClickInternal'>;
      },
    ];
    'sidebar-footer': [WithBoundArgs<typeof Item, 'onClickInternal'>];
  };
}

export default class Scaffold extends Component<ScaffoldSignature> {
  self: Record<'isDark', boolean> = this;

  @service
  declare intl: IntlService;

  @service
  declare responsive: ResponsiveService;

  @service
  declare theme: ThemeService;

  @tracked
  showAboutModel = false;

  @tracked
  _showSidebar?: boolean;

  get showSidebar() {
    return (
      this._showSidebar ?? !(this.responsive.isMobileScreenGroup || this.responsive.isMediumScreen)
    );
  }

  set showSidebar(value: boolean) {
    this._showSidebar = value;
  }

  get allowThemes() {
    return this.args.allowThemes ?? true;
  }

  get contextMenuId() {
    return this.args.contextMenuId ?? 'application';
  }

  get environmentConfig() {
    // @ts-expect-error - this is a private API
    return getOwner(this)!.resolveRegistration('config:environment') as EnvironmentConfig;
  }

  get sidebarIcon() {
    if (!this.showSidebar) {
      return 'list';
    }
    return this.responsive.isMobileScreenGroup || this.responsive.isMediumScreen ? 'x-lg' : 'list';
  }

  get isDark() {
    return this.theme.value === 'dark';
  }

  set isDark(value: boolean) {
    this.theme.value = value ? 'dark' : 'light';
  }

  toggleSidebar = () => {
    this.showSidebar = !this.showSidebar;
    this.args.onSidebarToggle?.(this.showSidebar);
  };

  toggleAboutModal = (open: boolean) => {
    this.showAboutModel = open;
  };

  sidebarClicked = (evt: MouseEvent) => {
    evt?.preventDefault?.();
    evt?.stopPropagation?.();
    if (this.responsive.isMobileScreenGroup) {
      runTask(this, () => {
        this.showSidebar = false;
      });
    }
  };

  <template>
    {{#let (or (has-block "sidebar") (has-block "sidebar-footer")) as |hasSidebar|}}
      <div class="min-dvh-100 d-flex flex-column">
        <AppBar @environment={{@environment}}>
          <:left as |AppBar|>
            {{#if hasSidebar}}
              <i
                class="bi-{{this.sidebarIcon}} fs-4 ps-3"
                role="button"
                {{on "click" this.toggleSidebar}}
              />
            {{/if}}
            {{yield AppBar to="app-bar-left"}}
          </:left>
          <:right as |AppBar|>
            {{yield AppBar to="app-bar-right"}}

            {{#if this.allowThemes}}
              <ContextMenuItem
                class="d-flex justify-content-center align-items-center theme-switcher py-2"
                @bottom={{false}}
                @closeOnSelect={{false}}
                @menuId={{this.contextMenuId}}
              >
                <ThemeControl />
              </ContextMenuItem>
              <ContextMenuItem @menuId={{this.contextMenuId}} @divider={{true}} />
            {{/if}}

            <ContextMenu class="pe-2" @flip={{true}} @id={{this.contextMenuId}}>
              <:default as |Menu|>
                {{yield Menu this.contextMenuId to="context-menu"}}
              </:default>
            </ContextMenu>

            <Modal
              class="subtle"
              @isOpen={{this.showAboutModel}}
              @onDismiss={{fn this.toggleAboutModal false}}
            >
              <:default>
                {{#if (has-block "about")}}
                  {{yield to="about"}}
                {{else}}
                  <div class="p-3">
                    <h4>
                      {{this.environmentConfig.modulePrefix}}
                    </h4>
                    <span>
                      {{t "nrg.app-bar.about.version" version=(version)}}
                    </span>
                  </div>
                {{/if}}
              </:default>
            </Modal>
            <ContextMenuItem
              @bottom={{true}}
              @menuId={{this.contextMenuId}}
              @onSelect={{fn this.toggleAboutModal true}}
            >
              {{t "nrg.app-bar.about.item"}}
            </ContextMenuItem>
          </:right>
        </AppBar>
        <div class="application" ...attributes>
          <Toaster />
          {{#if (and hasSidebar this.showSidebar)}}
            <div class="col-12 col-md-3 col-xl-2 d-flex flex-column sticky-top overflow-auto">
              {{#if (has-block "sidebar-footer")}}
                <Sidebar @onClickInternal={{this.sidebarClicked}}>
                  <:default as |Menu|>
                    {{yield Menu to="sidebar"}}
                  </:default>
                  <:footer as |Item|>
                    {{yield Item to="sidebar-footer"}}
                  </:footer>
                </Sidebar>
              {{else}}
                <Sidebar @onClickInternal={{this.sidebarClicked}}>
                  <:default as |Menu|>
                    {{yield Menu to="sidebar"}}
                  </:default>
                </Sidebar>
              {{/if}}
            </div>
          {{/if}}
          <div
            class="col flex-grow-1 justify-content-between overflow-auto px-md-0 d-flex flex-column"
          >
            <main class="col d-flex flex-column">
              {{yield (hash contextMenuId=this.contextMenuId)}}
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


import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { getOwner } from '@ember/owner';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import { runTask } from 'ember-lifeline';
import { and, or } from 'ember-truth-helpers';
import AppBar from './app-bar.js';
import ContextMenu, { ContextMenuItem } from './context-menu.js';
import Footer from './footer.js';
import Checkbox from './form/checkbox.js';
import Modal from './modal.js';
import Sidebar from './sidebar.js';
import ToasterComponent from './toaster.js';
import { bind } from '../helpers/bind.js';
import Version from '../helpers/version.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime';

class Scaffold extends Component {
  self = this;
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), void 0);
  static {
    g(this.prototype, "responsive", [service]);
  }
  #responsive = (i(this, "responsive"), void 0);
  static {
    g(this.prototype, "theme", [service]);
  }
  #theme = (i(this, "theme"), void 0);
  static {
    g(this.prototype, "showAboutModel", [tracked], function () {
      return false;
    });
  }
  #showAboutModel = (i(this, "showAboutModel"), void 0);
  static {
    g(this.prototype, "_showSidebar", [tracked]);
  }
  #_showSidebar = (i(this, "_showSidebar"), void 0);
  get showSidebar() {
    return this._showSidebar ?? !(this.responsive.isMobileScreenGroup || this.responsive.isMediumScreen);
  }
  set showSidebar(value) {
    this._showSidebar = value;
  }
  get allowThemes() {
    return this.args.allowThemes ?? true;
  }
  get environmentConfig() {
    // @ts-expect-error - this is a private API
    return getOwner(this).resolveRegistration('config:environment');
  }
  get sidebarIcon() {
    if (!this.showSidebar) {
      return 'list';
    }
    return this.responsive.isMobileScreenGroup || this.responsive.isMediumScreen ? 'x-lg' : 'list';
  }
  get isDark() {
    return this.theme.theme === 'dark';
  }
  set isDark(value) {
    this.theme.theme = value ? 'dark' : 'light';
  }
  toggleSidebar = () => {
    this.showSidebar = !this.showSidebar;
  };
  toggleAboutModal = open => {
    this.showAboutModel = open;
  };
  sidebarClicked = evt => {
    evt?.preventDefault?.();
    evt?.stopPropagation?.();
    if (this.responsive.isMobileScreenGroup) {
      runTask(this, () => {
        this.showSidebar = false;
      });
    }
  };
  static {
    setComponentTemplate(precompileTemplate("\n    {{#let (or (has-block \"sidebar\") (has-block \"sidebar-footer\")) as |hasSidebar|}}\n      <div class=\"min-vh-100 d-flex flex-column\">\n        <AppBar @environment={{@environment}}>\n          <:left as |AppBar|>\n            {{#if hasSidebar}}\n              <i class=\"bi-{{this.sidebarIcon}} fs-4 px-3\" role=\"button\" {{on \"click\" this.toggleSidebar}} />\n            {{/if}}\n            {{yield AppBar to=\"app-bar-left\"}}\n          </:left>\n          <:right as |AppBar|>\n            {{yield AppBar to=\"app-bar-right\"}}\n\n            {{#if this.allowThemes}}\n              <ContextMenuItem class=\"d-flex justify-content-between align-items-center theme-switcher\" @bottom={{false}} @closeOnSelect={{false}} @menuId=\"application\" @onSelect={{this.theme.cycle}}>\n                <span>\n                  <i class=\"bi-sun-fill\" title={{t \"nrg.base.theme.light\"}} />\n                </span>\n                <span>\n                  <Checkbox @binding={{bind this.self \"isDark\"}} @type=\"switch\" />\n                </span>\n                <span>\n                  <i class=\"bi-moon-stars-fill\" title={{t \"nrg.base.theme.dark\"}} />\n                </span>\n              </ContextMenuItem>\n              <ContextMenuItem @menuId=\"application\" @divider={{true}} />\n\n            {{/if}}\n\n            <ContextMenu class=\"pe-2\" @flip={{true}} @id=\"application\">\n              <:default as |Menu|>\n                {{yield Menu to=\"context-menu\"}}\n              </:default>\n            </ContextMenu>\n\n            <Modal class=\"subtle\" @isOpen={{this.showAboutModel}} @onDismiss={{fn this.toggleAboutModal false}}>\n              <:default>\n                {{#if (has-block \"about\")}}\n                  {{yield to=\"about\"}}\n                {{else}}\n                  <div class=\"p-3\">\n                    <h4>\n                      {{this.environmentConfig.modulePrefix}}\n                    </h4>\n                    <span>\n                      {{t \"nrg.app-bar.about.version\" version=(version)}}\n                    </span>\n                  </div>\n                {{/if}}\n              </:default>\n            </Modal>\n            <ContextMenuItem @bottom={{true}} @menuId=\"application\" @onSelect={{fn this.toggleAboutModal true}}>\n              {{t \"nrg.app-bar.about.item\"}}\n            </ContextMenuItem>\n          </:right>\n        </AppBar>\n        <div class=\"application\" ...attributes>\n          <Toaster />\n          {{#if (and hasSidebar this.showSidebar)}}\n            <div class=\"col-12 col-md-3 col-xl-2 d-flex flex-column sticky-top overflow-auto\">\n              <Sidebar @onClickInternal={{this.sidebarClicked}}>\n                <:default as |Menu|>\n                  {{yield Menu to=\"sidebar\"}}\n                </:default>\n                <:footer as |Item|>\n                  {{yield Item to=\"sidebar-footer\"}}\n                </:footer>\n              </Sidebar>\n            </div>\n          {{/if}}\n          <div class=\"col flex-grow-1 justify-content-between overflow-auto px-md-0 d-flex flex-column\">\n            <main class=\"col d-flex flex-column\">\n              {{yield}}\n            </main>\n            {{#if (or (has-block \"footer-left\") (has-block \"footer-right\"))}}\n              <Footer>\n                <:left>\n                  {{yield to=\"footer-left\"}}\n                </:left>\n                <:right>\n                  {{yield to=\"footer-right\"}}\n                </:right>\n              </Footer>\n            {{/if}}\n          </div>\n        </div>\n      </div>\n    {{/let}}\n  ", {
      strictMode: true,
      scope: () => ({
        or,
        AppBar,
        on,
        ContextMenuItem,
        t,
        Checkbox,
        bind,
        ContextMenu,
        Modal,
        fn,
        version: Version,
        Toaster: ToasterComponent,
        and,
        Sidebar,
        Footer
      })
    }), this);
  }
}

export { Scaffold as default };
//# sourceMappingURL=scaffold.js.map

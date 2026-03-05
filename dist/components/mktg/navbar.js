import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import '../../services/responsive.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

class MktgNavbar extends Component {
  static {
    g(this.prototype, "isMenuOpen", [tracked], function () {
      return false;
    });
  }
  #isMenuOpen = (i(this, "isMenuOpen"), void 0);
  static {
    g(this.prototype, "responsive", [service]);
  }
  #responsive = (i(this, "responsive"), void 0);
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  static {
    n(this.prototype, "toggleMenu", [action]);
  }
  get classList() {
    const classes = ['collapse', 'navbar-collapse'];
    if (this.isMenuOpen) {
      classes.push('show');
    }
    return classes.join(' ');
  }
  get menuOpen() {
    return this.isMenuOpen;
  }
  get menuIcon() {
    return this.menuOpen ? 'bi-x' : 'bi-list';
  }
  // TODO: --bs-navbar-toggler-focus-width: 0;
  static {
    setComponentTemplate(precompileTemplate("<nav class=\"navbar navbar-expand-lg\" ...attributes>\n  {{yield to=\"brand\"}}\n  {{#if this.responsive.isMobileDevice}}\n    {{yield to=\"actions\"}}\n  {{/if}}\n  <button class=\"navbar-toggler mx-5\" type=\"button\" aria-expanded={{this.menuOpen}} aria-label={{t \"nrg.navbar.toggleContextMenu\"}} {{on \"click\" this.toggleMenu}}>\n    <span class={{this.menuIcon}} />\n  </button>\n  <div class={{this.classList}}>\n    <ul class=\"navbar-nav text-center\">\n      {{yield}}\n    </ul>\n  </div>\n  {{#unless this.responsive.isMobileDevice}}\n    {{yield to=\"actions\"}}\n  {{/unless}}\n</nav>", {
      strictMode: true,
      scope: () => ({
        t,
        on
      })
    }), this);
  }
}

export { MktgNavbar as default };
//# sourceMappingURL=navbar.js.map

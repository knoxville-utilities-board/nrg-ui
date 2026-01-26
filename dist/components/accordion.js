import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

class Accordion extends Component {
  static {
    g(this.prototype, "isMenuOpen", [tracked], function () {
      return this.args.defaultOpen || false;
    });
  }
  #isMenuOpen = (i(this, "isMenuOpen"), void 0);
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  static {
    n(this.prototype, "toggleMenu", [action]);
  }
  get classList() {
    const classes = ['collapse'];
    if (this.isMenuOpen) {
      classes.push('show');
    }
    return classes.join(' ');
  }
  get menuIcon() {
    return this.isMenuOpen ? 'bi-caret-down-fill' : 'bi-caret-left-fill';
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"d-flex flex-column p-2 m-2 rounded\" ...attributes>\n  <button class=\"d-flex justify-content-between align-items-center p-0 border-0 bg-transparent\" type=\"button\" {{on \"click\" this.toggleMenu}}>\n    {{#if (has-block \"title\")}}\n      {{yield to=\"title\"}}\n    {{else}}\n      <p class=\"fw-bold m-2\">{{@title}}</p>\n    {{/if}}\n    <i class=\"p {{this.menuIcon}}\" />\n  </button>\n  <div class=\"mx-2 mb-0 mt-2 {{this.classList}}\">\n    {{yield to=\"content\"}}\n  </div>\n</div>", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { Accordion as default };
//# sourceMappingURL=accordion.js.map

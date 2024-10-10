import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

class FaqComponent extends Component {
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
  get question() {
    return this.args.question;
  }
  get classList() {
    let classes1 = ['collapse'];
    if (this.isMenuOpen) {
      classes1.push('show');
    }
    return classes1.join(' ');
  }
  get menuIcon() {
    return this.isMenuOpen ? 'bi-dash' : 'bi-plus';
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div class=\"d-flex flex-column p-2 m-2 rounded\" ...attributes>\n      <div class=\"d-flex justify-content-between align-items-center\">\n        <p class=\"fw-bold m-2\">{{this.question}}</p>\n        <button type=\"button\" class=\"btn\" {{on \"click\" this.toggleMenu}}><i class=\"h2 {{this.menuIcon}}\" /></button>\n      </div>\n      <div class=\"mx-2 mb-0 mt-2 {{this.classList}}\">\n        {{yield to=\"answer\"}}\n      </div>\n    </div>\n  ", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { FaqComponent as default };
//# sourceMappingURL=faq.js.map

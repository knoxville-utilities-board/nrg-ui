import { assert } from '@ember/debug';
import { LinkTo } from '@ember/routing';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import '../services/responsive.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime';

class NrgNavItem extends Component {
  static {
    g(this.prototype, "responsive", [service]);
  }
  #responsive = (i(this, "responsive"), undefined);
  constructor(owner1, args1) {
    super(owner1, args1);
    assert('You must provide either a `url` or a `route` to the nav-item component', args1.url || args1.route);
    assert('You must provide either a `url` or a `route` to the nav-item component', args1.url && !args1.route || !args1.url && args1.route);
  }
  get classList() {
    const classes1 = ['nav-item'];
    if (this.responsive.isMobileDevice) {
      classes1.push('border-bottom');
    }
    return classes1.join(' ');
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <li class={{this.classList}} ...attributes>\n      {{#if @url}}\n        <a class=\"nav-link\" href={{@url}}>{{@label}}</a>\n      {{else}}\n        <LinkTo @route={{@route}} @model={{@model}} class=\"nav-link\">\n          {{@label}}\n        </LinkTo>\n      {{/if}}\n    </li>\n  ", {
      strictMode: true,
      scope: () => ({
        LinkTo
      })
    }), this);
  }
}

export { NrgNavItem as default };
//# sourceMappingURL=nav-item.js.map

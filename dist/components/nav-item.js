import { assert } from '@ember/debug';
import { LinkTo } from '@ember/routing';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import '../services/responsive.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime';

class NavItem extends Component {
  static {
    g(this.prototype, "responsive", [service]);
  }
  #responsive = (i(this, "responsive"), void 0);
  constructor(owner, args) {
    super(owner, args);
    assert('You must provide either a `url` or a `route` to the nav-item component', args.url || args.route);
    assert('You must provide either a `url` or a `route` to the nav-item component', args.url && !args.route || !args.url && args.route);
  }
  get classList() {
    const classes = ['nav-item'];
    if (this.responsive.isMobileDevice) {
      classes.push('border-bottom');
    }
    return classes.join(' ');
  }
  static {
    setComponentTemplate(precompileTemplate("<li class={{this.classList}} ...attributes>\n  {{#if @url}}\n    <a class=\"nav-link\" href={{@url}}>{{@label}}</a>\n  {{else}}\n    <LinkTo @route={{@route}} @model={{@model}} class=\"nav-link\">\n      {{@label}}\n    </LinkTo>\n  {{/if}}\n</li>", {
      strictMode: true,
      scope: () => ({
        LinkTo
      })
    }), this);
  }
}

export { NavItem as default };
//# sourceMappingURL=nav-item.js.map

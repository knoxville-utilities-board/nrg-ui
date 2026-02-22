import { LinkTo } from '@ember/routing';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import { eq } from 'ember-truth-helpers';
import { classes } from '../helpers/classes.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';
import { g, i } from 'decorator-transforms/runtime';

const Container = setComponentTemplate(precompileTemplate("<div class=\"stacked-pane-container container flex-nowrap\" ...attributes>\n  {{yield}}\n</div>", {
  strictMode: true
}), templateOnly());
class Pane extends Component {
  static {
    g(this.prototype, "router", [service]);
  }
  #router = (i(this, "router"), void 0);
  get ratio() {
    return this.args.ratio || 'focused';
  }
  static {
    setComponentTemplate(precompileTemplate("<div class={{classes \"stacked-pane p-2\" (if (eq this.ratio \"focused\") \"focused\") (if (eq this.ratio \"half\") \"half\") (if (eq this.ratio \"full\") \"full\") (if @placeholder \"d-none d-md-block\")}} ...attributes>\n  {{#if @previousRoute}}\n    <div class=\"d-block d-md-none\">\n      <LinkTo @route={{@previousRoute}} class=\"icon-link icon-link-hover p-1\">\n        <i class=\"bi bi-arrow-left\"></i>\n        {{t \"nrg.stacked-pane.navigate-back\"}}\n      </LinkTo>\n    </div>\n  {{/if}}\n  {{yield}}\n</div>", {
      strictMode: true,
      scope: () => ({
        classes,
        eq,
        LinkTo,
        t
      })
    }), this);
  }
}

export { Container, Pane, Pane as default };
//# sourceMappingURL=stacked-pane.js.map

import { fn, concat } from '@ember/helper';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import { eq } from 'ember-truth-helpers';
import ButtonGroup from './button-group.js';
import { classes } from '../helpers/classes.js';
import { themeIcons } from '../services/theme.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime';

class ThemeControl extends Component {
  static {
    g(this.prototype, "theme", [service]);
  }
  #theme = (i(this, "theme"), void 0);
  onChange = theme => {
    if (theme === this.theme.value) {
      return;
    }
    this.theme.setTheme(theme);
    this.args.onChange?.(theme);
  };
  static {
    setComponentTemplate(precompileTemplate("<ButtonGroup @label={{t \"nrg.base.theme.label\"}} ...attributes as |Group|>\n  {{#each-in themeIcons as |theme icon|}}\n    {{#let (eq this.theme.value theme) as |isActive|}}\n      <Group.Button aria-label={{t (concat \"nrg.base.theme.\" theme)}} aria-pressed=\"{{isActive}}\" class={{classes \"btn-outline-secondary\" (if isActive \"active\")}} title={{t (concat \"nrg.base.theme.\" theme)}} @icon={{icon}} @iconPosition=\"center\" @onClick={{fn this.onChange theme}} />\n    {{/let}}\n  {{/each-in}}\n</ButtonGroup>", {
      strictMode: true,
      scope: () => ({
        ButtonGroup,
        t,
        themeIcons,
        eq,
        concat,
        classes,
        fn
      })
    }), this);
  }
}

export { ThemeControl as default };
//# sourceMappingURL=theme-control.js.map

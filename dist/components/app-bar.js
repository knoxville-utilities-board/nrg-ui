import { hash } from '@ember/helper';
import Header from './header.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

function formatEnvironment(env) {
  if (env === 'prod' || env === 'production') {
    return undefined;
  }
  return env;
}
const EnvironmentDisplay = setComponentTemplate(precompileTemplate("{{#let (formatEnvironment @environment) as |env|}}\n  {{#if env}}\n    <div class=\"environment-title\" ...attributes>\n      {{env}}\n    </div>\n  {{/if}}\n{{/let}}", {
  strictMode: true,
  scope: () => ({
    formatEnvironment
  })
}), templateOnly());
const AppBar = setComponentTemplate(precompileTemplate("<div class=\"app-bar-container\">\n  {{#let (hash Environment=(component EnvironmentDisplay environment=@environment)) as |AppBarYield|}}\n    <Header class=\"app-bar text-bg-primary shadow-sm py-2\" @flexCollapse={{true}} ...attributes>\n      <:left>\n        {{yield AppBarYield to=\"left\"}}\n      </:left>\n      <:right>\n        {{yield AppBarYield to=\"right\"}}\n      </:right>\n    </Header>\n  {{/let}}\n</div>", {
  strictMode: true,
  scope: () => ({
    hash,
    EnvironmentDisplay,
    Header
  })
}), templateOnly());

export { AppBar as default };
//# sourceMappingURL=app-bar.js.map

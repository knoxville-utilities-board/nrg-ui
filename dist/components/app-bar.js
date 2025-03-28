import { hash } from '@ember/helper';
import HeaderComponent from './header.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

function formatEnvironment(env) {
  if (env === 'prod' || env === 'production') {
    return undefined;
  }
  return env;
}
const EnvironmentDisplay = setComponentTemplate(precompileTemplate("\n  {{#let (formatEnvironment @environment) as |env|}}\n    {{#if env}}\n      <div class=\"environment-title\" ...attributes>\n        {{env}}\n      </div>\n    {{/if}}\n  {{/let}}\n", {
  strictMode: true,
  scope: () => ({
    formatEnvironment
  })
}), templateOnly());
const AppBar = setComponentTemplate(precompileTemplate("\n  <div class=\"app-bar-container\">\n    <Header class=\"app-bar bg-primary shadow-sm py-2\" ...attributes>\n      <:left>\n        {{yield to=\"left\"}}\n      </:left>\n      <:center>\n        {{#if (has-block \"center\")}}\n          {{yield (hash Environment=(component EnvironmentDisplay environment=@environment)) to=\"center\"}}\n        {{else}}\n          <EnvironmentDisplay @environment={{@environment}} />\n        {{/if}}\n      </:center>\n      <:right>\n        {{yield to=\"right\"}}\n      </:right>\n      <:mobile-drop-section>\n        {{yield to=\"mobile-drop-section\"}}\n      </:mobile-drop-section>\n    </Header>\n  </div>\n", {
  strictMode: true,
  scope: () => ({
    Header: HeaderComponent,
    hash,
    EnvironmentDisplay
  })
}), templateOnly());

export { AppBar as default };
//# sourceMappingURL=app-bar.js.map

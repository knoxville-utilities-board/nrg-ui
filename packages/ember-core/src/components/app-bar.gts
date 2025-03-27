import { hash } from '@ember/helper';

import Header from './header.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

function formatEnvironment(env?: string) {
  if (env === 'prod' || env === 'production') {
    return undefined;
  }

  return env;
}

interface EnvironmentDisplaySignature {
  Element: HTMLDivElement;
  Args: {
    environment?: string;
  };
}

const EnvironmentDisplay: TOC<EnvironmentDisplaySignature> = <template>
  {{#let (formatEnvironment @environment) as |env|}}
    {{#if env}}
      <div class="environment-title" ...attributes>
        {{env}}
      </div>
    {{/if}}
  {{/let}}
</template>;

export interface AppBarSignature {
  Element: HTMLDivElement;
  Args: {
    environment?: string;
  };
  Blocks: {
    left: [];
    right: [];
    center: [
      {
        Environment: ComponentLike<EnvironmentDisplaySignature>;
      },
    ];
    'mobile-drop-section': [];
  };
}

const AppBar: TOC<AppBarSignature> = <template>
  <div class="app-bar-container">
    <Header class="app-bar bg-primary shadow-sm py-2" ...attributes>
      <:left>
        {{yield to="left"}}
      </:left>
      <:center>
        {{#if (has-block "center")}}
          {{yield
            (hash
              Environment=(component
                EnvironmentDisplay environment=@environment
              )
            )
            to="center"
          }}
        {{else}}
          <EnvironmentDisplay @environment={{@environment}} />
        {{/if}}
      </:center>
      <:right>
        {{yield to="right"}}
      </:right>
      <:mobile-drop-section>
        {{yield to="mobile-drop-section"}}
      </:mobile-drop-section>
    </Header>
  </div>
</template>;

export default AppBar;

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

export interface AppBarBlock {
  Environment: ComponentLike<EnvironmentDisplaySignature>;
}

export interface AppBarSignature {
  Element: HTMLDivElement;
  Args: {
    environment?: string;
  };
  Blocks: {
    left: [AppBarBlock];
    right: [AppBarBlock];
  };
}

const AppBar: TOC<AppBarSignature> = <template>
  <div class="app-bar-container">
    {{#let
      (hash Environment=(component EnvironmentDisplay environment=@environment))
      as |AppBarYield|
    }}
      <Header
        class="app-bar text-bg-primary shadow-sm py-2"
        @flexCollapse={{true}}
        ...attributes
      >
        <:left>
          {{yield AppBarYield to="left"}}
        </:left>
        <:right>
          {{yield AppBarYield to="right"}}
        </:right>
      </Header>
    {{/let}}
  </div>
</template>;

export default AppBar;

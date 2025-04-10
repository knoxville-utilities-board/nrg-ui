import { classes } from '../helpers/classes.ts';

import type { TOC } from '@ember/component/template-only';

export interface HeaderSignature {
  Element: HTMLDivElement;
  Blocks: {
    left: [];
    right: [];
    center: [];
    'mobile-drop-section': [];
  };
  Args: {
    flexCollapse?: boolean;
  };
}

const HeaderComponent: TOC<HeaderSignature> = <template>
  <div
    class={{classes
      "row row-cols-12 p-1 justify-content-between align-items-center"
      (unless @flexCollapse "flex-nowrap")
    }}
    ...attributes
  >
    <div
      class={{classes
        "col d-flex align-items-center app-bar-left"
        (if @flexCollapse "flex-grow-0 text-nowrap" "justify-content-start")
      }}
    >
      {{yield to="left"}}
    </div>
    {{#if (has-block "center")}}
      <div
        class={{classes
          "col d-flex align-items-center app-bar-center"
          (if @flexCollapse "flex-grow-0 text-nowrap" "justify-content-center")
        }}
      >
        {{yield to="center"}}
      </div>
    {{/if}}
    <div
      class={{classes
        "col d-flex align-items-center app-bar-right"
        (if @flexCollapse "flex-grow-0 text-nowrap" "justify-content-end")
      }}
    >
      {{yield to="right"}}
    </div>
    {{#if (has-block "mobile-drop-section")}}
      <div class="d-flex col-12 d-md-none order-last justify-content-center">
        <div class="d-flex flex-row text-nowrap align-items-center">
          {{yield to="mobile-drop-section"}}
        </div>
      </div>
    {{/if}}
  </div>
</template>;

export default HeaderComponent;

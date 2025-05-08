import { classes } from '@nrg-ui/core';
import { eq } from 'ember-truth-helpers';

import type { TOC } from '@ember/component/template-only';

export interface SideBySideSignature {
  Element: HTMLElement;
  Blocks: {
    default?: [];
  };
  Args: {
    role?: 'container' | 'primary' | 'secondary' | 'placeholder';
  };
}

const SideBySide: TOC<SideBySideSignature> = <template>
  <div
    class={{classes
      (if (eq @role "container") "stacked-page-container container flex-nowrap")
      (if (eq @role "primary") "stacked-page col-12 col-md-6 col-lg-4 p-2")
      (if (eq @role "secondary") "stacked-page col-12 col-md-6 col-lg-8 p-2")
      (if
        (eq @role "placeholder")
        "stacked-page d-none d-md-block col-12 col-md-6 col-lg-8 p-2"
      )
    }}
    ...attributes
  >
    {{yield}}
  </div>
</template>;

export default SideBySide;

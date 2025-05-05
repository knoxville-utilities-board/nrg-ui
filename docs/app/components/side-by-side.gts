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
      (if (eq @role "container") "side-by-side d-flex")
      (if (eq @role "primary") "col-12 col-md-6 col-lg-4")
      (if (eq @role "secondary") "col-12 col-md-6 col-lg-8 p-2")
      (if (eq @role "placeholder") "d-none d-md-block col-12 col-md-6 col-lg-8")
    }}
    ...attributes
  >
    {{yield}}
  </div>
</template>;

export default SideBySide;

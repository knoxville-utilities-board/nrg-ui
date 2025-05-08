import { classes } from '@nrg-ui/core';
import { eq } from 'ember-truth-helpers';

import type { TOC } from '@ember/component/template-only';

export interface StackedPageSignature {
  Element: HTMLElement;
  Blocks: {
    default?: [];
  };
  Args: {
    placeholder?: boolean;
    container?: boolean;
    ratio?: 'container' | 'list-detail' | 'half' | 'full';
  };
}

const StackedPage: TOC<StackedPageSignature> = <template>
  <div
    class={{classes
      (if @container "stacked-page-container container flex-nowrap")
      (if (eq @ratio "list-detail") "stacked-page list-detail p-2")
      (if (eq @ratio "half") "stacked-page half p-2")
      (if (eq @ratio "full") "stacked-page d-none d-md-block full p-2")
      (if @placeholder "d-none d-md-block")
    }}
    ...attributes
  >
    {{yield}}
  </div>
</template>;

export default StackedPage;

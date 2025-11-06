import { getMdnLinkForApi } from '../../utils.ts';
import { TypeCodeBlock } from '../code-block.gts';

import type { TOC } from '@ember/component/template-only';

export interface MdnApiLinkSignature {
  Element: HTMLAnchorElement;
  Args: {
    type: string;
  };
}

export const MdnApiLink: TOC<MdnApiLinkSignature> = <template>
  {{#let (getMdnLinkForApi @type) as |mdnLink|}}
    {{#if mdnLink}}
      <a
        class="mdn-api-link"
        href={{mdnLink}}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TypeCodeBlock class="me-1" @code={{@type}} @inline={{true}} />
      </a>
    {{else}}
      <TypeCodeBlock class="me-1" @code={{@type}} @inline={{true}} />
    {{/if}}
  {{/let}}
</template>;

export default MdnApiLink;

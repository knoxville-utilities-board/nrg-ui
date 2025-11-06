import { getMdnLinkForApi } from '../../utils.ts';
import { TypeCodeBlock } from '../code-block.gts';

import type { TOC } from '@ember/component/template-only';

export interface MdnApiLinkSignature {
  Element: HTMLAnchorElement;
  Args: {
    type: string;
  };
}

/**
 * JavaScript provides wrapper classes for
 * certain primitive data types. These are rarely
 * used directly and display with Shiki differently
 * than their primitive counterparts.
 *
 * See https://typescript-eslint.io/rules/no-wrapper-object-types/ */
const WRAPPER_OBJECT_TYPES = [
  'String',
  'Number',
  'Boolean',
  'Symbol',
  'BigInt',
  'Object',
];

function getDisplayType(type: string) {
  if (WRAPPER_OBJECT_TYPES.includes(type)) {
    return type.toLowerCase();
  }

  return type;
}

function getDocType(type: string) {
  if (type.endsWith('[]')) {
    type = type.slice(0, -2);
  } else if (type.endsWith('<T>')) {
    type = type.slice(0, -3);
  } else if (type.startsWith('Array<') && type.endsWith('>')) {
    type = type.slice(6, -1);
  }

  return getMdnLinkForApi(type);
}

export const MdnApiLink: TOC<MdnApiLinkSignature> = <template>
  {{#let (getDocType @type) as |mdnLink|}}
    {{#if mdnLink}}
      <a
        class="mdn-api-link"
        href={{mdnLink}}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TypeCodeBlock
          class="me-1"
          @code={{getDisplayType @type}}
          @inline={{true}}
        />
      </a>
    {{else}}
      <TypeCodeBlock
        class="me-1"
        @code={{getDisplayType @type}}
        @inline={{true}}
      />
    {{/if}}
  {{/let}}
</template>;

export default MdnApiLink;

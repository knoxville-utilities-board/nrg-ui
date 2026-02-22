import { getMdnLinkForApi } from '../../utils.js';
import { TypeCodeBlock } from '../code-block.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

/**
 * JavaScript provides wrapper classes for
 * certain primitive data types. These are rarely
 * used directly and display with Shiki differently
 * than their primitive counterparts.
 *
 * See https://typescript-eslint.io/rules/no-wrapper-object-types/ */
const WRAPPER_OBJECT_TYPES = ['String', 'Number', 'Boolean', 'Symbol', 'BigInt', 'Object'];
function getDisplayType(type) {
  if (WRAPPER_OBJECT_TYPES.includes(type)) {
    return type.toLowerCase();
  }
  return type;
}
function getDocType(type) {
  if (type.endsWith('[]')) {
    type = type.slice(0, -2);
  } else if (type.endsWith('<T>')) {
    type = type.slice(0, -3);
  } else if (type.startsWith('Array<') && type.endsWith('>')) {
    type = type.slice(6, -1);
  }
  return getMdnLinkForApi(type);
}
function or(...values) {
  return values.filter(Boolean)[0] ?? '';
}
const ApiLink = setComponentTemplate(precompileTemplate("{{#if @link}}\n  <a class=\"api-link\" href={{@link}} target=\"_blank\" rel=\"noopener noreferrer\">\n    <TypeCodeBlock class=\"me-1\" @code={{or @displayType (getDisplayType @type)}} @inline={{true}} />\n  </a>\n{{else}}\n  {{#let (getDocType @type) as |mdnLink|}}\n    {{#if mdnLink}}\n      <a class=\"api-link mdn\" href={{mdnLink}} target=\"_blank\" rel=\"noopener noreferrer\">\n        <TypeCodeBlock class=\"me-1\" @code={{or @displayType (getDisplayType @type)}} @inline={{true}} />\n      </a>\n    {{else}}\n      <TypeCodeBlock class=\"me-1\" @code={{or @displayType (getDisplayType @type)}} @inline={{true}} />\n    {{/if}}\n  {{/let}}\n{{/if}}", {
  strictMode: true,
  scope: () => ({
    TypeCodeBlock,
    or,
    getDisplayType,
    getDocType
  })
}), templateOnly());

export { ApiLink, ApiLink as default };
//# sourceMappingURL=api-link.js.map
